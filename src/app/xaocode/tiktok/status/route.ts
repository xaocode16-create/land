import { NextRequest, NextResponse } from "next/server";
import { getValidTokenVault, isN8nAuthorized, isSessionAuthorized, setTokenVaultCookie, vaultToPublicStatus } from "@/lib/xaocode/tiktok";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  if (!isSessionAuthorized(request) && !isN8nAuthorized(request)) return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  const vault = await getValidTokenVault(request);
  if (!vault) return NextResponse.json({ connected: false }, { headers: { "Cache-Control": "no-store" } });
  const response = NextResponse.json(vaultToPublicStatus(vault), { headers: { "Cache-Control": "no-store" } });
  setTokenVaultCookie(response, vault);
  return response;
}
