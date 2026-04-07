const express = require("express");
const { EditorialStatus } = require("@prisma/client");
const prisma = require("../lib/prisma");
const auth = require("../middleware/auth");
const requireRole = require("../middleware/requireRole");

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

router.get("/mine", auth, async (req, res) => {
  try {
    const editorials = await prisma.editorial.findMany({
      where: {
        authorId: req.user.userId
      },
      include: {
        contest: true,
        author: true
      },
      orderBy: {
        updatedAt: "desc"
      }
    });

    return res.json({
      editorials: editorials.map((editorial) => ({
        id: editorial.id,
        slug: `${editorial.contest.slug}-${editorial.problemLetter.toLowerCase()}`,
        contestName: editorial.contest.contestName,
        problemLetter: editorial.problemLetter,
        problemName: editorial.problemName,
        author: editorial.author.name,
        platform: formatPlatform(editorial.contest.platform),
        status: editorial.status
      }))
    });
  } catch (error) {
    return res.status(500).json({ message: "Unable to fetch your editorials." });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { contestId, problemLetter, problemName, difficulty, markdown, tags = [] } = req.body;

    if (!contestId || !problemLetter || !problemName || !markdown) {
      return res.status(400).json({ message: "contestId, problemLetter, problemName and markdown are required." });
    }

    const editorial = await prisma.editorial.create({
      data: {
        contestId: Number(contestId),
        authorId: req.user.userId,
        problemLetter,
        problemName,
        difficulty: difficulty || null,
        markdown,
        tags,
        status: EditorialStatus.DRAFT
      }
    });

    return res.status(201).json({ editorial });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({ message: "An editorial for this problem already exists in the contest." });
    }

    return res.status(500).json({ message: "Unable to create editorial." });
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const editorialId = Number(req.params.id);
    const existing = await prisma.editorial.findUnique({
      where: { id: editorialId }
    });

    if (!existing) {
      return res.status(404).json({ message: "Editorial not found." });
    }

    if (existing.authorId !== req.user.userId && !["ADMIN", "EDITOR"].includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { problemName, difficulty, markdown, tags, status } = req.body;

    const updated = await prisma.editorial.update({
      where: { id: editorialId },
      data: {
        problemName: problemName ?? existing.problemName,
        difficulty: difficulty ?? existing.difficulty,
        markdown: markdown ?? existing.markdown,
        tags: tags ?? existing.tags,
        status: status ?? existing.status
      }
    });

    return res.json({ editorial: updated });
  } catch (error) {
    return res.status(500).json({ message: "Unable to update editorial." });
  }
});

router.post("/:id/publish", auth, requireRole("ADMIN", "EDITOR"), async (req, res) => {
  try {
    const editorialId = Number(req.params.id);
    const updated = await prisma.editorial.update({
      where: { id: editorialId },
      data: {
        status: EditorialStatus.PUBLISHED,
        publishedAt: new Date()
      }
    });

    return res.json({ editorial: updated });
  } catch (error) {
    return res.status(500).json({ message: "Unable to publish editorial." });
  }
});

module.exports = router;
