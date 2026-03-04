import Link from "next/link";
import { profile, portfolioProjects } from "@/data/proposal";
import { ProjectCard } from "@/components/proposal/project-card";
import { SkillsGrid } from "@/components/proposal/skills-grid";

export default function ProposalPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-12">

      {/* ── Section 1: Hero ── */}
      <section
        className="relative rounded-[var(--radius-lg)] overflow-hidden"
        style={{ background: "oklch(0.10 0.02 var(--primary-h, 155))" }}
      >
        {/* Subtle radial highlight */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at top, oklch(0.65 0.22 155 / 0.12), transparent 65%)",
          }}
        />

        <div className="relative z-10 p-8 md:p-12 space-y-5">
          {/* Effort badge */}
          <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-white/10 border border-white/10 text-white/80 px-3 py-1 rounded-full">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
            </span>
            Built this demo for your project
          </span>

          {/* Muted role prefix */}
          <p className="font-mono text-xs tracking-widest uppercase text-white/40">
            Full-Stack Developer — Sports &amp; Real-Time Apps
          </p>

          {/* Weight contrast headline */}
          <h1 className="text-5xl md:text-6xl tracking-tight leading-none">
            <span className="font-light text-white/70">Hi, I&apos;m</span>{" "}
            <span className="font-black text-white">{profile.name}</span>
          </h1>

          {/* Tailored value prop */}
          <p className="text-lg md:text-xl text-white/65 max-w-2xl leading-relaxed">
            {profile.tagline}
          </p>

          <p className="text-sm text-white/50 max-w-2xl leading-relaxed">
            {profile.bio}
          </p>
        </div>

        {/* Stats shelf */}
        <div
          className="relative z-10 border-t px-8 py-5"
          style={{
            borderColor: "oklch(1 0 0 / 0.08)",
            background: "oklch(1 0 0 / 0.04)",
          }}
        >
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: "24+", label: "Projects Shipped" },
              { value: "< 48hr", label: "Demo Turnaround" },
              { value: "15+", label: "Industries Served" },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  className="text-2xl font-bold"
                  style={{
                    background: "linear-gradient(to right, white, oklch(1 0 0 / 0.65))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-white/50 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 2: Proof of Work ── */}
      <section className="space-y-4">
        <div>
          <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-1">
            Proof of Work
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Relevant Projects
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {portfolioProjects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              tech={project.tech}
              relevance={project.relevance}
              outcome={project.outcome}
              liveUrl={project.liveUrl}
            />
          ))}
        </div>
      </section>

      {/* ── Section 3: How I Work ── */}
      <section className="space-y-4">
        <div>
          <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-1">
            Process
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            How I Work
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {profile.approach.map((step, i) => (
            <div key={step.title} className="aesthetic-card p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
                  Step {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-xs text-muted-foreground/50">
                  {i === 0
                    ? "Day 1"
                    : i === 1
                    ? "Days 2–7"
                    : i === 2
                    ? "By Mar 15"
                    : "Mar 19–22"}
                </span>
              </div>
              <h3 className="text-base font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 4: Skills Grid ── */}
      <section className="space-y-4">
        <div>
          <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-1">
            Tech Stack
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            What I Build With
          </h2>
        </div>

        <SkillsGrid categories={profile.skillCategories} />
      </section>

      {/* ── Section 5: CTA ── */}
      <section
        className="relative rounded-[var(--radius-lg)] overflow-hidden text-center"
        style={{ background: "oklch(0.10 0.02 var(--primary-h, 155))" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at bottom, oklch(0.65 0.22 155 / 0.10), transparent 70%)",
          }}
        />

        <div className="relative z-10 p-8 md:p-12 space-y-4">
          {/* Pulsing availability indicator */}
          <div className="flex items-center justify-center gap-2">
            <span className="relative inline-flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: "var(--success)" }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ backgroundColor: "var(--success)" }}
              />
            </span>
            <span
              className="text-sm"
              style={{
                color: "color-mix(in oklch, var(--success) 80%, white)",
              }}
            >
              Currently available for new projects
            </span>
          </div>

          {/* Tailored headline */}
          <h2 className="text-2xl font-bold text-white">
            Your March 15 deadline is tight. Let&apos;s make it.
          </h2>

          {/* Specific body */}
          <p className="text-white/65 max-w-lg mx-auto leading-relaxed text-sm">
            The demo in Tab 1 shows the production architecture. Firebase
            Realtime DB, live scoring, pool management — all of it. Reply on
            Upwork and I can scope the full build in one conversation.
          </p>

          {/* Primary action — text, not a dead-end button */}
          <p className="text-lg font-semibold text-white pt-2">
            Reply on Upwork to start
          </p>

          {/* Secondary link back to demo */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm text-white/40 hover:text-white/60"
              style={{ transition: "color var(--t-interactive)" }}
            >
              Back to the demo
            </Link>
          </div>

          {/* Signature */}
          <p
            className="pt-4 text-sm text-white/30 border-t mt-4"
            style={{ borderColor: "oklch(1 0 0 / 0.08)" }}
          >
            -- Humam
          </p>
        </div>
      </section>

    </div>
  );
}
