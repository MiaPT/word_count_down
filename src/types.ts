

export declare type WritingProject = {
    title: string,
    goalCount: number,
    currentCount: number,
    startDate: Date,
    endDate: Date,
    url?: string,
    entries: Entry[]
}

export declare type Entry = {
    projectId: number,
    newTotal: number,
    diff: number,
    date: Date
}

