"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getFacetedUniqueValues,
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
import { Badge } from "@/components/ui/badge";
import DeckToolbar from "./deck-toolbar";

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
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      pagination,
      columnFilters,
    },
  });

  return (
    <div>
      <div className="flex justify-between py-4">
        <div className="flex items-center gap-4">
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
          />
        </div>
        <DeckToolbar />
      </div>
      <div className="rounded-xl border p-4 mb-4 min-h-screen">
        {table.getRowModel().rows?.length ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {table.getRowModel().rows.map((row) => (
              <Card key={row.id}>
                <CardHeader>
                  <CardTitle>{row.getValue("name")}</CardTitle>
                  <CardDescription>
                    <Badge variant="secondary">{row.getValue("tag")}</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>{row.getValue("description")}</CardContent>
                <CardFooter className="flex justify-between">
                  <Button asChild variant="outline">
                    <Link href={`/decks/${row.getValue("id")}`}>View</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <div>No results.</div>
          </div>
        )}
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
