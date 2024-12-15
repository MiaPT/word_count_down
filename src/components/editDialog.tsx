"use client";

import { WritingProject } from "~/types";
import { Button } from "./ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import { DatePicker } from "./datePicker";

import {
  ArchiveIcon,
  CheckmarkIcon,
  PencilIcon,
  TrashIcon,
} from "./ui/SVGIcons";

interface EditDialogProps {
  project: WritingProject;
  saveProject: (project: WritingProject) => void;
  deleteProject: () => void;
}

export function EditDialog({
  project,
  saveProject,
  deleteProject,
}: EditDialogProps) {
  const [title, setTitle] = useState(project.title);
  const [goalCount, setGoalCount] = useState<number | undefined>(
    project.goalCount,
  );
  const [startDate, setStartDate] = useState<Date | undefined>(
    project.startDate,
  );
  const [endDate, setEndDate] = useState<Date | undefined>(project.endDate);

  function DateErorrMessage() {
    if (startDate && endDate) {
      if (startDate > endDate) {
        return <div>The deadline cannot be before the start date</div>;
      }
    }
  }

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
              <PencilIcon />
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
                        deleteProject();
                        toast("Project deleted");
                      }
                    }}
                  >
                    <TrashIcon />
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
                      saveProject({
                        ...project,
                        isArchived: true,
                      });
                      toast("Project archived", {
                        action: {
                          label: "Undo",
                          onClick: () =>
                            saveProject({
                              ...project,
                              isArchived: false,
                            }),
                        },
                      });
                    }}
                  >
                    <ArchiveIcon />
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
                      saveProject({
                        ...project,
                        title: title,
                        goalCount: goalCount!,
                        startDate: startDate!,
                        endDate: endDate!,
                      });
                      toast("Changes saved!");
                    }}
                  >
                    <CheckmarkIcon className="size-6 stroke-2" />
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
