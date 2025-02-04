"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { tags } from "./data";
import { Badge } from "@/components/ui/badge";

interface DataGridProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataGrid<TData, TValue>({
  columns,
  data,
}: DataGridProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 15, //default page size
  });
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
      columnFilters,
    },
  });

  return (
    <div>
      <div className="flex items-center py-4 gap-4">
        <Input
          placeholder="Filter by name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DataTableFacetedFilter
          column={table.getColumn("tag")}
          title={"Tags"}
          options={tags}
        />
      </div>
      <div className="rounded-md border grid grid-flow-row gap-4 grid-cols-5 p-4 mb-4">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <Card className="w-[250px]" key={row.id}>
              <CardHeader>
                <CardTitle>{row.getValue("name")}</CardTitle>
                <CardDescription>
                  <Badge variant="outline">{row.getValue("tag")}</Badge>
                </CardDescription>
              </CardHeader>
              <CardContent>{row.getValue("description")}</CardContent>
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
      <DataTablePagination table={table} />
    </div>
  );
}
