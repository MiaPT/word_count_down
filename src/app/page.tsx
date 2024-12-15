"use client";

import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { CreationDialog } from "~/components/creationDialog";
import { ProjectCard } from "~/components/projectCard";
import { addExampleProject } from "~/lib/generateExample";
import { projectDeserializer } from "~/lib/manageProjectFunctions";
import { WritingProject } from "~/types";

export default function HomePage() {
  const [projects, setProjects] = useLocalStorage<WritingProject[]>(
    "projects",
    [],
    {
      deserializer: projectDeserializer,
    },
  );

  useEffect(() => {
    if (projects.length === 0) {
      const exampleProject = addExampleProject();
      setProjects([exampleProject]);
    }
  }, []);

  function addProject(project: WritingProject) {
    setProjects([...projects, project]);
  }

  function saveProject(project: WritingProject) {
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

  return (
    <main className="flex flex-col items-center">
      <div className="grid md:grid-cols-1 xl:grid-cols-2">
        {projects
          .filter((p) => p.archived === false)
          .map((p) => (
            <ProjectCard
              key={p.id}
              project={p}
              saveProject={saveProject}
              deleteProject={() => deleteProject(p.id)}
            />
          ))}
      </div>
      <CreationDialog addProject={addProject} />
    </main>
  );
}
