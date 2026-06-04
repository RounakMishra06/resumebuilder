import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { JobRecommendation } from "@/lib/jobService";

interface JobCardProps {
  job: JobRecommendation;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-base text-slate-900">{job.position}</CardTitle>
            <CardDescription className="text-sm text-slate-500">{job.company}</CardDescription>
          </div>
          <Badge className="rounded-full bg-slate-100 text-slate-700 border border-slate-200">{job.matchPercent}% match</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-slate-600">
        <div className="flex flex-wrap gap-2">
          {job.tags.slice(0, 5).map((tag) => (
            <Badge key={tag} className="bg-violet-100 text-violet-700 border border-violet-200">
              {tag}
            </Badge>
          ))}
        </div>
        <p className="max-h-[6rem] overflow-hidden text-sm leading-6">{job.description}</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-3 pt-0">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
          {job.location ? <span>{job.location}</span> : null}
          {job.matchedKeywords.length ? (
            <span className="rounded-full bg-slate-100 px-2 py-1 text-slate-600">{job.matchedKeywords.length} keywords matched</span>
          ) : null}
        </div>
        <Button
          asChild
          variant="secondary"
          className="w-full justify-between"
        >
          <a href={job.url} target="_blank" rel="noreferrer noopener" className="w-full flex items-center justify-between">
            Apply now
            <ArrowRight className="w-4 h-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
