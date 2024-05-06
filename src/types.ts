

export declare type WritingProject = {
    id: number,
    title: string,
    goalCount: number,
    currentCount: number,
    startDate: Date,
    endDate: Date,
    url?: string,
    entries?: Entry[]
}

export declare type Entry = {
    id: number,
    projectId: number,
    newTotal: number,
    diff: number,
    date: Date
}

