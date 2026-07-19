import Link from "next/link";
import { listVisitors } from "@/lib/visitors";
import VisitorList from "@/components/admin/VisitorList";

export default async function AdminVisitorsPage() {
  const visitors = await listVisitors();

  return (
    <main className="min-h-screen bg-deep">
      <div className="mx-auto max-w-5xl px-6 pt-12">
        <Link href="/admin" className="text-sm text-muted underline">
          ← Invitations
        </Link>
      </div>
      <VisitorList visitors={visitors} />
    </main>
  );
}
