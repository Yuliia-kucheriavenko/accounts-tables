import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { columnDef } from "./columns";
import { Table, Button, ButtonGroup } from "react-bootstrap";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchInput } from "./SearchInput";
import { getUsers } from "../services/user";
import { Loader } from "./Loader";
import { User } from "../types/User";

export const BasicTable = () => {
  const [data, setUsers] = useState<User[]>([]);
  const columns = useMemo(() => columnDef, []);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState("");
  const router = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      getUsers()
        .then((dataJSON) => {
          setUsers(dataJSON);
        })
        .finally(() => setLoading(false));
    }, 1000);
  }, []);

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
        pageSize: 8,
      },
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <>
      {loading && <Loader />}
      {!loading && data.length > 0 && (
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
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} onClick={() => router("/profilesTable")}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
          <ButtonGroup aria-label="Basic example">
            <Button variant="secondary" onClick={() => table.setPageIndex(0)}>
              First page
            </Button>
            <Button variant="secondary" disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>
              Next page
            </Button>
            <Button variant="secondary" disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>
              Previous page
            </Button>
            <Button variant="secondary" onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
              Last page
            </Button>
          </ButtonGroup>
          <p>You are on page number: {table.getState().pagination.pageIndex + 1}</p>
          <p>Total pages: {table.getPageCount()}</p>
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => table.setPageIndex(Number(e.target.value) - 1)}
          />
          <div className="">
            <div className="">
              <span className="">Current page size:</span>
              <select
                className=""
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
                disabled={!table.getCanNextPage()}
              >
                {[4, 6, 8, 10].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </>
      )}
    </>
  );
};
