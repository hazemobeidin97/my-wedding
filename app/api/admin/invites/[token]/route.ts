import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { requireAdminSession } from "@/lib/admin-session";
import { deleteInvite, resetInvite } from "@/lib/invites";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ token: string }> }
) {
  if (!(await requireAdminSession(request))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { token } = await context.params;
  await resetInvite(token);
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ token: string }> }
) {
  if (!(await requireAdminSession(request))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { token } = await context.params;
  await deleteInvite(token);
  return NextResponse.json({ ok: true });
}
