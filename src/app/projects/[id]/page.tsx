"use client";

import { useParams } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";
import { WritingProject } from "~/types";
import { projectDeserializer } from "~/lib/manageProjectFunctions";
import { generateGraphPoints_SingleProject } from "~/lib/calculations";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
import { Button } from "~/components/ui/button";
import { useMemo, useState } from "react";

export default function ProjectPage() {
  const params = useParams<{ id: string }>();

  const [projects, saveProjects] = useLocalStorage<WritingProject[]>(
    "projects",
    [],
    {
      deserializer: projectDeserializer,
    },
  );

  const [includeInactiveDates, setIncludeInactiveDates] = useState(false);

  const project = projects.filter((p) => p.id === params.id)[0];

  const uniqueDates = Array.from(
    new Set(project!.entries.map((e) => e.date.toLocaleDateString())),
  );
  
  const [chartDataAllDates, chartDataActiveDates] = useMemo(
    () => generateGraphPoints_SingleProject(project!),
    [project?.entries],
    );
    
  if (uniqueDates.length < 2) {
    return (
      <p>
        Statistics for {project?.title} will appear here once there is more data
        to show:)
      </p>
    );
  }
    
  const chartConfig = {
    written: {
      label: "Words written:  ",
      color: "#70b5ff",
    },
  } satisfies ChartConfig;

  const lineChart = (
    <LineChart
      accessibilityLayer
      data={includeInactiveDates ? chartDataAllDates : chartDataActiveDates}
      margin={{
        top: 20,
        left: 12,
        right: 12,
      }}
    >
      <CartesianGrid vertical={false} />
      <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
      <ChartTooltip
        cursor={false}
        content={<ChartTooltipContent indicator="line" />}
      />
      <Line
        dataKey="written"
        type="natural"
        stroke="var(--color-written)"
        strokeWidth={2}
        dot={{
          fill: "var(--color-written)",
        }}
        activeDot={{
          r: 6,
        }}
      >
        <LabelList
          position="top"
          offset={12}
          className="fill-foreground"
          fontSize={12}
        />
      </Line>
    </LineChart>
  );

  const barChart = (
    <BarChart
      accessibilityLayer
      data={includeInactiveDates ? chartDataAllDates : chartDataActiveDates}
      layout="vertical"
      margin={{
        right: 16,
      }}
    >
      <CartesianGrid horizontal={false} />
      <YAxis
        dataKey="date"
        type="category"
        tickLine={false}
        tickMargin={10}
        axisLine={false}
        hide
      />
      <XAxis dataKey="written" type="number" hide />
      <ChartTooltip
        cursor={false}
        content={<ChartTooltipContent indicator="line" />}
      />
      <Bar
        dataKey="written"
        layout="vertical"
        fill="var(--color-written)"
        radius={4}
      >
        <LabelList
          dataKey="written"
          position="insideLeft"
          offset={8}
          className="fill-foreground"
          fontSize={12}
        />
      </Bar>
    </BarChart>
  );

  return (
    <div className="h-5">
      <Card>
        <CardHeader>
          <CardTitle>Words written per day on {project?.title}</CardTitle>
          <div className="flex flex-row justify-between">
            <CardDescription>
              {chartDataAllDates![0]?.date} -{" "}
              {chartDataAllDates![chartDataAllDates!.length - 1]?.date}
            </CardDescription>

            <Button
              onClick={() => setIncludeInactiveDates(!includeInactiveDates)}
            >
              {includeInactiveDates
                ? "Show only dates with activity"
                : "Show all dates"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <ChartContainer
              config={chartConfig}
              className="visible h-[50rem] max-w-xs sm:invisible sm:max-h-0 sm:max-w-0"
            >
              {barChart}
            </ChartContainer>
            <ChartContainer
              config={chartConfig}
              className="invisible h-0 sm:visible sm:h-[50rem]"
            >
              {lineChart}
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
