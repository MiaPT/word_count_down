"use client";

import { useLocalStorage, useReadLocalStorage } from "usehooks-ts";
import { CreationDialog } from "~/components/creationDialog";
import { ProjectCard } from "~/components/projectCard";
import { WritingProject } from "~/types";

export default function HomePage() {
  const [projects, saveProjects] = useLocalStorage<WritingProject[]>(
    "projects",
    [],
    {
      deserializer: (v) =>
        (JSON.parse(v) as WritingProject[]).map((wp) => ({
          ...wp,
          endDate: new Date(wp.endDate),
          startDate: new Date(wp.startDate),
        })),
    },
  );

  return (
    <main className="flex flex-col items-center">
      <div
        className="justify-left flex w-4/5 flex-wrap"
        suppressHydrationWarning={true}
      >
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
      <CreationDialog />
    </main>
  );
}

// const dummyProjects: WritingProject[] = [
//   {
//     id: "1",
//     title: "The Next American Novel",
//     currentCount: 12000,
//     goalCount: 60000,
//     endDate: new Date("04 Dec 2024"),
//     startDate: new Date("04 Jan 2024"),
//     entries: [],
//   },
//   {
//     id: "2",
//     title: "Essay on beekeeping",
//     currentCount: 300,
//     goalCount: 2500,
//     endDate: new Date("07 May 2024"),
//     startDate: new Date("15 Apr 2024"),
//     entries: [],
//   },
//   {
//     id: "3",
//     title: "Analysis of Cats the Musical",
//     currentCount: 50,
//     goalCount: 4000,
//     endDate: new Date("10 Aug 2024"),
//     startDate: new Date("16 Feb 2024"),
//     entries: [],
//   },
// ];
