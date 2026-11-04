import { cn } from '@/lib/utils'

function DiagramNode({
  label,
  sublabel,
  className,
}: {
  label: string
  sublabel?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'border border-border px-5 py-4 flex flex-col justify-center text-text',
        className,
      )}
    >
      <span className="font-medium">{label}</span>
      {sublabel && (
        <span className="mono mt-1 text-[0.75rem] text-text-muted">{sublabel}</span>
      )}
    </div>
  )
}

function DiagramLink({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-1 md:py-0">
      <span aria-hidden className="hidden md:block h-px w-3 bg-border" />
      <span className="mono text-[0.7rem] text-text-muted whitespace-nowrap">{label}</span>
      <span aria-hidden className="hidden md:block h-px w-3 bg-border" />
    </div>
  )
}

export default function ArchitectureDiagram() {
  return (
    <figure
      aria-label="System architecture"
      className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 items-center"
    >
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2">
        <DiagramNode label="Browser" className="md:flex-1" />
        <DiagramLink label="HTTPS" />
      </div>

      <div className="md:col-span-3 border border-dashed border-border p-4 md:p-6">
        <p className="eyebrow mb-5">EU region · infrastructure as code</p>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-2 md:gap-x-3 md:gap-y-4 items-center">
          <DiagramNode
            label="Platform"
            sublabel="API + web app"
            className="md:row-span-2 md:self-stretch"
          />
          <DiagramLink label="SQL" />
          <DiagramNode label="PostgreSQL" />
          <DiagramLink label="server to server" />
          <DiagramNode label="Model service" sublabel="internal only" />
        </div>
      </div>
    </figure>
  )
}
