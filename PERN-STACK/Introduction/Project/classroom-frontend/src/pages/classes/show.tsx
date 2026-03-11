import React from 'react'
import { ShowView, ShowViewHeader } from '@/components/refine-ui/views/show-view'
import { useShow } from '@refinedev/core'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const ClassesShow = () => {
  const {
    result: record,
    query: { isLoading, isError },
  } = useShow()

//   console.log(record)

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Something went wrong</div>
  if (!record) return <div>No record found</div>

  return (
    <ShowView>
      <ShowViewHeader />
      <Card>
        <CardHeader>
          <CardTitle>{record.name}</CardTitle>
        </CardHeader>

        <Separator />

        <CardContent>
          {record.bannerUrl ? (
            <img
              src={record.bannerUrl}
              alt="banner"
              className="mb-4 max-h-64 w-full rounded object-cover"
            />
          ) : null}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-semibold">Description</h3>
              <p className="text-muted-foreground">{record.description ?? '—'}</p>
            </div>

            <div>
              <h3 className="font-semibold">Subject</h3>
              <p>{record.subject?.name ?? '—'}</p>

              <h3 className="mt-3 font-semibold">Teacher</h3>
              <p>{record.teacher?.name ?? '—'}</p>

              <h3 className="mt-3 font-semibold">Capacity</h3>
              <p>{record.capacity ?? '—'}</p>

              <h3 className="mt-3 font-semibold">Status</h3>
              <p>{record.status ?? '—'}</p>

              <h3 className="mt-3 font-semibold">Invite Code</h3>
              <p>{record.inviteCode ?? '—'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </ShowView>
  )
}

export default ClassesShow