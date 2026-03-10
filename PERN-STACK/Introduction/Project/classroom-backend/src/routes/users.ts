import { and, desc, eq, getTableColumns, ilike, or, sql } from "drizzle-orm";
import express from "express";
import { db } from "../db/index.js";
import { user } from "./../db/schema/index.js";

const router = express.Router();

// GET / - list users with optional search, role and pagination
router.get("/", async (req: express.Request, res: express.Response) => {
  try {
    const { search, role, page = 1, limit = 10 } = req.query;

    const currentPage = Math.max(1, parseInt(String(page)));
    const LimitPerPage = Math.max(1, parseInt(String(limit)));
    const offset = LimitPerPage * (currentPage - 1);
    const filterConditions: any[] = [];

    if (search) {
      filterConditions.push(
        or(
          ilike(user.name, `%${search}%`),
          ilike(user.email, `%${search}%`),
        ),
      );
    }

    if (role) {
      filterConditions.push(eq(user.role, String(role)));
    }

    const whereClause =
      filterConditions.length > 0 ? and(...filterConditions) : undefined;

    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(user)
      .where(whereClause);

    const totalCount = countResult[0]?.count ?? 0;

    const usersList = await db
      .select({ ...getTableColumns(user) })
      .from(user)
      .where(whereClause)
      .orderBy(desc(user.createdAt))
      .limit(LimitPerPage)
      .offset(offset);

    res.status(200).json({
      data: usersList,
      pagination: {
        page: currentPage,
        limit: LimitPerPage,
        total: totalCount,
        totalPages: Math.ceil(totalCount / LimitPerPage),
      },
    });
  } catch (e) {
    console.error("GET: /users error: ", e);
    res.status(500).json({ error: "Failed to get users" });
  }
});

export default router;
