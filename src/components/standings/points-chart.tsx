"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { pointsOverTime } from "@/data/mock-data";

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="aesthetic-card px-3 py-2 text-xs space-y-1.5 min-w-[140px]">
      <p className="font-medium text-foreground">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">{entry.name}</span>
          <span className="font-mono font-semibold" style={{ color: entry.color }}>
            {entry.value} pts
          </span>
        </div>
      ))}
    </div>
  );
}

export function PointsOverTimeChart() {
  // Filter to rounds with actual data
  const chartData = pointsOverTime.filter(
    (d) => d.player1 > 0 || d.player2 > 0 || d.player3 > 0
  );

  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart
        data={chartData}
        margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="oklch(1 0 0 / 0.06)"
          vertical={false}
        />
        <XAxis
          dataKey="round"
          tick={{ fontSize: 11, fill: "oklch(0.60 0 0)" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "oklch(0.60 0 0)" }}
          axisLine={false}
          tickLine={false}
          width={36}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ fontSize: "11px", paddingTop: "12px" }}
          formatter={(value) => (
            <span style={{ color: "oklch(0.60 0 0)" }}>{value}</span>
          )}
        />
        <Line
          type="monotone"
          dataKey="player1"
          name="Sarah T."
          stroke="oklch(0.65 0.22 155)"
          strokeWidth={2}
          dot={{ r: 3, fill: "oklch(0.65 0.22 155)" }}
          activeDot={{ r: 5 }}
        />
        <Line
          type="monotone"
          dataKey="player2"
          name="Mike R."
          stroke="oklch(0.60 0.15 200)"
          strokeWidth={2}
          dot={{ r: 3, fill: "oklch(0.60 0.15 200)" }}
          activeDot={{ r: 5 }}
        />
        <Line
          type="monotone"
          dataKey="player3"
          name="You"
          stroke="oklch(0.75 0.18 85)"
          strokeWidth={2.5}
          strokeDasharray="none"
          dot={{ r: 4, fill: "oklch(0.75 0.18 85)", strokeWidth: 2 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
