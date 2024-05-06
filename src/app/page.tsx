import Link from "next/link";
import { ProjectCard } from "~/components/projectCard";
import { Card } from "~/components/ui/card";
import { WritingProject } from "~/types";

export default function HomePage() {

  const dummyProjects: WritingProject[] = [
    {
      id: 1,
      title: "The Next American Novel",
      currentCount: 12000,
      goalCount: 60000,
      endDate: new Date('04 Dec 2024'),
      startDate: new Date('04 Jan 2024'),
    },
    {
      id: 2,
      title: "Essay on beekeeping",
      currentCount: 300,
      goalCount: 2500,
      endDate: new Date('07 May 2024'),
      startDate: new Date('15 Apr 2024'),
    },
    {
      id: 3,
      title: "Analysis of Cats the Musical",
      currentCount: 50,
      goalCount: 4000,
      endDate: new Date('10 Aug 2024'),
      startDate: new Date('16 Feb 2024'),
    },
  ]

  return (
    <main className="flex flex-col items-center">
      <div className="flex flex-wrap justify-left w-4/5">
      {dummyProjects.map((p) => (
        <ProjectCard project={p} ></ProjectCard>
      ))}

      </div>
    </main>
  );
}
