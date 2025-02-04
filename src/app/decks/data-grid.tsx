"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface DataGridProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataGrid<TData, TValue>({
  columns,
  data,
}: DataGridProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border grid grid-flow-col gap-4 grid-cols-5 p-4">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <Card className="w-[250px]" key={row.id}>
              <CardHeader>
                <CardTitle>{row.getValue("name")}</CardTitle>
                <CardDescription>{row.getValue("description")}</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between">
                <Button variant="destructive">Delete</Button>
                <Button asChild>
                  <Link href={`/decks/${row.getValue("id")}`}>View</Link>
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="h-24 text-center">No results.</div>
        )}
      </div>
    </div>
  );
}
