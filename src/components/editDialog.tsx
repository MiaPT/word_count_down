"use client";

import { WritingProject } from "~/types";
import { Button } from "./ui/button";
import { toast } from "sonner";
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
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useLocalStorage } from "usehooks-ts";
import { useState } from "react";
import { DatePicker } from "./datePicker";

interface EditDialogProps {
  project: WritingProject;
}

export function EditDialog({ project }: EditDialogProps) {
  const today = new Date();

  const [title, setTitle] = useState(project.title);
  const [goalCount, setGoalCount] = useState<number | undefined>(
    project.goalCount,
  );
  const [startDate, setStartDate] = useState<Date | undefined>(
    project.startDate,
  );
  const [endDate, setEndDate] = useState<Date | undefined>(project.endDate);

  function SaveChanges(archive = false) {
    const updatedProject = projects.find((p) => p.id === project.id)!;
    updatedProject.endDate = endDate!;
    updatedProject.goalCount = goalCount!;
    updatedProject.title = title;
    updatedProject.archived = archive;
    updatedProject.startDate = startDate!;
    saveProjects(projects);
  }

  function SetIsArchived(archived: boolean) {
    console.log(project.id);
    const updatedProject = projects.find((p) => p.id === project.id)!;
    updatedProject.archived = archived;
    saveProjects(projects);
  }

  function DeleteProject() {
    const p = projects.filter((p) => p.id !== project.id);
    saveProjects(p);
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
      <Tooltip>
        <TooltipTrigger>
          <DialogTrigger asChild>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>
            </button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Edit project</TooltipContent>
      </Tooltip>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit project</DialogTitle>
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
            <DatePicker date={endDate} setDate={setEndDate} />
          </div>
          <DateErorrMessage />
        </div>
        <DialogFooter>
          <div className="flox-col flex w-full justify-around">
            <DialogClose>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    onClick={() => {
                      if (
                        confirm("Do you really want to delete this project?")
                      ) {
                        DeleteProject();
                        toast("Project deleted");
                      }
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete project</p>
                </TooltipContent>
              </Tooltip>
            </DialogClose>
            <DialogClose>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    onClick={() => {
                      SetIsArchived(true);
                      toast("Project archived", {
                        action: {
                          label: "Undo",
                          onClick: () => SetIsArchived(false),
                        },
                      });
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                      />
                    </svg>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Archive project</p>
                </TooltipContent>
              </Tooltip>
            </DialogClose>
            <DialogClose disabled={saveDisabled}>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    disabled={saveDisabled}
                    onClick={() => {
                      SaveChanges();
                      toast("Changes saved!");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Save changes</p>
                </TooltipContent>
              </Tooltip>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
