import * as React from "react"
 
import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { WritingProject } from "~/types"
import Link from "next/link"

export interface ProjectCardProps{
  project: WritingProject,
}


export function ProjectCard({project}: ProjectCardProps){
    const daysLeft = Math.round(
      (project.endDate.getTime() - new Date().getTime())
      / (24 * 60 * 60 * 1000))

    const wordsLeftTotal = project.goalCount - project.currentCount

    const wordsToday = daysLeft > 0 ? Math.round(wordsLeftTotal/daysLeft) : wordsLeftTotal
    

    return(
      <Card className="w-[500px] m-5">
      <CardHeader>
        <div className="flex justify-between">
        <CardTitle>{project.title}</CardTitle>
          {/* <Link href={`/projects/${project.id}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
          </Link> */}
        </div>
        <CardDescription>Current word count: {project.currentCount} | Goal count: {project.goalCount} | {daysLeft} days left </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          Words remaining today: {wordsToday}
        </div>
      </CardContent>
      <CardFooter >
        <form action="">
          <div className="flex">
            <Label htmlFor="newWordCount" className="mr-5">Enter new word count:</Label >
            <Input id="newWordCount" type="number" className="w-1/5 mr-1"/>
            <Button>Update</Button>
          </div>
        </form>
      </CardFooter>
    </Card>
    )
}