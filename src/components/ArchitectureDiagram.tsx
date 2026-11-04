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

function DiagramLink({ label, mobileLabel }: { label: string; mobileLabel: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-1 md:py-0">
      <span aria-hidden className="hidden md:block h-px w-3 bg-border" />
      <span className="mono text-[0.7rem] text-text-muted text-center md:whitespace-nowrap">
        <span className="md:hidden">{mobileLabel}</span>
        <span className="hidden md:inline">{label}</span>
      </span>
      <span aria-hidden className="hidden md:block h-px w-3 bg-border" />
      <span aria-hidden className="hidden md:inline mono text-[0.7rem] text-text-muted">
        →
      </span>
    </div>
  )
}

const TOPOLOGY_DESCRIPTION =
  'Researchers reach the biobank platform over HTTPS. The platform reads and writes the biobank DB. The platform calls the ML prediction model server to server, and the model is internal only. The platform, the DB and the model run on infrastructure in a GDPR-compliant EU region.'

export default function ArchitectureDiagram() {
  return (
    <figure
      aria-label="System architecture"
      className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 items-center"
    >
      <figcaption className="sr-only">{TOPOLOGY_DESCRIPTION}</figcaption>
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2">
        <DiagramNode label="Researchers" sublabel="web browser" className="md:flex-1" />
        <DiagramLink label="HTTPS" mobileLabel="Researchers to Biobank platform · HTTPS" />
      </div>

      <div className="md:col-span-3 border border-dashed border-border p-4 md:p-6">
        <p className="eyebrow mb-5">Infrastructure in a GDPR-compliant EU region</p>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-2 md:gap-x-3 md:gap-y-4 items-center">
          <DiagramNode
            label="Biobank platform"
            sublabel="web app + API"
            className="md:row-span-2 md:self-stretch"
          />
          <DiagramLink
            label="reads and writes"
            mobileLabel="Biobank platform to Biobank DB · reads and writes"
          />
          <DiagramNode label="Biobank DB" sublabel="sample records" />
          <DiagramLink
            label="server to server"
            mobileLabel="Biobank platform to ML prediction model · server to server"
          />
          <DiagramNode label="ML prediction model" sublabel="internal only" />
        </div>
      </div>
    </figure>
  )
}
