import { and, desc, eq, getTableColumns, ilike, or, sql } from "drizzle-orm";
import express from "express";
import { db } from "../db/index.js";
import { departments, subjects } from "./../db/schema/index.js";

const router = express.Router();

// this route will get all subjects with optional filter search and  pagination
router.get("/", async (req: express.Request, res: express.Response) => {
  try {
    const { search, department, page = 1, limit = 10 } = req.query;
    // this data is from the link of the website

    // the below was parsed to int cas if the thing was a string then it would make max return nan which in turn canmake sql query un predictable

    const currentPage = Math.max(1, parseInt(String(page)));
    const LimitPerPage = Math.max(1, parseInt(String(limit)));
    const offset = LimitPerPage * (currentPage - 1);
    const filterConditions = [];

    // if the subject filter exists then filter by name or the code

    if (search) {
      filterConditions.push(
        or(
          ilike(subjects.name, `%${search}%`),
          ilike(subjects.code, `%${search}%`),
        ),
      );
    }

    // department  = query params and departments is the tab;e

    if (department) {
      // so this can lead to sql injections better way to this is
      // simply cas user input is directly interpolated into the sql pattern without proper escaping

// later we will also implement arcjet which protect us even more from such vulnerability ig


      filterConditions.push(ilike(departments.name, `${department}`));
      const deptPattern = `%${String(department).replace(/[%_]/g, "\\$&")}%`;
      filterConditions.push(ilike(departments.name, deptPattern));
    }


    // combine all filters exist using and if any exist

    const whereClause =
      filterConditions.length > 0 ? and(...filterConditions) : undefined;

    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(subjects)
      .leftJoin(departments, eq(subjects.departmentId, departments.id))
      .where(whereClause);

    const totalCount = countResult[0]?.count ?? 0;
    // getTable columns gets all the cilumns from the table but also adds aditional columns tht we want to add
    const subjectsList = await db
      .select({
        ...getTableColumns(subjects),
        department: { ...getTableColumns(departments) },
      })
      .from(subjects)
      .leftJoin(departments, eq(subjects.departmentId, departments.id))
      .where(whereClause)
      .orderBy(desc(subjects.createdAt))
      .limit(LimitPerPage)
      .offset(offset);

    res.status(200).json({
      data: subjectsList,
      pagination: {
        page: currentPage,
        limit: LimitPerPage,
        total: totalCount,
        totalPages: Math.ceil(totalCount / LimitPerPage),
      },
    });
  } catch (e) {
    console.error("GET: /subjects error: ", e);
    res.status(500).json({ error: "Failed to get subjects" });
  }
});

export default router;
