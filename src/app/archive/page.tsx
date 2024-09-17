"use client";

import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { ArchivedCard } from "~/components/archivedCard";
import { projectDeserializer } from "~/lib/manageProjectFunctions";
import { WritingProject } from "~/types";

export default function ArchivePage() {
  const [projects, setProjects] = useState<WritingProject[]>([]);

  useEffect(() => {
    const storedProjects = localStorage.getItem("projects");
    if (storedProjects) {
      setProjects(projectDeserializer(storedProjects));
    }
  }, []);

  return (
    <main className="flex flex-col items-center">
      <div
        className="grid md:grid-cols-1 xl:grid-cols-2"
      >
        {projects
          .filter((p) => p.archived === true)
          .map((p) => (
            <ArchivedCard
              key={p.id}
              project={p}
              projects={projects}
              saveProjects={setProjects}
            />
          ))}
      </div>
    </main>
  );
}
