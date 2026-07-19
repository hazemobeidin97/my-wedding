import Link from "next/link";
import { listInvites } from "@/lib/invites";
import InviteActions from "@/components/admin/InviteActions";

export default async function AdminPage() {
  const invites = await listInvites();

  return (
    <main className="min-h-screen bg-deep">
      <div className="mx-auto max-w-5xl px-6 pt-12">
        <Link href="/admin/visitors" className="text-sm text-muted underline">
          Visitors →
        </Link>
      </div>
      <InviteActions invites={invites} />
    </main>
  );
}
