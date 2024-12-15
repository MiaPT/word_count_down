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
import { WritingProject } from "~/types";
import Link from "next/link";
import { ArrowRightIcon, TrashIcon, UnarchiveIcon } from "./ui/SVGIcons";
import { TooltipContent, TooltipTrigger, Tooltip } from "./ui/tooltip";
import { toast } from "sonner";

export interface ArchivedCardProps {
  project: WritingProject;
  saveProject: (project: WritingProject) => void;
  deleteProject: () => void;
}

export function ArchivedCard({
  project,
  saveProject,
  deleteProject,
}: ArchivedCardProps) {
  const wordsLeftTotal = project.goalCount - project.currentCount;

  return (
    <Card className="group m-5 w-[350px] sm:w-[500px]">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>{project.title}</CardTitle>
          <div className="flex flex-row">
            <Link href={`/projects/${project.id}`}>
              <div className="transition-transform duration-500 hover:translate-x-1">
                <ArrowRightIcon />
              </div>
            </Link>
          </div>
        </div>
        <CardDescription>
          Archived on: {project.lastModified.toDateString()} | Completed:{" "}
          {wordsLeftTotal > 0 ? `No - ${wordsLeftTotal} words missing` : "Yes"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>Created on: {project.createdOn?.toDateString()}</div>
        <div>Start date: {project.startDate.toDateString()}</div>
        <div>Deadline: {project.endDate.toDateString()}</div>
        <div>Word count goal: {project.goalCount}</div>
        <div>Final word count: {project.currentCount}</div>
      </CardContent>
      <CardFooter>
        <div className="mr-4">
          <Tooltip>
            <TooltipTrigger>
              <Button
                onClick={() => {
                  if (confirm("Do you really want to delete this project?")) {
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
        </div>
        <Tooltip>
          <TooltipTrigger>
            <Button
              onClick={() => {
                saveProject({
                  ...project,
                  isArchived: false,
                });
                toast("Project un-archived", {
                  action: {
                    label: "Undo",
                    onClick: () =>
                      saveProject({
                        ...project,
                        isArchived: true,
                      }),
                  },
                });
              }}
            >
              <UnarchiveIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Un-archive project</p>
          </TooltipContent>
        </Tooltip>
      </CardFooter>
    </Card>
  );
}
