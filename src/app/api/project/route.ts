import { db } from "~/server/db";
import { entries, writingProjects } from "~/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { type WritingProject } from "~/types";

export async function POST(req: Request, res: Response) {
  const { userId } = auth();
  if (!userId) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const bodyData: WritingProject = (await req.json()) as WritingProject;
    await db
      .insert(writingProjects)
      .values({
        id: bodyData.id,
        title: bodyData.title,
        userId: userId,
        goalCount: bodyData.goalCount,
        currentCount: bodyData.currentCount,
        startDate: new Date(bodyData.startDate),
        endDate: new Date(bodyData.endDate),
        edited: new Date(bodyData.edited),
        createdOn: new Date(bodyData.createdOn),
        archived: false,
      })
      .then(() => {
        // create one entry for the start date, no matter if startcount is 0
        // this is for the graph to start at the start date
        return db.insert(entries).values({
          projectId: bodyData.id,
          date: new Date(bodyData.startDate),
          newCount: bodyData.currentCount,
          diff: bodyData.currentCount,
        });
      });
    return Response.json(
      { message: "Project added successfully" },
      { status: 200 },
    );
  } catch (error) {
    return Response.json({ message: "Failed to add project" }, { status: 500 });
  }
}
