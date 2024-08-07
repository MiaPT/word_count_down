"use client";

import { useLocalStorage } from "usehooks-ts";
import { ArchivedCard } from "~/components/archivedCard";
import { projectDeserializer } from "~/lib/manageProjectFunctions";
import { WritingProject } from "~/types";

export default function ArchivePage() {
  const [projects, saveProjects] = useLocalStorage<WritingProject[]>(
    "projects",
    [],
    {
      deserializer: projectDeserializer,
    },
  );

  return (
    <main className="flex flex-col items-center">
      <div
        className="grid md:grid-cols-1 xl:grid-cols-2"
        suppressHydrationWarning={true}
      >
        {projects
          .filter((p) => p.archived === true)
          .map((p) => (
            <ArchivedCard
              key={p.id}
              project={p}
              projects={projects}
              saveProjects={saveProjects}
            />
          ))}
      </div>
    </main>
  );
}
