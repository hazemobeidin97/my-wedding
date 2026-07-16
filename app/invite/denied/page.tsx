type Reason = "invalid" | "denied";

function copyFor(reason: Reason, label: string | undefined) {
  if (reason === "denied") {
    return {
      title: "This invitation is already in use",
      body: label
        ? `This invitation for ${label} has already been used on another device. If ${label} has changed phones or you believe this is an error, please let Hazem & Layla know, and we'll happily reset the invitation.`
        : "This invitation has already been used on another device. If you've changed phones or you believe this is an error, please let Hazem & Layla know, and we'll happily reset the invitation.",
    };
  }

  return {
    title: "Invitation not found",
    body: "This invitation link isn't recognized. Please double-check the link, or reach out to Hazem & Layla directly.",
  };
}

export default async function InviteDeniedPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string; label?: string }>;
}) {
  const { reason, label } = await searchParams;
  const { title, body } = copyFor(reason === "denied" ? "denied" : "invalid", label);

  return (
    <main className="flex min-h-screen items-center justify-center bg-deep px-6 text-pearl">
      <div
        className="max-w-md rounded-lg border px-8 py-10 text-center"
        style={{
          borderColor: "rgba(201,169,110,0.25)",
          backgroundColor: "#140F0B",
        }}
      >
        <p className="text-gold" style={{ letterSpacing: "0.2em" }}>
          ❦
        </p>
        <h1 className="mt-3 font-heading text-2xl text-gold">{title}</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted">{body}</p>
      </div>
    </main>
  );
}
