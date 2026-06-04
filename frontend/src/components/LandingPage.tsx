import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Brain,
  CheckCircle2,
  FileSearch,
  ShieldCheck,
  Sparkles,
  Target,
  Wand2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface LandingPageProps {
  onStart: () => void;
}

const features = [
  {
    icon: <Target className="h-5 w-5" />,
    title: "ATS Match Score",
    description: "Instantly see how your resume aligns with the job description and hiring criteria.",
  },
  {
    icon: <Wand2 className="h-5 w-5" />,
    title: "AI-Driven Improvements",
    description: "Get precise edits to improve keyword coverage, structure, and clarity.",
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: "Keyword Insights",
    description: "Surface missing skills and recommended phrases tailored to the role.",
  },
];

const stats = [
  { icon: <ShieldCheck className="h-5 w-5" />, value: "98%", label: "Accuracy" },
  { icon: <BarChart3 className="h-5 w-5" />, value: "10K+", label: "Resumes analyzed" },
  { icon: <Sparkles className="h-5 w-5" />, value: "Free", label: "No sign-up" },
];

const steps = [
  {
    num: "01",
    title: "Upload your resume",
    desc: "Drop a PDF or paste text and we normalize the formatting instantly.",
    icon: <FileSearch className="h-6 w-6" />,
  },
  {
    num: "02",
    title: "Add the job description",
    desc: "Paste the posting or a link to get a role-specific skill map.",
    icon: <Brain className="h-6 w-6" />,
  },
  {
    num: "03",
    title: "Review your ATS score",
    desc: "Get a structured report with clear, actionable improvements.",
    icon: <Target className="h-6 w-6" />,
  },
];

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 hero-grid opacity-70" />
      <div className="pointer-events-none absolute -top-32 right-[-10%] h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.25),transparent_70%)]" />
      <div className="pointer-events-none absolute top-1/3 left-[-15%] h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.22),transparent_70%)]" />

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-8">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white shadow-sm">
            <img src="/log.png" alt="ScanHire AI Logo" className="h-7 w-7 object-contain" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">ScanHire AI</p>
            <p className="text-xs text-muted-foreground">ATS Resume Analyzer</p>
          </div>
        </div>
        <div className="hidden items-center gap-4 text-sm text-muted-foreground md:flex">
          <a className="transition-colors hover:text-foreground" href="#features">Features</a>
          <a className="transition-colors hover:text-foreground" href="#how-it-works">How it works</a>
          <a className="transition-colors hover:text-foreground" href="#stats">Results</a>
          <Link className="transition-colors hover:text-foreground" to="/recommendations">Job recommendations</Link>
        </div>
        <Button onClick={onStart} size="sm" className="hidden md:inline-flex">
          Start free analysis
        </Button>
      </header>

      <section className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-24 pt-16 md:flex-row md:items-center md:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-1 flex-col gap-6"
        >
          <Badge variant="outline" className="w-fit border-violet-200 bg-white text-violet-700">
            AI-powered ATS analysis
          </Badge>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Build a resume that hiring systems love.
            </h1>
            <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
              ScanHire AI evaluates your resume against any job description and delivers a clean, professional report
              with scores, gaps, and improvement suggestions you can act on immediately.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="lg" onClick={onStart} className="gap-2">
              Start free analysis
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="gap-2" asChild>
              <a href="#features">
                View features
                <Sparkles className="h-4 w-4" />
              </a>
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-violet-600" />
              No sign-up required
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-violet-600" />
              Secure resume parsing
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-violet-600" />
              Results in seconds
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex-1"
        >
          <Card className="border border-slate-200 bg-white shadow-xl">
            <CardHeader className="space-y-2">
              <CardTitle className="text-xl text-slate-900">Your ATS score at a glance</CardTitle>
              <CardDescription>Preview the report format before you start.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-700">ATS Match</p>
                  <p className="text-sm font-semibold text-violet-700">82%</p>
                </div>
                <div className="mt-3 h-2 w-full rounded-full bg-slate-200">
                  <div className="h-2 w-[82%] rounded-full bg-gradient-to-r from-violet-600 to-purple-500" />
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Leadership keywords",
                  "ATS-friendly formatting",
                  "Skills coverage",
                  "Impact-focused bullet points",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-violet-600" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-muted-foreground">
                <span className="font-semibold text-slate-800">Top missing skills:</span> Stakeholder management,
                Cloud migration, SQL optimization
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      <section id="features" className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24">
        <div className="mb-10 flex flex-col gap-4 text-center">
          <Badge variant="outline" className="mx-auto w-fit border-violet-200 bg-white text-violet-700">
            Premium analysis
          </Badge>
          <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">Everything you need to pass ATS filters</h2>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground">
            ScanHire AI combines parsing, keyword intelligence, and tailored recommendations to help your resume stand
            out with recruiters and automated systems.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
              <CardHeader className="space-y-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg text-slate-900">{feature.title}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24">
        <div className="mb-10 flex flex-col gap-4 text-center">
          <Badge variant="outline" className="mx-auto w-fit border-slate-200 bg-white text-slate-700">
            How it works
          </Badge>
          <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">A fast workflow built for busy applicants</h2>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground">
            From upload to actionable insights in under a minute. Designed for clarity and consistency.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <Card key={step.num} className="border border-slate-200 bg-white shadow-sm">
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-violet-700">
                    {step.icon}
                  </div>
                  <span className="text-sm font-semibold text-slate-500">{step.num}</span>
                </div>
                <div className="space-y-2">
                  <CardTitle className="text-lg text-slate-900">{step.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">{step.desc}</CardDescription>
                </div>
              </CardHeader>
              {index < steps.length - 1 && (
                <CardContent>
                  <div className="hidden h-px w-full bg-gradient-to-r from-violet-200 via-slate-200 to-transparent md:block" />
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </section>

      <section id="stats" className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-24">
        <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white px-6 py-10 text-center shadow-sm sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="space-y-2">
              <div className="flex items-center justify-center text-violet-600">{stat.icon}</div>
              <p className="text-3xl font-semibold text-slate-900">{stat.value}</p>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-white via-violet-50 to-purple-50 px-8 py-12 text-center shadow-sm">
          <div className="mx-auto max-w-2xl space-y-5">
            <Badge className="mx-auto w-fit border-violet-200 bg-violet-50 text-slate-500" variant="outline">
              Ready to get started?
            </Badge>
            <h3 className="text-3xl font-semibold text-slate-900 sm:text-4xl">Move from resume draft to offer-ready.</h3>
            <p className="text-sm text-slate-600 sm:text-base">
              Upload your resume and job description to receive a professional report with clear ATS improvements.
            </p>
            <Button size="lg" onClick={onStart} className="bg-violet-600 hover:bg-violet-700">
              Get your free report
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-slate-50">
              <img src="/log.png" alt="ScanHire AI Logo" className="h-6 w-6 object-contain" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">ScanHire AI</p>
              <p className="text-xs text-muted-foreground">Premium ATS resume analyzer</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a className="transition-colors hover:text-slate-900" href="#features">Features</a>
            <a className="transition-colors hover:text-slate-900" href="#how-it-works">How it works</a>
            <a className="transition-colors hover:text-slate-900" href="#stats">Results</a>
          </div>
          <p className="text-xs text-muted-foreground">Built with AI · Free forever</p>
        </div>
      </footer>
    </div>
  );
}