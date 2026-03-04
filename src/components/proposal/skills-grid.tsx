interface SkillCategory {
  name: string;
  skills: string[];
}

interface SkillsGridProps {
  categories: SkillCategory[];
}

export function SkillsGrid({ categories }: SkillsGridProps) {
  return (
    <div className="space-y-3">
      {categories.map((category) => (
        <div key={category.name} className="aesthetic-card p-4 space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest font-mono">
            {category.name}
          </p>
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded-md border border-border/60 text-sm font-mono text-foreground/80 bg-muted/30"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
