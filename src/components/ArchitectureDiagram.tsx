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
    <div className="flex items-center justify-center gap-2 py-1 lg:py-0">
      <span aria-hidden className="hidden lg:block h-px w-3 bg-border" />
      <span className="mono text-[0.7rem] text-text-muted text-center lg:whitespace-nowrap">
        <span className="lg:hidden">{mobileLabel}</span>
        <span className="hidden lg:inline">{label}</span>
      </span>
      <span aria-hidden className="hidden lg:block h-px w-3 bg-border" />
      <span aria-hidden className="hidden lg:inline mono text-[0.7rem] text-text-muted">
        →
      </span>
    </div>
  )
}

const TOPOLOGY_DESCRIPTION =
  'Researchers get secure access to the biobank platform. The platform stores sample data in the biobank DB. It sends spectra to the ML prediction model and gets predictions back, and the model is internal only. The platform, the DB and the model run on infrastructure in a GDPR-compliant EU region.'

export default function ArchitectureDiagram() {
  return (
    <figure
      aria-label="System architecture"
      className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-2 lg:gap-4 items-center"
    >
      <figcaption className="sr-only">{TOPOLOGY_DESCRIPTION}</figcaption>
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2">
        <DiagramNode label="Researchers" sublabel="web browser" className="lg:flex-1" />
        <DiagramLink label="Secure access" mobileLabel="Researchers to Biobank platform · Secure access" />
      </div>

      <div className="border border-dashed border-border p-4 lg:p-6">
        <p className="eyebrow mb-5">Infrastructure in a GDPR-compliant EU region</p>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-2 lg:gap-x-3 lg:gap-y-4 items-center">
          <DiagramNode
            label="Biobank platform"
            sublabel="web app + API"
            className="lg:row-span-2 lg:self-stretch"
          />
          <DiagramLink
            label="Sample data"
            mobileLabel="Biobank platform to Biobank DB · Sample data"
          />
          <DiagramNode label="Biobank DB" sublabel="sample records" />
          <DiagramLink
            label="Spectra and predictions"
            mobileLabel="Biobank platform to ML prediction model · Spectra and predictions"
          />
          <DiagramNode label="ML prediction model" sublabel="internal only" />
        </div>
      </div>
    </figure>
  )
}
