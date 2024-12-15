export declare type WritingProject = {
  id: string;
  title: string;
  goalCount: number;
  currentCount: number;
  createdOn: Date;
  startDate: Date;
  endDate: Date;
  lastModified: Date;
  url?: string;
  isArchived: boolean;
  entries: Entry[];
};

export declare type Entry = {
  newTotal: number;
  diff: number;
  date: Date;
};
