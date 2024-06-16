"use client";

import { useParams } from "next/navigation";
import { ResponsiveLine } from "@nivo/line";
import { useLocalStorage } from "usehooks-ts";
import { WritingProject } from "~/types";
import { projectDeserializer } from "~/lib/manageProjectFunctions";
import { projectsToGraphData } from "~/lib/calculations";

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
    
    if (uniqueDates.length < 2){
      return(
        <p>Statistics for {project?.title} will appear here once there is more data to show:)</p>
      )
    }
    
  const data = projectsToGraphData([project!]);

  const theme = {
    axis: {
      legend: {
        text: {
          fill: "#a39f9f",
        },
      },
      ticks: {
        text: {
          fontSize: 11,
          fill: "#a39f9f",
          outlineWidth: 0,
          outlineColor: "transparent",
        },
      },
    },
    legends: {
      text: {
        fill: "#a39f9f",
      },
    },
  };

  return (


    <div className="w-100 h-96 text-black">
      <p className="text-white">Words written per day on {project?.title}</p>
      <ResponsiveLine
        data={data}
        theme={theme}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Dates",
          legendOffset: 36,
          legendPosition: "middle",
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "words written",
          legendOffset: -40,
          legendPosition: "middle",
          truncateTickAt: 0,
        }}
        pointSize={10}
        colors={{ scheme: "paired" }}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabel="data.yFormatted"
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "square",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
}
