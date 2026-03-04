import { ExternalLink, TrendingUp } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  relevance?: string;
  outcome?: string;
  liveUrl?: string;
}

export function ProjectCard({
  title,
  description,
  tech,
  relevance,
  outcome,
  liveUrl,
}: ProjectCardProps) {
  return (
    <div className="aesthetic-card p-5 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base font-semibold text-foreground leading-snug">
          {title}
        </h3>
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary shrink-0 mt-0.5"
            style={{ transition: "color var(--t-interactive)" }}
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>

      {outcome && (
        <div className="flex items-start gap-2 text-sm">
          <TrendingUp
            className="w-3.5 h-3.5 mt-0.5 shrink-0"
            style={{ color: "var(--success)" }}
          />
          <span style={{ color: "var(--success)" }}>{outcome}</span>
        </div>
      )}

      <div className="flex flex-wrap gap-1.5">
        {tech.map((t) => (
          <span
            key={t}
            className="px-2 py-0.5 rounded-md bg-muted text-xs font-mono text-muted-foreground border border-border/60"
          >
            {t}
          </span>
        ))}
      </div>

      {relevance && (
        <p
          className="text-xs italic border-t border-border/40 pt-2"
          style={{ color: "color-mix(in oklch, var(--primary) 70%, var(--muted-foreground))" }}
        >
          {relevance}
        </p>
      )}
    </div>
  );
}
