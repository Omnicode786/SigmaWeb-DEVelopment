import express from "express";
import { db } from "../db/index.js";
import {classes} from "../db/schema/index.js";

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

export default router;
