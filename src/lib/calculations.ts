import { WritingProject } from "~/types";

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

const getDaysArray = function (start: Date, end: Date) {
  const arr = [];
  for (
    const dt = new Date(start);
    dt <= new Date(end);
    dt.setDate(dt.getDate() + 1)
  ) {
    arr.push(new Date(dt));
  }
  return arr;
};

export function generateGraphPoints_SingleProject(project: WritingProject) {
  const concatenatedEntries: { written?: number } = {};

  const firstDate = project.entries[0]?.date;
  const lastDate = project.entries[project.entries.length - 1]?.date;

  const daylist = getDaysArray(firstDate!, lastDate!).map((v) =>
    v.toLocaleDateString(),
  );

  daylist.forEach((d) => {
    concatenatedEntries[d as keyof typeof concatenatedEntries] = 0;
  });

  project.entries.forEach((e) => {
    const date =
      e.date.toLocaleDateString() as keyof typeof concatenatedEntries;
    concatenatedEntries[date] = concatenatedEntries[date]! + e.diff;
  });

  const graphDataAllDates = [];
  const graphDataActiveDates = [];

  for (const [key, value] of Object.entries(concatenatedEntries)) {
    const data = { date: key, written: value };
    graphDataAllDates.push(data);
    if (data.written !== 0) {
      graphDataActiveDates.push(data);
    }
  }

  return [graphDataAllDates, graphDataActiveDates];
}
