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

export interface ProjectCardProps {
  project: WritingProject;
  addEntry: (e: Entry) => void;
}

export function ProjectCard({ project, addEntry }: ProjectCardProps) {
  const daysLeft = Math.round(
    (project.endDate.getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000),
  );

  const wordsLeftTotal = project.goalCount - project.currentCount;

  const wordsToday =
    daysLeft > 0 ? Math.round(wordsLeftTotal / daysLeft) : wordsLeftTotal;

  return (
    <Card className="m-5 w-[500px]">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>{project.title}</CardTitle>
          <Link href={`/projects/${project.id}`}>
            <div className="transition-transform duration-500 hover:translate-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </div>
          </Link>
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
            const newCount = e.target.elements.newWordCount.value;
            const entry: Entry = {
              newCount,
              diff: newCount - project.currentCount,
              date: new Date(),
            };
            addEntry(entry);
          }}
        >
          <div className="flex">
            <Label htmlFor="newWordCount" className="mr-5">
              Enter new word count:
            </Label>
            <Input name="newWordCount" type="number" className="mr-1 w-1/5" />
            <Button>Update</Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}
