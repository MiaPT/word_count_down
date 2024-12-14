"use client";

import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { CreationDialog } from "~/components/creationDialog";
import { ProjectCard } from "~/components/projectCard";
import { addExampleProject } from "~/lib/generateExample";
import { projectDeserializer } from "~/lib/manageProjectFunctions";
import { Entry, WritingProject } from "~/types";

export default function HomePage() {

  const [projects, setProjects] = useLocalStorage<WritingProject[]>(
    "projects",
    [],
    {
      deserializer: projectDeserializer,
    }
  );


  useEffect(() => {
    if (projects.length === 0) {
      const exampleProject = addExampleProject();
      setProjects([exampleProject]);
    }
  }, []);

  // TODO: why did I put this function here? move? does it need to be here?
  function addEntry(projectId: string, entry: Entry) {
    const project = structuredClone(projects.find((p) => p.id === projectId)!);
    project.entries.push(entry);
    project.currentCount = entry.newCount;
    project.edited = new Date();
    setProjects(projects);
  }

  return (
    <main className="flex flex-col items-center">
      <div className="grid md:grid-cols-1 xl:grid-cols-2">
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
