import React, { useMemo, useState } from 'react'
import { ListView } from '@/components/refine-ui/views/list-view'
import { Breadcrumb } from '@/components/refine-ui/layout/breadcrumb'
import {
  SearchIcon,
  BookOpen,
  UserCircle2,
  Users,
  Hash,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { CreateButton } from '@/components/refine-ui/buttons/create'
import { useTable } from '@refinedev/react-table'
import type { ClassDetails } from '@/types'
import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { ShowButton } from '@/components/refine-ui/buttons/show'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const ClassesList = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const filters = searchQuery
    ? [{ field: 'name', operator: 'contains' as const, value: searchQuery }]
    : []

  const columns = useMemo<ColumnDef<ClassDetails>[]>(
    () => [
      {
        id: 'name',
        accessorKey: 'name',
        header: () => <p className="column-title">Name</p>,
      },
      {
        id: 'subject',
        accessorFn: (row) => row.subject?.name ?? '',
        header: () => <p className="column-title">Subject</p>,
      },
      {
        id: 'teacher',
        accessorFn: (row) => row.teacher?.name ?? '',
        header: () => <p className="column-title">Teacher</p>,
      },
      {
        id: 'capacity',
        accessorKey: 'capacity',
        header: () => <p className="column-title">Capacity</p>,
      },
      {
        id: 'status',
        accessorKey: 'status',
        header: () => <p className="column-title">Status</p>,
      },
      {
        id: 'details',
        header: () => <p className="column-title">Details</p>,
      },
      {
        id: 'banner',
        accessorKey: 'bannerUrl',
        header: () => <p className="column-title">Banner</p>,
        cell: ({ getValue }) => (
          getValue<string>() ? (
            <img
              src={getValue<string>()}
              alt="banner"
              className="w-20 h-12 object-cover rounded"
            />
          ) : (
            <span className="text-muted">—</span>
          )
        ),
      },
    ],
    []
  )

  const { reactTable, refineCore } = useTable<ClassDetails>({
    columns,
    refineCoreProps: {
      resource: 'classes',
      pagination: { pageSize: 10, mode: 'server' },
      filters: { permanent: filters },
      sorters: { initial: [{ field: 'id', order: 'desc' }] },
    },
  })

  const rows = reactTable.getRowModel().rows
  const pageIndex = reactTable.getState().pagination.pageIndex
  const pageCount = reactTable.getPageCount()

  return (
    <ListView>
      <Breadcrumb />
      <h1 className="page-title">Classes</h1>

      <div className="intro-row">
        <p>Manage classes and view their details.</p>

        <div className="actions-row">
          <div className="search-field relative">
            <SearchIcon className="search-icon absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full rounded-xl border-muted-foreground/20 bg-background/80 shadow-sm"
              placeholder="Search by name..."
            />
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <CreateButton />
          </div>
        </div>
      </div>

      {rows.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {rows.map((row) => {
            const item = row.original

            return (
              <Card
                key={item.id}
                className="group overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-background via-background to-muted/30 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <CardHeader className="space-y-4 pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <CardTitle className="truncate text-xl font-semibold tracking-tight">
                        {item.name}
                      </CardTitle>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Manage class details and overview
                      </p>
                    </div>

                    <Badge
                      variant={item.status === 'active' ? 'default' : 'secondary'}
                      className="capitalize rounded-full px-3 py-1"
                    >
                      {item.status}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="rounded-full border-dashed px-3 py-1 text-xs font-medium"
                    >
                      Invite: {item.inviteCode}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid gap-3">
                    <div className="flex items-center justify-between rounded-xl border bg-muted/30 px-4 py-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <BookOpen className="h-4 w-4" />
                        <span>Subject</span>
                      </div>
                      <span className="max-w-[55%] truncate text-right font-medium text-foreground">
                        {item.subject?.name ?? '—'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border bg-muted/30 px-4 py-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <UserCircle2 className="h-4 w-4" />
                        <span>Teacher</span>
                      </div>
                      <span className="max-w-[55%] truncate text-right font-medium text-foreground">
                        {item.teacher?.name ?? '—'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border bg-muted/30 px-4 py-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>Capacity</span>
                      </div>
                      <span className="font-semibold text-foreground">
                        {item.capacity ?? '—'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border bg-muted/30 px-4 py-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Hash className="h-4 w-4" />
                        <span>Class ID</span>
                      </div>
                      <span className="font-medium text-foreground">
                        {item.id}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <ShowButton
                      resource="classes"
                      recordItemId={item.id}
                      size="sm"
                      variant="outline"
                      className="w-full rounded-xl"
                    >
                      View Details
                    </ShowButton>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card className="rounded-2xl border border-dashed shadow-sm">
          <CardContent className="flex min-h-[240px] flex-col items-center justify-center text-center">
            <h3 className="text-lg font-semibold">No classes found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Try adjusting your search or create a new class.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="mt-6 flex flex-col gap-3 rounded-2xl border bg-background/80 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Page <span className="font-medium text-foreground">{pageIndex + 1}</span> of{' '}
          <span className="font-medium text-foreground">{pageCount || 1}</span>
        </p>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => reactTable.previousPage()}
            disabled={!reactTable.getCanPreviousPage()}
            className="rounded-xl"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Previous
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => reactTable.nextPage()}
            disabled={!reactTable.getCanNextPage()}
            className="rounded-xl"
          >
            Next
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </ListView>
  )
}

export default ClassesList