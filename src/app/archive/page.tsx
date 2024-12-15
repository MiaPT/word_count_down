"use client";

import { ArchivedCard } from "~/components/archivedCard";
import { useProjects } from "~/lib/useProjects";

export default function ArchivePage() {
  const { projects, updateProject, deleteProject } = useProjects();

  return (
    <main className="flex flex-col items-center">
      <div className="grid md:grid-cols-1 xl:grid-cols-2">
        {projects
          .filter((p) => p.isArchived === true)
          .map((p) => (
            <ArchivedCard
              key={p.id}
              project={p}
              saveProject={updateProject}
              deleteProject={() => deleteProject(p.id)}
            />
          ))}
      </div>
    </main>
  );
}
