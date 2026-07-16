import { listInvites } from "@/lib/invites";
import InviteActions from "@/components/admin/InviteActions";

export default async function AdminPage() {
  const invites = await listInvites();

  return (
    <main className="min-h-screen bg-deep">
      <InviteActions invites={invites} />
    </main>
  );
}
