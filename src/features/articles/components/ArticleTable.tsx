import { useState } from 'react'
import {
  ColumnDef,
  FilterFn,
  OnChangeFn,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'

interface Pagination {
  total: number // Total number of items.
  page: number // Current page number.
  limit: number // Number of items per page.
  totalPages: number // Total number of pages.
  hasNextPage: boolean // Indicates if there is a next page.
  hasPreviousPage: boolean // Indicates if there is a previous page.
}

interface ArticleTableProps<T> {
  data: T[] // Data to be displayed in the table.
  columns: ColumnDef<T>[] // Column definitions for the table.
  pagination: Pagination // Pagination information.
  onPageChange: (page: number, limit: number) => void // Function to handle page changes.
}

const ArticleTable = <T,>({ data, columns, pagination, onPageChange }: ArticleTableProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const limit = parseInt(searchParams.get('limit') || '4', 10)

  // Custom global filter function.
  const customGlobalFilter: FilterFn<any> = (row, filterValue) => {
    return Object.values(row.original).some((value) =>
      String(value).toLowerCase().includes(String(filterValue).toLowerCase()),
    )
  }

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    globalFilterFn: customGlobalFilter,
    onGlobalFilterChange: setGlobalFilter as OnChangeFn<string>,
    state: {
      sorting,
      globalFilter,
      rowSelection,
    },
  })

  // Handles moving to the previous page.
  const handlePreviousPage = () => {
    if (pagination.hasPreviousPage) {
      onPageChange(pagination.page - 1, limit)
    }
  }

  // Handles moving to the next page.
  const handleNextPage = () => {
    if (pagination.hasNextPage) {
      onPageChange(pagination.page + 1, limit)
    }
  }

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Search all columns..."
          value={globalFilter}
          onChange={(e) => table.setGlobalFilter(String(e.target.value))}
          className="max-w-md"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow className="hover:bg-gray-100 cursor-pointer" key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="relative">
                      <span className="block">{flexRender(cell.column.columnDef.cell, cell.getContext())}</span>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center lg:text-[1.4rem] text-[1.2rem]">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          Page {pagination.page} of {pagination.totalPages}
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={handlePreviousPage} disabled={!pagination.hasPreviousPage}>
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={handleNextPage} disabled={!pagination.hasNextPage}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ArticleTable
