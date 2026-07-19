import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { requireAdminSession } from "@/lib/admin-session";
import { getVisitor, getVisitorHistory } from "@/lib/visitors";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ visitorId: string }> }
) {
  if (!(await requireAdminSession(request))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { visitorId } = await params;
  const visitor = await getVisitor(visitorId);
  if (!visitor) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  const history = await getVisitorHistory(visitorId);
  return NextResponse.json({ visitor, history });
}
