"use client";

import { useLocalStorage } from "usehooks-ts";
import { WritingProject } from "~/types";

const projectDeserializer: (value: string) => WritingProject[] = (v) =>
  (JSON.parse(v) as WritingProject[]).map((wp) => ({
    ...wp,
    endDate: new Date(wp.endDate),
    startDate: new Date(wp.startDate),
    lastModified: new Date(wp.lastModified),
    createdOn: new Date(wp.createdOn),
    entries: wp.entries.map((e) => ({
      ...e,
      date: new Date(e.date),
    })),
  }));

export const useProjects = () => {
  const [projects, setProjects] = useLocalStorage<WritingProject[]>(
    "projects",
    [],
    {
      deserializer: projectDeserializer,
    },
  );
  function addProject(project: WritingProject) {
    setProjects([...projects, project]);
  }

  function updateProject(project: WritingProject) {
    setProjects(
      projects.map((p) => {
        if (p.id === project.id) {
          return project;
        }
        return p;
      }),
    );
  }

  function deleteProject(projectId: string) {
    setProjects(projects.filter((p) => p.id !== projectId));
  }

  return { projects, addProject, updateProject, deleteProject };
};
