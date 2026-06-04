import { getRecommendedJobs } from "../services/jobService.js";

export const getJobs = async (req, res) => {
  try {
    const { profile = {}, query = "" } = req.body || {};
    const jobs = await getRecommendedJobs(profile, query);
    res.json({ success: true, jobs });
  } catch (error) {
    console.error("Job recommendation error:", error);
    res.status(500).json({ error: "Failed to fetch job recommendations" });
  }
};
