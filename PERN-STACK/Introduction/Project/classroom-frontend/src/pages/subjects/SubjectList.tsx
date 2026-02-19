import { ListView } from '@/components/refine-ui/views/list-view'
import React, { useMemo, useState } from 'react'
import { Breadcrumb } from '@/components/refine-ui/layout/breadcrumb';
import {SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {  Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { DEPARTMENTS_OPTIONS } from '@/constants';
import { CreateButton } from '@/components/refine-ui/buttons/create';
import { DataTable } from '@/components/refine-ui/data-table/data-table';
import { useTable } from "@refinedev/react-table";
import type { Subject } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from "@/components/ui/badge";

const SubjectList = () => {
  const [searchQuery, setsearchQuery] = useState('');
  const [selectedDepartment, setselectedDepartment] = useState('all')
  const departmentFilters = selectedDepartment == 'all' ? [] : [
    {field: 'department', operator: 'eq' as const, value: selectedDepartment}
  ];
  const searchFilters = searchQuery ? [
    {field : 'name', operator: 'contains' as const, value: searchQuery} 
  ]: [];

// the subject table

// this allows us to usse the table with pagination fetch sort filters and states and thendisplay that data on the table tanstack table react package


const subjectTable = useTable<Subject>({
  columns: useMemo<ColumnDef<Subject>[]>(() => [
    {
      // these are simply everycsingle columns
      id: "code",
      accessorKey: "code",
      size: 100,
      header: () => <p className="column-title ml-2">Code</p>,
      cell: ({ getValue }) => (
        <Badge>{getValue<string>()}</Badge>
      ),
    },
    {
        id: "name",
      accessorKey: "name",
      size: 200,
      header: () => <p className="column-title ml-2">Name</p>,
      cell: ({ getValue }) => (
        <span className='text-foreground'>{getValue<string>()}</span>
      ),
      // enables text based filtering
      filterFn: 'includesString'
    },
      {
        id: "department",
      accessorKey: "department",
      size: 150,
      header: () => <p className="column-title ml-2">Department</p>,
      cell: ({ getValue }) => (
        <Badge variant="secondary">{getValue<string>()}</Badge>
      ),
    },
   {
        id: "description",
      accessorKey: "description",
      size: 300,
      header: () => <p className="column-title ml-2">Description</p>,
      cell: ({ getValue }) => (
        <span className='text-foreground truncate line-clamp-2'>{getValue<string>()}</span>
      ),
    },
  ], []),
  refineCoreProps: {
    resource: "subjects",
    pagination: { pageSize: 10, mode: "server" },
    filters: {
      permanent: [...departmentFilters],
    },
    sorters: {
      initial: [
        {field: 'id', order: 'desc'},
      ]
    }
  },
});


  return (
   <ListView>
    <Breadcrumb/>
    <h1 className='page-title'>Subjects</h1>
    <div className='intro-row'>
      <p>Quick access to essential metrics and management tools.</p>

      <div className='actions-row'>
        <div className='search-field'>
          <SearchIcon className='search-icon'/>
          <Input 
          type='text'
          placeholder='Search by name...'
          className='pl-10 w-full'
          value={searchQuery}
          onChange={(e) => setsearchQuery(e.target.value)}
          />
        </div>
        <div className='flex gap-2 w-full sm:w-auto'>
          <Select 
          value={selectedDepartment}
          onValueChange={setselectedDepartment}
          >
<SelectTrigger>

  <SelectValue
  placeholder= "Filter by department..."
  
  />

</SelectTrigger>
<SelectContent>
  <SelectItem
  value='all'>
    All Departments
  </SelectItem>
{DEPARTMENTS_OPTIONS.map(department => (
  <SelectItem  key={department.value}
  value={department.value}>
{department.label}
  </SelectItem>
))}
</SelectContent>
          </Select>

          <CreateButton/>

          {/* by default it automatically redirects you to the creat subject page */}
        </div>
      </div>
    </div>

<DataTable table={subjectTable} />
   </ListView>
  )
}

export default SubjectList