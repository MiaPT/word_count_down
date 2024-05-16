"use client"

import { WritingProject } from "~/types"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { nanoid } from 'nanoid'
import { useLocalStorage } from 'usehooks-ts'
import { useState } from "react"
import { DatePicker } from "./datePicker"


export function CreationDialog() {
  const today = new Date()
  
  const [title, setTitle] = useState("")
  const [goalCount, setGoalCount] = useState<number | undefined>()
  const [startCount, setStartCount] = useState(0)
  const [startDate, setStartDate] = useState<Date | undefined>(today)
  const [endDate, setEndDate] = useState<Date | undefined>()
  const newID = nanoid(8)

  type UnsavedWritingProject = Omit<WritingProject, "startDate" | "endDate" | "goalCount"> & {
    startDate?: Date;
    endDate?: Date;
    goalCount?: number
  }



  var proj: UnsavedWritingProject = {
    title : title,
    goalCount : goalCount,
    currentCount : startCount,
    startDate: startDate,
    endDate: endDate,
    entries: [],
  }

  function emptyForm(){
    setTitle("")
    setGoalCount(undefined)
    setStartCount(0)
    setEndDate(undefined)
  }

  function DateErorrMessage(){
    if (startDate && endDate){
      if (startDate > endDate){
        return(<div>The deadline cannot be before the start date</div>)
      }
    }
  }

  const [project, setProject] = useLocalStorage<UnsavedWritingProject | null>(newID, null)

  const saveDisabled = title.length==0 || goalCount==0 || endDate==undefined || startDate==undefined || endDate < startDate

  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button variant="outline">New project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New project</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Project title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="wccurrent" className="text-right">
              Current word count
            </Label>
            <Input
              type="number"
              id="wccurrent"
              value={startCount}
              onChange={(e) => setStartCount(e.target.valueAsNumber)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="wcgoal" className="text-right">
              Word count goal
            </Label>
            <Input
              type="number"
              value={goalCount}
              onChange={(e) => setGoalCount(e.target.valueAsNumber)}
              id="wcgoal"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">
              Start date
            </Label>
            <DatePicker date={startDate} setDate={setStartDate}/>

          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="endDate" className="text-right">
              Deadline
            </Label>
            <DatePicker date={endDate} setDate={setEndDate} disablePast/>
          </div>
            <DateErorrMessage/>
        </div>
        <DialogFooter>
          <DialogClose disabled={saveDisabled}>
          <Button
            disabled={saveDisabled} 
            onClick={() => {
              setProject(proj)
              emptyForm()
            }}
          >Save</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

