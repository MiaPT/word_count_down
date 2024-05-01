

declare type Project = {
    id: number,
    title: string,
    goalCount: number,
    currentCount: number,
    startDate: Date,
    endDate: Date,
    url?: string,
    entries?: Entry[]
}

declare type Entry = {
    id: number,
    projectId: number,
    newTotal: number,
    diff: number,
    date: Date
}

