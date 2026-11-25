import { NextRequest, NextResponse } from "next/server";
import { clearOAuthStateCookie, clearTokenVaultCookie, isN8nAuthorized, isSessionAuthorized } from "@/lib/xaocode/tiktok";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!isSessionAuthorized(request) && !isN8nAuthorized(request)) return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  const response = NextResponse.json({ disconnected: true, note: "Se eliminó la sesión local. La revocación remota debe hacerse desde TikTok si corresponde." });
  clearTokenVaultCookie(response);
  clearOAuthStateCookie(response);
  return response;
}
