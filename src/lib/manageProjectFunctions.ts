"use client";

import { SetStateAction } from "react";
import { WritingProject } from "~/types";

export function SaveChanges(
  projectId: string,
  endDate: Date,
  goalCount: number,
  title: string,
  startDate: Date,
  projects: WritingProject[],
  saveProjects: (value: SetStateAction<WritingProject[]>) => void,
) {
  const updatedProject = projects.find((p) => p.id === projectId)!;
  updatedProject.endDate = endDate;
  updatedProject.goalCount = goalCount;
  updatedProject.title = title;
  updatedProject.startDate = startDate!;
  saveProjects(projects);
}

export function SetIsArchived(
  archived: boolean,
  projectId: string,
  projects: WritingProject[],
  saveProjects: (value: SetStateAction<WritingProject[]>) => void,
) {
  const updatedProject = projects.find((p) => p.id === projectId)!;
  updatedProject.archived = archived;
  saveProjects(projects);
}

export function DeleteProject(
  projectId: string,
  projects: WritingProject[],
  saveProjects: (value: SetStateAction<WritingProject[]>) => void,
) {
  const p = projects.filter((p) => p.id !== projectId);
  saveProjects(p);
}
