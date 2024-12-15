"use client";

import { SetStateAction } from "react";
import { WritingProject } from "~/types";

export const projectDeserializer: (value: string) => WritingProject[] = (v) =>
  (JSON.parse(v) as WritingProject[]).map((wp) => ({
    ...wp,
    endDate: new Date(wp.endDate),
    startDate: new Date(wp.startDate),
    lastModified: new Date(wp.lastModified),
    createdOn: new Date(wp.createdOn),
    entries: wp.entries.map((e) => ({
      ...e,
      date: new Date(e.date),
    })),
  }));
