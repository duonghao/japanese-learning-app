"use client";

import { WithId, Flashcard } from "@/lib/firebase/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<WithId<Flashcard>>[] = [
  {
    accessorKey: "word",
    header: "Word",
  },
  {
    accessorKey: "id",
    header: "ID",
  },
];
