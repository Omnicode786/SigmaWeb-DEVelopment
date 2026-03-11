import React, { useMemo, useState } from 'react'
import { ListView } from '@/components/refine-ui/views/list-view'
import { Breadcrumb } from '@/components/refine-ui/layout/breadcrumb'
import { SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { CreateButton } from '@/components/refine-ui/buttons/create'
import { DataTable } from '@/components/refine-ui/data-table/data-table'
import { useTable } from '@refinedev/react-table'
import type { ClassDetails } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { ShowButton } from '@/components/refine-ui/buttons/show'

const ClassesList = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const filters = searchQuery
    ? [{ field: 'name', operator: 'contains' as const, value: searchQuery }]
    : []

  const columns = useMemo<ColumnDef<ClassDetails>[]>(
    () => [
      {
        id: 'inviteCode',
        accessorKey: 'inviteCode',
        header: () => <p className="column-title">Invite</p>,
        cell: ({ getValue }) => <Badge>{getValue<string>()}</Badge>,
      },
      {
        id: 'name',
        accessorKey: 'name',
        header: () => <p className="column-title">Name</p>,
        cell: ({ getValue }) => <span className="text-foreground">{getValue<string>()}</span>,
      },
      {
        id: 'subject',
        accessorFn: (row) => row.subject?.name ?? '',
        header: () => <p className="column-title">Subject</p>,
        cell: ({ getValue }) => <span>{getValue<string>()}</span>,
      },
      {
        id: 'teacher',
        accessorFn: (row) => row.teacher?.name ?? '',
        header: () => <p className="column-title">Teacher</p>,
        cell: ({ getValue }) => <span>{getValue<string>()}</span>,
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
        cell: ({ getValue }) => (
          <Badge variant={getValue<string>() === 'active' ? 'default' : 'secondary'}>
            {getValue<string>()}
          </Badge>
        ),
      },
      {
        id: 'details',
        header: () => <p className="column-title">Details</p>,
        cell: ({ row }) => (
          <ShowButton resource="classes" recordItemId={row.original.id} size="sm" variant="outline">
            View
          </ShowButton>
        ),
      },
    ],
    []
  )

  const table = useTable<ClassDetails>({
    columns,
    refineCoreProps: {
      resource: 'classes',
      pagination: { pageSize: 10, mode: 'server' },
      filters: { permanent: filters },
      sorters: { initial: [{ field: 'id', order: 'desc' }] },
    },
  })

  return (
    <ListView>
      <Breadcrumb />
      <h1 className="page-title">Classes</h1>

      <div className="intro-row">
        <p>Manage classes and view their details.</p>
        <div className="actions-row">
          <div className="search-field">
            <SearchIcon className="search-icon" />
            <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 w-full" placeholder="Search by name..." />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <CreateButton />
          </div>
        </div>
      </div>

      <DataTable table={table} />
    </ListView>
  )
}

export default ClassesList