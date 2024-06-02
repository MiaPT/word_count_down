import { WritingProject } from "~/types";

function areDatesEqual(d1: Date, d2: Date) {
  console.trace();
  console.log({ d1, d2 });
  const date1 = new Date(d1.getDate(), d1.getMonth(), d1.getFullYear());
  const date2 = new Date(d2.getDate(), d2.getMonth(), d2.getFullYear());

  return date1.getTime() === date2.getTime();
}

export function daysLeft(project: WritingProject) {
  return Math.ceil(
    (project.endDate.getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000),
  );
}

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
