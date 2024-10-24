"use client";

import { Entry, type WritingProject } from "~/types";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { nanoid } from "nanoid";
import { useLocalStorage } from "usehooks-ts";
import { useState } from "react";
import { DatePicker } from "./datePicker";
import { useAuth } from "@clerk/nextjs";

// function generateEntries(startCount: number, startDate: Date): Entry[] {
//   if (startCount === 0 || startDate === new Date()) {
//     return [{ newCount: startCount, date: new Date(), diff: startCount }];
//   }

//   return [{ newCount: startCount, date: new Date(), diff: startCount }];
// }

type ProjectResponse = {
  message: string;
  project: WritingProject;
};

async function saveProjectDB(project: WritingProject) {
  const response = await fetch("/api/project", {
    method: "POST",
    body: JSON.stringify(project),
  });
  if (response.ok) {
    const data: ProjectResponse = (await response.json()) as ProjectResponse;
    return { message: data.message, status: 200, project: data.project };
  } else {
    return { message: "Failed to add project", status: 500, project: null };
  }
}

export function CreationDialog() {
  const today = new Date();

  const { isSignedIn } = useAuth();

  const [title, setTitle] = useState("");
  const [goalCount, setGoalCount] = useState<number | undefined>();
  const [startCount, setStartCount] = useState(0);
  const [startDate, setStartDate] = useState<Date | undefined>(today);
  const [endDate, setEndDate] = useState<Date | undefined>();
  const newID = nanoid(5);

  type UnsavedWritingProject = Omit<
    WritingProject,
    "startDate" | "endDate" | "goalCount"
  > & {
    startDate?: Date;
    endDate?: Date;
    goalCount?: number;
  };

  const proj: UnsavedWritingProject = {
    id: newID,
    title: title,
    goalCount: goalCount,
    currentCount: startCount,
    startDate: startDate,
    createdOn: new Date(),
    edited: new Date(),
    endDate: endDate,
    // for the graph to start on the first day of the project,
    // an entry is created no matter if the start count is 0 or not
    entries: [{ newCount: startCount, date: startDate!, diff: startCount }],
    archived: false,
  };

  function emptyForm() {
    setTitle("");
    setGoalCount(undefined);
    setStartCount(0);
    setEndDate(undefined);
  }

  function DateErorrMessage() {
    if (startDate && endDate) {
      if (startDate > endDate) {
        return <div>The deadline cannot be before the start date</div>;
      }
    }
  }

  const [projects, saveProjects] = useLocalStorage<WritingProject[]>(
    "projects",
    [],
  );

  const saveDisabled =
    title.length === 0 ||
    goalCount === 0 ||
    goalCount === undefined ||
    endDate === undefined ||
    startDate === undefined ||
    endDate < startDate;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-gradient-tilted opacity-80 transition-opacity duration-300 hover:opacity-100"
        >
          New project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New project</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Project title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="wccurrent" className="text-right">
              Current word count
            </Label>
            <Input
              type="number"
              id="wccurrent"
              value={startCount}
              onChange={(e) => setStartCount(e.target.valueAsNumber)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="wcgoal" className="text-right">
              Word count goal
            </Label>
            <Input
              type="number"
              value={goalCount}
              onChange={(e) => setGoalCount(e.target.valueAsNumber)}
              id="wcgoal"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Start date</Label>
            <DatePicker date={startDate} setDate={setStartDate} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="endDate" className="text-right">
              Deadline
            </Label>
            <DatePicker date={endDate} setDate={setEndDate} disablePast />
          </div>
          <DateErorrMessage />
        </div>
        <DialogFooter className="flex">
          <DialogClose className="mx-auto" disabled={saveDisabled}>
            <Button
              disabled={saveDisabled}
              onClick={async () => {
                if (isSignedIn) {
                  const response = await saveProjectDB(proj as WritingProject);
                  if (response.status === 200) {
                    emptyForm();
                  }
                } else {
                  saveProjects([...projects, proj as WritingProject]);
                  emptyForm();
                }
              }}
            >
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
