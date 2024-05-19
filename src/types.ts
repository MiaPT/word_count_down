export declare type WritingProject = {
  id: string;
  title: string;
  goalCount: number;
  currentCount: number;
  startDate: Date;
  endDate: Date;
  url?: string;
  entries: Entry[];
};

export declare type Entry = {
  newCount: number;
  diff: number;
  date: Date;
};
