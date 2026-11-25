import { NextResponse } from "next/server";
import { buildTikTokAuthorizationUrl, createOAuthState, setOAuthStateCookie, TikTokConfigurationError } from "@/lib/xaocode/tiktok";

export const runtime = "nodejs";

export function GET() {
  try {
    const state = createOAuthState();
    const response = NextResponse.redirect(buildTikTokAuthorizationUrl(state));
    setOAuthStateCookie(response, state);
    return response;
  } catch (error) {
    const message = error instanceof TikTokConfigurationError ? error.message : "La conexión de TikTok no está configurada.";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}
