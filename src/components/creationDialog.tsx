import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

export function CreationDialog() {
  const today = new Date()
  const todayStr = today.toISOString().slice(0,10)

  return (
    <Dialog>
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
              defaultValue="0"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="wcgoal" className="text-right">
              Word count goal
            </Label>
            <Input
              type="number"
              id="wcgoal"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="startDate" className="text-right">
              Start date
            </Label>
            <Input
              type="date"
              id="startDate"
              defaultValue={todayStr}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="endDate" className="text-right">
              Deadline
            </Label>
            <Input
              type="date"
              id="endDate"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
