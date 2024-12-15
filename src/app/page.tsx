"use client";

import { useEffect } from "react";
import { CreationDialog } from "~/components/creationDialog";
import { ProjectCard } from "~/components/projectCard";
import { addExampleProject } from "~/lib/generateExample";
import { useProjects } from "~/lib/useProjects";

export default function HomePage() {
  const { projects, addProject, updateProject, deleteProject } = useProjects();

  useEffect(() => {
    if (projects.length === 0) {
      const exampleProject = addExampleProject();
      addProject(exampleProject);
    }
  }, []);

  return (
    <main className="flex flex-col items-center">
      <div className="grid md:grid-cols-1 xl:grid-cols-2">
        {projects
          .filter((p) => p.isArchived === false)
          .map((p) => (
            <ProjectCard
              key={p.id}
              project={p}
              saveProject={updateProject}
              deleteProject={() => deleteProject(p.id)}
            />
          ))}
      </div>
      <CreationDialog addProject={addProject} />
    </main>
  );
}
