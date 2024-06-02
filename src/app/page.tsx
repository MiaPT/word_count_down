"use client";

import { useLocalStorage } from "usehooks-ts";
import { CreationDialog } from "~/components/creationDialog";
import { ProjectCard } from "~/components/projectCard";
import { projectDeserializer } from "~/lib/manageProjectFunctions";
import { Entry, WritingProject } from "~/types";

export default function HomePage() {
  const [projects, saveProjects] = useLocalStorage<WritingProject[]>(
    "projects",
    [],
    {
      deserializer: projectDeserializer,
    },
  );

  function addEntry(projectId: string, entry: Entry) {
    // Maybe use deepcopy later
    const project = projects.find((p) => p.id === projectId)!;
    project?.entries.push(entry);
    project.currentCount = entry.newCount;
    project.edited = new Date();
    saveProjects(projects);
  }

  return (
    <main className="flex flex-col items-center">
      <div
        className="grid md:grid-cols-1 xl:grid-cols-2"
        suppressHydrationWarning={true}
      >
        {projects
          .filter((p) => p.archived === false)
          .map((p) => (
            <ProjectCard
              key={p.id}
              project={p}
              addEntry={(entry) => addEntry(p.id, entry)}
            />
          ))}
      </div>
      <CreationDialog />
    </main>
  );
}
