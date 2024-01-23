import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { columnDefCampaigns } from "./columns";
import { Table } from "react-bootstrap";
import dataJSON from "../../public/api/campaigns.json";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchInput } from "./SearchInput";

export const CampaignsTable = () => {
  const router = useNavigate();
  const data = useMemo(() => dataJSON, []);
  const columns = useMemo(() => columnDefCampaigns, []);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    initialState: {
      pagination: {
        pageSize: 4,
      },
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <>
      <SearchInput value={filtering} onChange={setFiltering} />
      <Table striped bordered hover>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {{
                    asc: <span className="pl-2 text-primary">↑</span>,
                    desc: <span className="pl-2 text-danger">↓</span>,
                  }[header.column.getIsSorted() as string] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} onClick={() => router("/")}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex flex-row justify-content-center">
        <button
          className={`btn ${!table.getCanPreviousPage() ? "disabled" : "btn-light"} rounded p-1 mx-1`}
          onClick={() => table.setPageIndex(0)}
        >
          <span className="w-5 h-5">{"<<"}</span>
        </button>
        <button
          className={`${!table.getCanPreviousPage() ? "disabled" : "btn-light"} rounded p-1 mx-1`}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="w-5 h-5">{"<"}</span>
        </button>
        <span className="mx-1">
          <input
            min={1}
            max={table.getPageCount()}
            type="number"
            value={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="form-control mr-1"
          />
          <span className="badge badge-secondary">of {table.getPageCount()}</span>
        </span>
        <button
          className={`${!table.getCanNextPage() ? "btn-secondary" : "btn-light"} rounded p-1 mx-1`}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <span className="w-5 h-5">{">"}</span>
        </button>
        <button
          className={`${!table.getCanNextPage() ? "btn-secondary" : "btn-light"} rounded p-1 mx-1`}
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <span className="w-5 h-5">{">>"}</span>
        </button>
      </div>
    </>
  );
};
