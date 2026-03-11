import express from "express";
import { db } from "../db/index.js";
import {classes, user} from "../db/schema/index.js";
import { and, ilike, or, sql, eq, getTableColumns, desc } from "drizzle-orm";
import { subjects } from './../db/schema/app';

const router  = express.Router();


router.post("/", async (req, res) => {
  try {
    // Ensure JSON body was sent
    if (!req.is("application/json") && typeof req.body !== "object") {
      return res.status(400).json({ error: "Expected application/json body" });
    }

    const {
      name,
      description,
      subjectId,
      teacherId,
      capacity,
      status,
      bannerUrl,
      bannerCldPubId,
      schedules,
    } = req.body || {};

    // Validate required fields
    const missing: string[] = [];
    if (subjectId === undefined || subjectId === null || subjectId === "") missing.push("subjectId");
    if (teacherId === undefined || teacherId === null || teacherId === "") missing.push("teacherId");
    if (name === undefined || name === null || name === "") missing.push("name");

    if (missing.length) {
      return res.status(400).json({ error: "Missing required fields", missing });
    }

    // Coerce types and validate
    const subjectIdNum = Number(subjectId);
    if (!Number.isInteger(subjectIdNum) || subjectIdNum <= 0) {
      return res.status(400).json({ error: "Invalid subjectId; must be a positive integer" });
    }

    const inviteCode = Math.random().toString(36).substring(2, 9);

    // Build insert object using camelCase keys matching the Drizzle schema.
    // Drizzle is configured with `casing: "snake_case"` so these map to DB columns.
    const insertData: any = {
      name,
      description: description ?? null,
      subjectId: subjectIdNum,
      teacherId: String(teacherId),
      bannerUrl: bannerUrl ?? null,
      bannerCldPubId: bannerCldPubId ?? null,
      inviteCode,
      capacity: capacity ?? undefined,
      status: status ?? undefined,
      schedules: Array.isArray(schedules) ? schedules : [],
    };

    // Remove undefined fields so DB defaults apply
    Object.keys(insertData).forEach((k) => {
      if (insertData[k] === undefined) delete insertData[k];
    });

    const [createdClass] = await db
      .insert(classes)
      .values(insertData)
      .returning({ id: classes.id });

    res.status(201).json({ data: createdClass });
  } catch (err: any) {
    console.error("POST /classes error", err?.message ?? err);
    // If the DB returns a constraint error, send a helpful message without leaking internals
    if (err && err.message && /null value in column/.test(err.message)) {
      return res.status(400).json({ error: "A required field was null or missing" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
});


router.get("/", async (req: express.Request, res: express.Response) => {
  try {
    const { search, subject, teacher, page = 1, limit = 10 } = req.query;
    // this data is from the link of the website

    // the below was parsed to int cas if the thing was a string then it would make max return nan which in turn canmake sql query un predictable

    const currentPage = Math.max(1, parseInt(String(page)));
    const LimitPerPage = Math.max(1, parseInt(String(limit)));
    const offset = LimitPerPage * (currentPage - 1);
    const filterConditions = [];

    // if the subject filter exists then filter by name or the code

    if (search) {
      const s = String(search).replace(/[%_]/g, "\\$&");
      const pattern = `%${s}%`;
      filterConditions.push(
        or(
          ilike(classes.name, pattern),
          ilike(classes.description, pattern),
          ilike(subjects.name, pattern),
          ilike(user.name, pattern),
        ),
      );
    }

    // department  = query params and departments is the tab;e

    if (subject) {
      // so this can lead to sql injections better way to this is
      // simply cas user input is directly interpolated into the sql pattern without proper escaping

// later we will also implement arcjet which protect us even more from such vulnerability ig


      const subjectPattern = `%${String(subject).replace(/[%_]/g, "\\$&")}%`;
      filterConditions.push(ilike(subjects.name, subjectPattern));
    }

        if (teacher) {
      // so this can lead to sql injections better way to this is
      // simply cas user input is directly interpolated into the sql pattern without proper escaping

// later we will also implement arcjet which protect us even more from such vulnerability ig


      const teacherPattern = `%${String(teacher).replace(/[%_]/g, "\\$&")}%`;
      filterConditions.push(ilike(user.name, teacherPattern));
    }



    // combine all filters exist using and if any exist

    const whereClause =
      filterConditions.length > 0 ? and(...filterConditions) : undefined;

    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(classes)
      .leftJoin(subjects, eq(classes.subjectId, subjects.id))
      .leftJoin(user, eq(classes.teacherId, user.id))
      .where(whereClause);

    const totalCount = countResult[0]?.count ?? 0;
    // getTable columns gets all the cilumns from the table but also adds aditional columns tht we want to add
    const classesList = await db
      .select({
        ...getTableColumns(classes),
        subject: { ...getTableColumns(subjects) },

        teacher: { ...getTableColumns(user) },
      })
      .from(classes)
      .leftJoin(subjects, eq(classes.subjectId, subjects.id))
      .leftJoin(user, eq(classes.teacherId, user.id))
      .where(whereClause)
      .orderBy(desc(classes.createdAt))
      .limit(LimitPerPage)
      .offset(offset);




      // console.log(classesList);
    res.status(200).json({
      data: classesList,
      pagination: {
        page: currentPage,
        limit: LimitPerPage,
        total: totalCount,
        totalPages: Math.ceil(totalCount / LimitPerPage),
      },
    });
  } catch (e) {
    console.error("GET: /classes error: ", e);
    res.status(500).json({ error: "Failed to get classes" });
  }
});


export default router;
