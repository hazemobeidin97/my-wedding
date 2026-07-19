import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-deep px-6 text-pearl">
      <div className="max-w-md text-center">
        <h1 className="font-heading text-xl text-gold">Privacy Notice</h1>
        <p className="mt-4 text-sm text-muted">
          This site collects basic visit data for our own reference.
        </p>
        <Link href="/" className="mt-8 inline-block text-sm text-gold underline">
          ← Back to site
        </Link>
      </div>
    </main>
  );
}
