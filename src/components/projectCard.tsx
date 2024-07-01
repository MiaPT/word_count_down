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
import { ArrowRightIcon, CheckmarkIcon } from "./ui/SVGIcons";
import Confetti from "react-confetti";

export interface ProjectCardProps {
  project: WritingProject;
  addEntry: (e: Entry) => void;
}

export function ProjectCard({ project, addEntry }: ProjectCardProps) {
  const daysLeft = Math.round(
    (project.endDate.getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000),
  );

  const [runSmallConfetti, setRunSmallConfetti] = useState(false);
  const [runBigConfetti, setRunBigConfetti] = useState(false);

  const [newWordCount, setNewWordCount] = useState(project.currentCount);

  const wordsLeftToday = wordsRemainingToday(project)

  return (
    <Card className="group m-5 w-[350px] sm:w-[500px]">
      <Confetti
        tweenDuration={1500}
        numberOfPieces={300}
        recycle={false}
        run={runSmallConfetti}
      />
      <Confetti
        tweenDuration={5000}
        numberOfPieces={10000}
        recycle={false}
        run={runBigConfetti}
      />
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
        <div>Words remaining today: {wordsLeftToday}</div>
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
            console.log("Words left today: ", wordsLeftToday, "\n diff:", entry.diff)
            if (entry.newCount >= project.goalCount) {
              setRunBigConfetti(true);
            } else if (entry.diff >= wordsLeftToday) {
              setRunSmallConfetti(true);
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
              className="mr-1 w-1/5"
            />
            <Button>Update</Button>
            <CheckmarkIcon className={"stroke-green-700 ml-5 stroke-[4] size-10 " +  (wordsLeftToday > 0 ? "invisible" : "visible")} />
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}
