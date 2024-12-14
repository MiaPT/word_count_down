export declare type WritingProject = {
  id: string;
  title: string;
  goalCount: number;
  currentCount: number;
  createdOn?: Date; //TODO: make this mandatory
  startDate: Date;
  endDate: Date;
  edited: Date;
  url?: string;
  archived: boolean;
  entries: Entry[];
};

export declare type Entry = {
  newCount: number;
  diff: number;
  date: Date;
};
