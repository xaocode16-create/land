import { NextRequest, NextResponse } from "next/server";
import { callTikTokJson, getValidTokenVault, isN8nAuthorized, setTokenVaultCookie } from "@/lib/xaocode/tiktok";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!isN8nAuthorized(request)) return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  const body = (await request.json().catch(() => null)) as { publish_id?: string } | null;
  if (!body?.publish_id || !/^[A-Za-z0-9._~:-]+$/.test(body.publish_id)) return NextResponse.json({ error: "publish_id inválido." }, { status: 400 });
  const vault = await getValidTokenVault(request);
  if (!vault) return NextResponse.json({ error: "TikTok no está conectado o el acceso expiró." }, { status: 401 });
  try {
    const payload = await callTikTokJson("/v2/post/publish/status/fetch/", vault.accessToken, { publish_id: body.publish_id });
    const response = NextResponse.json(payload, { headers: { "Cache-Control": "no-store" } });
    setTokenVaultCookie(response, vault);
    return response;
  } catch {
    return NextResponse.json({ error: "No se pudo consultar el estado de la publicación." }, { status: 502 });
  }
}
