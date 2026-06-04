export interface CandidateProfile {
  skills?: string[];
  technologies?: string[];
  keywords?: string[];
  roles?: string[];
  experience?: string;
  experienceYears?: string;
}

export interface JobRecommendation {
  id: string | number;
  company: string;
  position: string;
  tags: string[];
  location: string;
  url: string;
  description: string;
  matchPercent: number;
  matchedKeywords: string[];
}

const extractJson = (text: string) => {
  const trimmed = String(text || "").trim();
  const jsonMatch = trimmed.match(/({[\s\S]*})/m);

  if (!jsonMatch) {
    return null;
  }

  try {
    return JSON.parse(jsonMatch[1]);
  } catch {
    try {
      return JSON.parse(trimmed);
    } catch {
      return null;
    }
  }
};

const normalizeList = (value: any) => {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean).map(String);
  if (typeof value === "string") {
    return value
      .split(/[\n,;|•·\/\\]+/)
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [String(value)];
};

const textToKeywords = (text: string, limit = 36) => {
  const tokens = Array.from(
    new Set(
      String(text || "")
        .toLowerCase()
        .match(/\b[a-z0-9+#.+-]{2,}\b/g) || []
    )
  );
  return tokens.slice(0, limit);
};

export const inferProfileFromResume = async (
  resume: string,
  model: string
): Promise<CandidateProfile> => {
  const prompt = `Extract resume details in JSON only.

Return an object with these keys:
- skills: array of skills
- technologies: array of technologies
- keywords: array of keywords
- roles: array of inferred job titles or career roles
- experienceYears: a short experience summary

Do NOT include any extra text. Use JSON only.

Resume:
${resume}`;

  const response = await window.puter.ai.chat(prompt, { model });
  const raw = (response?.message?.content || response?.content || response || "").toString();
  const parsed = extractJson(raw);

  if (parsed) {
    return {
      skills: normalizeList(parsed.skills),
      technologies: normalizeList(parsed.technologies),
      keywords: normalizeList(parsed.keywords),
      roles: normalizeList(parsed.roles),
      experience: parsed.experience || parsed.experienceYears || "",
      experienceYears: parsed.experienceYears || parsed.experience || "",
    };
  }

  return {
    skills: textToKeywords(resume).slice(0, 20),
    technologies: textToKeywords(resume).slice(0, 20),
    keywords: textToKeywords(resume).slice(0, 20),
    roles: textToKeywords(resume, 12).slice(0, 4),
    experience: "",
    experienceYears: "",
  };
};

export const getJobRecommendations = async (
  backendURL: string,
  profile: CandidateProfile,
  query: string
): Promise<JobRecommendation[]> => {
  const response = await fetch(`${backendURL}/api/jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ profile, query }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Failed to fetch job recommendations");
  }

  const payload = await response.json();
  return Array.isArray(payload.jobs) ? payload.jobs : [];
};
