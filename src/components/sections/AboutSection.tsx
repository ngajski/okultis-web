import SectionFrame from "@/components/ui/SectionFrame";

export default function AboutSection() {
  return (
    <SectionFrame
      id="about"
      label="The studio"
      title={
        <>
          A small studio{" "}
          <span className="display-italic">with a long bench.</span>
        </>
      }
    >
      <div className="grid grid-cols-12 gap-10 md:gap-16">
        <div className="col-span-12 md:col-span-8">
          <p className="dropcap text-text text-[1.2rem] md:text-[1.35rem] leading-[1.55] mb-8">
            Okultis is a boutique studio working with startups and
            small-to-medium teams that would rather ship than rehearse. We hold
            the whole lifecycle - research, design, engineering, infra - inside
            one small room, so nothing gets lost between disciplines. Most MVPs
            leave that room in weeks, not quarters.
          </p>

          <p className="text-text-soft text-[1.05rem] leading-[1.7]">
            We pair engineering precision with a creative streak. The work has
            to look right, feel right, and behave right under load. That
            standard does not move. Not for a deadline, not for a demo.
          </p>
        </div>

        <aside className="col-span-12 md:col-span-4 md:pt-2">
          <blockquote className="display-italic text-[clamp(1.2rem,1.8vw,1.45rem)] leading-[1.35] text-text">
            “Software the way a newsroom prints a paper: with a deadline, a
            point of view, and the red pen never far from the page.”
          </blockquote>
        </aside>
      </div>
    </SectionFrame>
  );
}
