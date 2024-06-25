import { Entry, GraphDataEntry, WritingProject } from "~/types";

function areDatesEqual(d1: Date, d2: Date) {
  const date1 = new Date(d1.getDate(), d1.getMonth(), d1.getFullYear());
  const date2 = new Date(d2.getDate(), d2.getMonth(), d2.getFullYear());

  return date1.getTime() === date2.getTime();
}

export function daysLeft(project: WritingProject) {
  return Math.ceil(
    (project.endDate.getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000),
  );
}

//TODO: finish this maybe

// export function generateEntries(startCount: number, startDate: Date): Entry[]{
//   //if startdate is before today and startcount is more than 0
//   //create an entry for each day from startdate until today
//   //ensure that the daily entries are whole numbers, but also that it sums perfectly to the startcount
//   //maybe use modulo for this, with the last date getting the rest
//   //figure out if this should only happen with word counts over a certain number
//   //seems unnecessary if the word count is like 50
//   if (!areDatesEqual(startDate, new Date()) && startCount > 0){

//   }

//   return [{newCount: startCount, date: startDate, diff: startCount}]
// }

export function wordsRemainingToday(project: WritingProject) {
  const today = new Date();
  const remainingTotal = Math.max(project.goalCount - project.currentCount, 0);
  const days = daysLeft(project);

  if (days <= 0 || remainingTotal == 0) {
    return remainingTotal;
  }

  if (!areDatesEqual(project.edited, today)) {
    const remaining = Math.round(remainingTotal / daysLeft(project));
    return Math.max(remaining, 0);
  }

  const writtenToday = project.entries
    .filter((e) => areDatesEqual(e.date, today))
    .map((e) => e.diff)
    .reduce((total, current) => total + current, 0);
  return Math.max(
    Math.round((remainingTotal + writtenToday) / daysLeft(project)) -
      writtenToday,
    0,
  );
}

function concatenateEntries(entries: Entry[]) {
  const totalDiff = entries.map((e) => e.diff).reduce((a, b) => a + b, 0);
  return { x: entries[0]!.date.toLocaleDateString(), y: totalDiff };
}

function entriesToGraphPoints(entries: Entry[]) {
  const uniqueDates = Array.from(
    new Set(entries.map((e) => e.date.toLocaleDateString())),
  );
  const datalist: { x: string; y: number }[] = [];
  uniqueDates.forEach((d) =>
    datalist.push(
      concatenateEntries(
        entries.filter((e) => e.date.toLocaleDateString() === d),
      ),
    ),
  );
  return datalist;
}

export function projectsToGraphData(
  projects: WritingProject[],
): GraphDataEntry[] {
  return projects.map((p) => ({
    id: p.title,
    color: `hsl(${Math.floor(Math.random() * 359)}, 70%, 50%)`,
    data: entriesToGraphPoints(p.entries),
  }));
}
