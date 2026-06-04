import { RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import JobCard from "@/components/JobCard";
import type { JobRecommendation } from "@/lib/jobService";

interface JobRecommendationsProps {
  jobs: JobRecommendation[];
  loading: boolean;
  error?: string;
  onRefresh: () => void;
}

export default function JobRecommendations({ jobs, loading, error, onRefresh }: JobRecommendationsProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-secondary/10 border border-border/60">
        <CardHeader>
          <CardTitle className="text-lg">Job Recommendations</CardTitle>
          <CardDescription>
            Recommendations are automatically generated from your resume skills, technologies, keywords, and inferred roles.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-600">Ranked by relevance score from RemoteOK.</p>
              <p className="text-xs text-slate-500">Use your ATS analysis to refine the resume and try again.</p>
            </div>
            <Button variant="secondary" onClick={onRefresh} disabled={loading} className="w-full sm:w-auto">
              {loading ? (
                <>
                  <RefreshCcw className="mr-2 h-4 w-4 animate-spin" /> Updating
                </>
              ) : (
                "Refresh recommendations"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <div className="rounded-3xl border border-border/60 bg-white p-10 text-center text-slate-500">
          Loading job matches...
        </div>
      ) : error ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-10 text-center text-red-700">
          {error}
        </div>
      ) : !jobs.length ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white/80 p-10 text-center text-slate-600">
          Start the ATS analysis to generate matching remote jobs automatically.
        </div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
