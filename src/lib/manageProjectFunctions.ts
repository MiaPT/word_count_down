"use client";

import { SetStateAction } from "react";
import { WritingProject } from "~/types";

export const projectDeserializer: (value: string) => WritingProject[] = (v) =>
  (JSON.parse(v) as WritingProject[]).map((wp) => ({
    ...wp,
    endDate: new Date(wp.endDate),
    startDate: new Date(wp.startDate),
    edited: new Date(wp.edited),
    createdOn: wp.createdOn ? new Date(wp.createdOn) : undefined,
    entries: wp.entries.map((e) => ({
      ...e,
      date: new Date(e.date),
    })),
  }));

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
  updatedProject.edited = new Date();
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
