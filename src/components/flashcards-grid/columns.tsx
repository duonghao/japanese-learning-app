"use client";

import { WithId, Flashcard } from "@/lib/firebase/types";
import { ColumnDef } from "@tanstack/react-table";
import { State } from "ts-fsrs";

export const columns: ColumnDef<WithId<Flashcard>>[] = [
  {
    accessorKey: "word",
    header: "Word",
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "state",
    header: "State",
    accessorFn: (row) => State[row.state],
  },
];
