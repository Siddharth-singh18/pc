require("dotenv").config();
const bcrypt = require("bcryptjs");
const { PrismaClient, Platform, EditorialStatus, UserRole } = require("@prisma/client");

const prisma = new PrismaClient();

const sampleMarkdown = `## Intuition

Sort the values first, then reason locally.

## Formula

$$
\\sum_{i=1}^{n} a_i
$$

## Implementation

\`\`\`cpp
void solve() {
    // sample implementation
}
\`\`\`
`;

async function main() {
  const passwordHash = await bcrypt.hash("secret123", 10);

  const member = await prisma.user.upsert({
    where: { email: "member@club.com" },
    update: {
      name: "Demo Member",
      passwordHash,
      role: UserRole.MEMBER
    },
    create: {
      name: "Demo Member",
      email: "member@club.com",
      passwordHash,
      role: UserRole.MEMBER
    }
  });

  const editor = await prisma.user.upsert({
    where: { email: "editor@club.com" },
    update: {
      name: "Editorial Lead",
      passwordHash,
      role: UserRole.EDITOR
    },
    create: {
      name: "Editorial Lead",
      email: "editor@club.com",
      passwordHash,
      role: UserRole.EDITOR
    }
  });

  const contest = await prisma.contest.upsert({
    where: { slug: "codeforces-round-102" },
    update: {
      contestName: "Codeforces Round 102",
      platform: Platform.CODEFORCES,
      date: "2026-03-27",
      curator: "Programming Club Editorial Team",
      summary: "Complete round set with A, B, C, D, and E editorials in one place."
    },
    create: {
      slug: "codeforces-round-102",
      contestName: "Codeforces Round 102",
      platform: Platform.CODEFORCES,
      date: "2026-03-27",
      curator: "Programming Club Editorial Team",
      summary: "Complete round set with A, B, C, D, and E editorials in one place."
    }
  });

  const entries = [
    ["A", "Array Warmup", "800", ["implementation", "math"], EditorialStatus.PUBLISHED],
    ["B", "Greedy Segments", "1100", ["greedy", "sorting"], EditorialStatus.PUBLISHED],
    ["C", "Prefix Compression", "1500", ["dp", "sorting"], EditorialStatus.DRAFT],
    ["D", "Tree Labelling", "1800", ["trees", "dfs"], EditorialStatus.DRAFT]
  ];

  for (const [problemLetter, problemName, difficulty, tags, status] of entries) {
    await prisma.editorial.upsert({
      where: {
        contestId_problemLetter: {
          contestId: contest.id,
          problemLetter
        }
      },
      update: {
        problemName,
        difficulty,
        markdown: sampleMarkdown,
        tags,
        status,
        authorId: status === EditorialStatus.PUBLISHED ? editor.id : member.id,
        publishedAt: status === EditorialStatus.PUBLISHED ? new Date() : null
      },
      create: {
        contestId: contest.id,
        authorId: status === EditorialStatus.PUBLISHED ? editor.id : member.id,
        problemLetter,
        problemName,
        difficulty,
        markdown: sampleMarkdown,
        tags,
        status,
        publishedAt: status === EditorialStatus.PUBLISHED ? new Date() : null
      }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seed completed.");
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
