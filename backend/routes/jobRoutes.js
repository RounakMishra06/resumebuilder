import express from "express";
import { getJobs } from "../controllers/jobController.js";

const router = express.Router();

router.post("/jobs", getJobs);

export default router;
