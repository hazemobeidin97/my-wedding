type Reason = "invalid" | "denied";

const COPY: Record<Reason, { title: string; body: string }> = {
  invalid: {
    title: "Invitation not found",
    body: "This invitation link isn't recognized. Please double-check the link, or reach out to Hazem & Layla directly.",
  },
  denied: {
    title: "Invitation already in use",
    body: "This invitation is already registered to another device. If you've switched phones or this is a mistake, please contact Hazem & Layla so they can reset it for you.",
  },
};

export default async function InviteDeniedPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string }>;
}) {
  const { reason } = await searchParams;
  const { title, body } = COPY[reason === "denied" ? "denied" : "invalid"];

  return (
    <main className="flex min-h-screen items-center justify-center bg-deep px-6 text-pearl">
      <div
        className="max-w-md rounded-lg border px-8 py-10 text-center"
        style={{
          borderColor: "rgba(201,169,110,0.25)",
          backgroundColor: "#140F0B",
        }}
      >
        <h1 className="font-heading text-2xl text-gold">{title}</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted">{body}</p>
      </div>
    </main>
  );
}
