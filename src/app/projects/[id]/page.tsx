"use client";

import { useParams } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";
import { WritingProject } from "~/types";
import { projectDeserializer } from "~/lib/manageProjectFunctions";
import {
  generateGraphPoints_SingleProject,
} from "~/lib/calculations";

import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";
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

export default function ProjectPage() {
  const params = useParams<{ id: string }>();

  const [projects, saveProjects] = useLocalStorage<WritingProject[]>(
    "projects",
    [],
    {
      deserializer: projectDeserializer,
    },
  );

  const project = projects.filter((p) => p.id === params.id)[0];

  const uniqueDates = Array.from(
    new Set(project!.entries.map((e) => e.date.toLocaleDateString())),
  );

  if (uniqueDates.length < 2) {
    return (
      <p>
        Statistics for {project?.title} will appear here once there is more data
        to show:)
      </p>
    );
  }

  const chartData = generateGraphPoints_SingleProject(project!);

  console.log("chartdata", chartData);

  const chartConfig = {
    written: {
      label: "Words written:  ",
      color: "#70b5ff",
    },
  } satisfies ChartConfig;

  return (
    <div className="h-5">
      <Card>
        <CardHeader>
          <CardTitle>Words written per day on {project?.title}</CardTitle>
          <CardDescription>
            {chartData[0]?.date} - {chartData[chartData.length - 1]?.date}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[50rem]">
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 20,
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)} // eslint-disable-line
              />
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
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
