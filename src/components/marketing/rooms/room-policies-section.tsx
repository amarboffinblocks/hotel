import { roomStayPolicies } from "@/data/rooms";

export function RoomPoliciesSection() {
  return (
    <section className="border-t border-[#E8DCCB]/80 pt-8">
      <h3 className="text-sm font-semibold tracking-wide text-foreground uppercase">
        Stay policies
      </h3>
      <div className="mt-5 divide-y divide-[#E8DCCB]/80 border-y border-[#E8DCCB]/80">
        {roomStayPolicies.map((policy) => (
          <details key={policy.title} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm font-medium text-foreground transition-colors hover:text-primary marker:content-none [&::-webkit-details-marker]:hidden">
              {policy.title}
              <span className="text-primary transition group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="pb-4 text-sm leading-relaxed text-muted-foreground">
              {policy.body}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
