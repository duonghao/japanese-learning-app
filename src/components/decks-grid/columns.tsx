"use client";

import { Deck, WithId } from "@/lib/firebase/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<WithId<Deck>>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "tag",
    header: "Tag",
    accessorFn: (row) => row.tag ?? "default",
  },
];
