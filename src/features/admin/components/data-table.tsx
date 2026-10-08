"use client";

import type { ReactNode } from "react";

import type { ColumnDef, Identifiable } from "@/features/admin/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type DataTableProps<T extends Identifiable> = {
  columns: ColumnDef<T>[];
  data: T[];
  emptyMessage?: string;
  rowActions?: (row: T) => ReactNode;
};

export function DataTable<T extends Identifiable>({
  columns,
  data,
  emptyMessage = "No items yet.",
  rowActions,
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-border bg-muted/20 px-6 py-16 text-center text-sm text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-md border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            {columns.map((column) => (
              <TableHead
                key={column.id}
                className={cn(
                  "h-11 bg-muted/30 text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase",
                  column.className
                )}
              >
                {column.header}
              </TableHead>
            ))}
            {rowActions ? (
              <TableHead className="h-11 w-[1%] bg-muted/30 text-right text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                Actions
              </TableHead>
            ) : null}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              className="border-border hover:bg-muted/25"
            >
              {columns.map((column) => (
                <TableCell key={column.id} className={cn("py-3.5", column.className)}>
                  {column.cell(row)}
                </TableCell>
              ))}
              {rowActions ? (
                <TableCell className="py-3.5 text-right whitespace-nowrap">
                  {rowActions(row)}
                </TableCell>
              ) : null}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
