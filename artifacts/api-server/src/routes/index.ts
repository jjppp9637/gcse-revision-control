import { Router, type IRouter } from "express";
import healthRouter from "./health";
import revisionRouter from "./revision";
import assistantRouter from "./assistant";

const router: IRouter = Router();

router.use(healthRouter);
router.use(revisionRouter);
router.use(assistantRouter);

export default router;
