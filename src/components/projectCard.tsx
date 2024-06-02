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
import { useState } from "react";
import { ArrowRightIcon } from "./ui/SVGIcons";

export interface ProjectCardProps {
  project: WritingProject;
  addEntry: (e: Entry) => void;
}

export function ProjectCard({ project, addEntry }: ProjectCardProps) {
  const daysLeft = Math.round(
    (project.endDate.getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000),
  );

  const [newWordCount, setNewWordCount] = useState(project.currentCount);

  const wordsLeftTotal = project.goalCount - project.currentCount;

  const wordsToday =
    daysLeft > 0 ? Math.round(wordsLeftTotal / daysLeft) : wordsLeftTotal;

  return (
    <Card className="group m-5 w-[500px]">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>{project.title}</CardTitle>
          <div className="flex flex-row">
            <div className="mr-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <EditDialog project={project} />
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
        <div>Words remaining today: {wordsRemainingToday(project)}</div>
      </CardContent>
      <CardFooter>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const entry: Entry = {
              newCount: newWordCount,
              diff: newWordCount - project.currentCount,
              date: new Date(),
            };
            addEntry(entry);
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
              className="mr-1 w-1/5"
            />
            <Button>Update</Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}
