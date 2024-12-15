"use client";

import { useLocalStorage } from "usehooks-ts";
import { ArchivedCard } from "~/components/archivedCard";
import { projectDeserializer } from "~/lib/manageProjectFunctions";
import { WritingProject } from "~/types";

export default function ArchivePage() {
  const [projects, setProjects] = useLocalStorage<WritingProject[]>(
    "projects",
    [],
    {
      deserializer: projectDeserializer,
    },
  );

  const saveProject = (project: WritingProject) => {
    setProjects(
      projects.map((p) => {
        if (p.id === project.id) {
          return project;
        }
        return p;
      }),
    );
  };

  const deleteProject = (projectId: string) => {
    setProjects(projects.filter((p) => p.id !== projectId));
  };

  return (
    <main className="flex flex-col items-center">
      <div className="grid md:grid-cols-1 xl:grid-cols-2">
        {projects
          .filter((p) => p.isArchived === true)
          .map((p) => (
            <ArchivedCard
              key={p.id}
              project={p}
              saveProject={saveProject}
              deleteProject={() => deleteProject(p.id)}
            />
          ))}
      </div>
    </main>
  );
}
