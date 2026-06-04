import axios from "axios";

const normalizeTerm = (term) =>
  String(term || "")
    .trim()
    .toLowerCase()
    .replace(/["'`]/g, "");

const splitTerms = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value.flatMap(splitTerms);
  }

  return String(value)
    .split(/[,\n\r\t\/\\|•·]+/)
    .flatMap((chunk) =>
      String(chunk)
        .split(/\s+/)
        .map(normalizeTerm)
        .filter(Boolean)
    );
};

const stripHtml = (text) =>
  String(text || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

const normalizeText = (text) => stripHtml(text).toLowerCase();

const buildTerms = (profile = {}) => {
  const terms = [];
  const add = (value) => {
    if (!value) return;
    if (Array.isArray(value)) {
      value.forEach(add);
      return;
    }
    if (typeof value === "string") {
      splitTerms(value).forEach((term) => terms.push(term));
      return;
    }
    if (typeof value === "object") {
      Object.values(value).forEach(add);
    }
  };

  add(profile.skills);
  add(profile.technologies);
  add(profile.keywords);
  add(profile.roles);
  add(profile.experience);
  add(profile.experienceYears);

  return [...new Set(terms.filter(Boolean))];
};

const scoreJob = (job, normalizedTerms, queryTerm) => {
  const title = normalizeText(job.position || job.title || "");
  const company = normalizeText(job.company || "");
  const tags = Array.isArray(job.tags) ? job.tags.map(normalizeTerm) : [];
  const description = normalizeText(job.description || job.description_plain || "");
  const location = normalizeText(job.location || "");

  const text = [title, company, tags.join(" "), description, location].join(" ");

  const matchedKeywords = normalizedTerms.filter((term) => term && text.includes(term));
  const uniqueMatched = [...new Set(matchedKeywords)];
  const coverage = normalizedTerms.length ? Math.round((uniqueMatched.length / normalizedTerms.length) * 100) : 0;
  const queryMatch = queryTerm && text.includes(queryTerm.toLowerCase()) ? 12 : 0;
  const titleBoost = title.includes(queryTerm?.toLowerCase() || "") ? 8 : 0;

  const score = Math.min(100, Math.max(0, coverage + queryMatch + titleBoost));

  return {
    ...job,
    matchPercent: score,
    matchedKeywords: uniqueMatched,
  };
};

export const fetchRemoteOkJobs = async () => {
  const response = await axios.get("https://remoteok.com/api", {
    headers: {
      Accept: "application/json",
      "User-Agent": "ScanHireAI Job Matcher/1.0",
    },
    timeout: 15000,
  });

  if (!Array.isArray(response.data)) {
    throw new Error("RemoteOK returned unexpected data");
  }

  return response.data
    .filter((item) => item && item.id && item.company && item.position)
    .map((item) => ({
      id: item.id,
      company: item.company,
      position: item.position,
      tags: Array.isArray(item.tags) ? item.tags : [],
      location: item.location || item.city || "",
      url: item.url?.startsWith("http") ? item.url : `https://remoteok.com${item.url}`,
      description: stripHtml(item.description || item.description_plain || item.tags?.join(" ") || ""),
      source: item.source || "remoteok",
    }));
};

export const getRecommendedJobs = async (profile = {}, query = "") => {
  const jobs = await fetchRemoteOkJobs();
  const normalizedTerms = buildTerms(profile);
  const queryTerm = typeof query === "string" ? query.trim() : "";

  return jobs
    .map((job) => scoreJob(job, normalizedTerms, queryTerm))
    .sort((a, b) => b.matchPercent - a.matchPercent)
    .slice(0, 12);
};
