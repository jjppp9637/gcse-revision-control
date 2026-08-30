import { Router, type IRouter } from "express";
import { db, revisionStateTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import {
  GetRevisionStateResponse,
  SaveRevisionStateBody,
  SaveRevisionStateResponse,
} from "@workspace/api-zod";
import { buildSeedData, type AppData } from "../lib/seed-data";

const router: IRouter = Router();

router.get("/revision/state", async (_req, res): Promise<void> => {
  const [row] = await db
    .select()
    .from(revisionStateTable)
    .where(eq(revisionStateTable.id, 1));

  if (!row) {
    const data = buildSeedData();
    const [created] = await db
      .insert(revisionStateTable)
      .values({ id: 1, data })
      .returning();
    res.json(GetRevisionStateResponse.parse({ data, updatedAt: created.updatedAt.toISOString() }));
    return;
  }

  res.json(
    GetRevisionStateResponse.parse({
      data: row.data as AppData,
      updatedAt: row.updatedAt.toISOString(),
    }),
  );
});

router.put("/revision/state", async (req, res): Promise<void> => {
  const parsed = SaveRevisionStateBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const now = new Date();
  await db
    .insert(revisionStateTable)
    .values({ id: 1, data: parsed.data.data, updatedAt: now })
    .onConflictDoUpdate({
      target: revisionStateTable.id,
      set: { data: parsed.data.data, updatedAt: now },
    });

  res.json(SaveRevisionStateResponse.parse({ ok: true, updatedAt: now.toISOString() }));
});

export default router;