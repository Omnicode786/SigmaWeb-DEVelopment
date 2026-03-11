import React from 'react'
import { useShow } from '@refinedev/core'
import { ShowView, ShowViewHeader } from '@/components/refine-ui/views/show-view'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  BookOpen,
  User2,
  Users,
  Hash,
  CalendarDays,
  Sparkles,
  GraduationCap,
  ShieldCheck,
} from 'lucide-react'

const ClassesShow = () => {
  const {
    result: record,
    query: { isLoading, isError },
  } = useShow()

  if (isLoading) {
    return (
      <ShowView>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="space-y-3 text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-muted border-t-foreground" />
            <p className="text-sm text-muted-foreground">Loading class details...</p>
          </div>
        </div>
      </ShowView>
    )
  }

  if (isError) {
    return (
      <ShowView>
        <div className="flex min-h-[60vh] items-center justify-center">
          <Card className="rounded-[28px] border border-white/10 bg-background/80 p-8 shadow-2xl backdrop-blur">
            <CardContent className="p-0 text-center">
              <h2 className="text-2xl font-semibold tracking-tight">Something went wrong</h2>
              <p className="mt-2 text-muted-foreground">
                We couldn’t load the class details right now.
              </p>
            </CardContent>
          </Card>
        </div>
      </ShowView>
    )
  }

  if (!record) {
    return (
      <ShowView>
        <div className="flex min-h-[60vh] items-center justify-center">
          <Card className="rounded-[28px] border border-dashed p-8 shadow-lg">
            <CardContent className="p-0 text-center">
              <h2 className="text-2xl font-semibold tracking-tight">No record found</h2>
              <p className="mt-2 text-muted-foreground">
                This class may have been removed or does not exist.
              </p>
            </CardContent>
          </Card>
        </div>
      </ShowView>
    )
  }

  const statusStyles =
    record.status === 'active'
      ? 'bg-emerald-500/15 text-emerald-600 border-emerald-500/20'
      : record.status === 'inactive'
        ? 'bg-amber-500/15 text-amber-600 border-amber-500/20'
        : 'bg-muted text-muted-foreground border-border'

  return (
    <ShowView className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-0 h-[320px] w-[320px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-[-5%] top-[15%] h-[260px] w-[260px] rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-[20%] h-[280px] w-[280px] rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <ShowViewHeader />

      <section className="mx-auto w-full max-w-7xl space-y-6">
        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-background/70 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <div className="relative h-[280px] w-full overflow-hidden md:h-[360px]">
            {record.bannerUrl ? (
              <>
                <img
                  src={record.bannerUrl}
                  alt={record.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_30%)]" />
              </>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_30%)]" />
                <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
              </div>
            )}

            <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <Badge className={`rounded-full border px-4 py-1.5 text-xs font-medium ${statusStyles}`}>
                  {record.status}
                </Badge>

                <Badge
                  variant="outline"
                  className="rounded-full border-white/20 bg-white/10 px-4 py-1.5 text-xs text-white backdrop-blur"
                >
                  {record.subject?.code ?? 'No Subject Code'}
                </Badge>

                <Badge
                  variant="outline"
                  className="rounded-full border-white/20 bg-white/10 px-4 py-1.5 text-xs text-white backdrop-blur"
                >
                  {record.inviteCode ?? 'No Invite Code'}
                </Badge>
              </div>

              <h1 className="max-w-4xl text-3xl font-semibold tracking-tight text-white md:text-5xl">
                {record.name}
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/80 md:text-base">
                {record.description || 'No description available for this class yet.'}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <Card className="rounded-[28px] border border-white/10 bg-background/75 shadow-[0_12px_50px_-12px_rgba(0,0,0,0.28)] backdrop-blur-xl">
            <CardContent className="p-6 md:p-8">
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">Class Overview</h2>
                  <p className="text-sm text-muted-foreground">
                    A premium snapshot of the class details.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <InfoTile
                  icon={<BookOpen className="h-4 w-4" />}
                  label="Subject"
                  value={record.subject?.name ?? '—'}
                  hint={record.subject?.code ?? 'No subject code'}
                />

                <InfoTile
                  icon={<User2 className="h-4 w-4" />}
                  label="Teacher"
                  value={record.teacher?.name ?? '—'}
                  hint={record.teacher?.email ?? 'No teacher email'}
                />

                <InfoTile
                  icon={<Users className="h-4 w-4" />}
                  label="Capacity"
                  value={String(record.capacity ?? '—')}
                  hint="Maximum students allowed"
                />

                <InfoTile
                  icon={<ShieldCheck className="h-4 w-4" />}
                  label="Status"
                  value={record.status ?? '—'}
                  hint="Current class availability"
                />

                <InfoTile
                  icon={<Hash className="h-4 w-4" />}
                  label="Invite Code"
                  value={record.inviteCode ?? '—'}
                  hint="Used by students to join"
                />

                <InfoTile
                  icon={<CalendarDays className="h-4 w-4" />}
                  label="Created"
                  value={
                    record.createdAt
                      ? new Date(record.createdAt).toLocaleDateString()
                      : '—'
                  }
                  hint="Creation date"
                />
              </div>

              <Separator className="my-8" />

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">Description</h3>
                    <p className="text-sm text-muted-foreground">
                      Narrative and learning context for this class.
                    </p>
                  </div>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-muted/30 p-5 md:p-6">
                  <p className="text-sm leading-7 text-foreground/90 md:text-base">
                    {record.description || 'No description available.'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="rounded-[28px] border border-white/10 bg-background/75 shadow-[0_12px_50px_-12px_rgba(0,0,0,0.28)] backdrop-blur-xl">
              <CardContent className="p-6 md:p-7">
                <h3 className="text-xl font-semibold tracking-tight">Teacher Profile</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Lead instructor for this class.
                </p>

                <div className="mt-6 flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-fuchsia-500/20 text-lg font-semibold">
                    {record.teacher?.name?.charAt(0) ?? 'T'}
                  </div>

                  <div className="min-w-0">
                    <h4 className="truncate text-lg font-semibold">
                      {record.teacher?.name ?? 'Unknown Teacher'}
                    </h4>
                    <p className="truncate text-sm text-muted-foreground">
                      {record.teacher?.email ?? 'No email available'}
                    </p>
                    <Badge variant="outline" className="mt-3 rounded-full px-3 py-1">
                      {record.teacher?.role ?? 'teacher'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

      
          </div>
        </div>
      </section>
    </ShowView>
  )
}

function InfoTile({
  icon,
  label,
  value,
  hint,
}: {
  icon: React.ReactNode
  label: string
  value: string
  hint?: string
}) {
  return (
    <div className="group rounded-[24px] border border-white/10 bg-muted/25 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-muted/40 hover:shadow-lg">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-background shadow-sm">
        {icon}
      </div>
      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      <h4 className="mt-2 text-lg font-semibold tracking-tight">{value}</h4>
      {hint ? <p className="mt-2 text-sm text-muted-foreground">{hint}</p> : null}
    </div>
  )
}

function MiniRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[20px] border border-white/10 bg-muted/25 p-4">
      <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
      <p className="mt-2 text-sm leading-6 text-foreground">{value}</p>
    </div>
  )
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-background/70 p-4 shadow-sm">
      <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
      <p className="mt-2 truncate text-lg font-semibold tracking-tight">{value}</p>
    </div>
  )
}

export default ClassesShow