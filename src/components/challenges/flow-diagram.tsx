import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface FlowStep {
  label: string;
  description?: string;
  icon: LucideIcon;
  highlight?: boolean;
}

interface FlowDiagramProps {
  steps: FlowStep[];
  activeStep?: number;
}

export function FlowDiagram({ steps, activeStep }: FlowDiagramProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 flex-wrap">
      {steps.map((step, i) => {
        const isActive = activeStep === i;
        const isHighlighted = step.highlight || isActive;
        return (
          <div key={step.label} className="flex items-center gap-2">
            <div
              className={cn(
                "flex items-center gap-2 rounded-lg border px-3 py-2 transition-colors",
                isActive
                  ? "border-primary bg-primary/10"
                  : isHighlighted
                  ? "border-primary/40 bg-primary/5"
                  : "border-border bg-card"
              )}
            >
              <step.icon
                className={cn(
                  "w-4 h-4 shrink-0",
                  isHighlighted ? "text-primary" : "text-muted-foreground"
                )}
              />
              <div>
                <p
                  className={cn(
                    "text-xs font-medium",
                    isHighlighted ? "text-primary" : ""
                  )}
                >
                  {step.label}
                </p>
                {step.description && (
                  <p className="text-[10px] text-muted-foreground">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
            {i < steps.length - 1 && (
              <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0 hidden sm:block" />
            )}
          </div>
        );
      })}
    </div>
  );
}
