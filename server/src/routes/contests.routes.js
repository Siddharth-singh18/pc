const express = require("express");
const { EditorialStatus } = require("@prisma/client");
const prisma = require("../lib/prisma");

const router = express.Router();

function formatPlatform(platform) {
  if (platform === "CODEFORCES") {
    return "Codeforces";
  }

  if (platform === "CODECHEF") {
    return "CodeChef";
  }

  if (platform === "LEETCODE") {
    return "LeetCode";
  }

  return platform;
}

router.get("/", async (req, res) => {
  try {
    const contests = await prisma.contest.findMany({
      include: {
        editorials: {
          select: {
            problemLetter: true
          },
          orderBy: {
            problemLetter: "asc"
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return res.json({
      contests: contests.map((contest) => ({
        id: contest.id,
        slug: contest.slug,
        contestName: contest.contestName,
        platform: formatPlatform(contest.platform),
        date: contest.date,
        curator: contest.curator,
        summary: contest.summary,
        problems: contest.editorials.map((item) => ({
          letter: item.problemLetter
        }))
      }))
    });
  } catch (error) {
    return res.status(500).json({ message: "Unable to fetch contests." });
  }
});

router.get("/:slug/editorials", async (req, res) => {
  try {
    const contest = await prisma.contest.findUnique({
      where: { slug: req.params.slug },
      include: {
        editorials: {
          where: {
            status: EditorialStatus.PUBLISHED
          },
          include: {
            author: true
          },
          orderBy: {
            problemLetter: "asc"
          }
        }
      }
    });

    if (!contest) {
      return res.status(404).json({ message: "Contest not found." });
    }

    return res.json({
      contest: {
        id: contest.id,
        slug: contest.slug,
        contestName: contest.contestName,
        platform: formatPlatform(contest.platform),
        date: contest.date,
        curator: contest.curator,
        summary: contest.summary
      },
      editorials: contest.editorials.map((editorial) => ({
        id: editorial.id,
        problemLetter: editorial.problemLetter,
        problemName: editorial.problemName,
        author: editorial.author.name,
        difficulty: editorial.difficulty,
        markdown: editorial.markdown,
        tags: editorial.tags
      }))
    });
  } catch (error) {
    return res.status(500).json({ message: "Unable to fetch contest editorials." });
  }
});

module.exports = router;
