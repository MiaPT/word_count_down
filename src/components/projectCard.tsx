import * as React from "react";

import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Entry, WritingProject } from "~/types";
import Link from "next/link";
import { wordsRemainingToday } from "~/lib/calculations";
import { EditDialog } from "./editDialog";
import { useRef, useState } from "react";
import { ArrowRightIcon, CheckmarkIcon } from "./ui/SVGIcons";
import Realistic from "react-canvas-confetti/dist/presets/realistic";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import { useConfetti } from "~/lib/useConfetti";

export interface ProjectCardProps {
  project: WritingProject;
  saveProject: (project: WritingProject) => void;
  deleteProject: () => void;
}

export function ProjectCard({
  project,
  saveProject,
  deleteProject,
}: ProjectCardProps) {
  const daysLeft = Math.round(
    (project.endDate.getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000),
  );

  const {
    checkmarkContainerRef,
    computeConfettiPosition,
    shootConfetti,
    shootFireworks,
    setConfettiConductor,
    setFireworksConductor,
  } = useConfetti(project);

  const [newWordCount, setNewWordCount] = useState(project.currentCount);

  const wordsLeftToday = wordsRemainingToday(project);

  return (
    <Card className="group m-5 w-[350px] sm:w-[500px]">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>{project.title}</CardTitle>
          <div className="flex flex-row">
            <div className="mr-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <EditDialog
                project={project}
                saveProject={saveProject}
                deleteProject={deleteProject}
              />
            </div>
            <Link href={`/projects/${project.id}`}>
              <div className="transition-transform duration-500 hover:translate-x-1">
                <ArrowRightIcon />
              </div>
            </Link>
          </div>
        </div>
        <CardDescription>
          Current word count: {project.currentCount} | Goal count:{" "}
          {project.goalCount} | {daysLeft} days left{" "}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>Words remaining today: {wordsLeftToday}</div>
      </CardContent>
      <CardFooter>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const entry: Entry = {
              newTotal: newWordCount,
              diff: newWordCount - project.currentCount,
              date: new Date(),
            };
            saveProject({
              ...project,
              entries: [...project.entries, entry],
              currentCount: entry.newTotal,
              lastModified: new Date(),
            });
            if (entry.newTotal >= project.goalCount) {
              shootFireworks(3);
            } else if (entry.diff >= wordsLeftToday) {
              shootConfetti();
            }
          }}
        >
          <div className="flex">
            <Label htmlFor="newWordCount" className="mr-5">
              Enter new word count:
            </Label>
            <Input
              required
              name="newWordCount"
              type="number"
              value={newWordCount}
              onChange={(e) => setNewWordCount(e.target.valueAsNumber)}
              className="mr-1 w-2/5 sm:w-1/5"
            />
            <Button>Update</Button>
            <Fireworks
              onInit={({ conductor }) => setFireworksConductor(conductor)}
            />
            <Realistic
              onInit={({ conductor }) => setConfettiConductor(conductor)}
              decorateOptions={(options) => ({
                ...options,
                origin: computeConfettiPosition(),
              })}
            />
            <span ref={checkmarkContainerRef} className="ml-5">
              <CheckmarkIcon
                className={
                  "size-10 stroke-green-700 stroke-[4] " +
                  (wordsLeftToday > 0 ? "opacity-0" : "opacity-100")
                }
              />
            </span>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}
