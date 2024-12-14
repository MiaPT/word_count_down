import { WritingProject, Entry } from "~/types"
import dayjs from "dayjs"


function zeroDiff(): boolean {
    return Math.random() > 0.2;
}


function generateEntries(): Entry[] {
    const entries: Entry[] = [];
    const numberOfEntries = Math.floor(Math.random() * 20) + 5;
    var newCount = 0

    for (let i = numberOfEntries; i >= 0; i--) {
        var diff = Math.floor(Math.random() * 1000) * Number(zeroDiff());
        entries.push({
            newCount: newCount + diff,
            diff: diff,
            date: dayjs().subtract(i, 'day').toDate(),
        });
    }
    return entries;
}

export function addExampleProject(): WritingProject {
    const entries = generateEntries();
    const startDate = dayjs().subtract(entries.length, 'day').toDate();
    const endDate = dayjs().add(12, 'day').toDate();
    const totalCount = entries.reduce((acc, entry) => acc + entry.newCount, 0);
    const goalCount = totalCount + 10000;
    const currentCount = totalCount;
    

    const project: WritingProject = {
        id: "1test",
        title: "Example Project:)",
        entries: entries,
        goalCount: goalCount,
        currentCount: currentCount,
        startDate: startDate,
        endDate: endDate,
        edited: new Date(),
        archived: false,
    };
    
    return project;
}



