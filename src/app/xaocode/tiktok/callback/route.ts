import { NextRequest, NextResponse } from "next/server";
import {
  clearOAuthStateCookie,
  exchangeAuthorizationCode,
  getOAuthStateCookie,
  setTokenVaultCookie,
  TikTokConfigurationError,
} from "@/lib/xaocode/tiktok";
import { timingSafeEqual } from "node:crypto";

export const runtime = "nodejs";

function htmlResponse(title: string, message: string, status = 200) {
  return new NextResponse(`<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title></head><body style="font-family:system-ui,sans-serif;max-width:680px;margin:80px auto;padding:24px;color:#10223b"><h1>${title}</h1><p>${message}</p><p><a href="/xaocode">Volver a xaoCode Automatización</a></p></body></html>`, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}

function sameState(expected: string, received: string): boolean {
  const expectedBuffer = Buffer.from(expected);
  const receivedBuffer = Buffer.from(received);
  return expectedBuffer.length === receivedBuffer.length && timingSafeEqual(expectedBuffer, receivedBuffer);
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const state = params.get("state");
  const error = params.get("error");
  const code = params.get("code");
  const savedState = getOAuthStateCookie(request);
  if (!state || !savedState || !sameState(savedState, state)) {
    return htmlResponse("Solicitud no válida", "La sesión de autorización expiró o no coincide. Inicia la conexión nuevamente.", 400);
  }
  if (error) {
    const response = htmlResponse("Autorización no completada", "TikTok no autorizó la conexión. Puedes volver a intentarlo.", 400);
    clearOAuthStateCookie(response);
    return response;
  }
  if (!code) return htmlResponse("Callback incompleto", "TikTok no devolvió un código de autorización.", 400);

  try {
    const tokenResponse = await exchangeAuthorizationCode(code);
    const now = Date.now();
    const vault = {
      accessToken: tokenResponse.access_token!,
      refreshToken: tokenResponse.refresh_token!,
      openId: tokenResponse.open_id!,
      scopes: (tokenResponse.scope ?? params.get("scopes") ?? "").split(/[ ,]+/).filter(Boolean),
      accessTokenExpiresAt: now + (tokenResponse.expires_in ?? 0) * 1000,
      refreshTokenExpiresAt: tokenResponse.refresh_expires_in ? now + tokenResponse.refresh_expires_in * 1000 : null,
      connectedAt: now,
    };
    const success = htmlResponse("TikTok conectado", "La autorización se completó. Los tokens se guardaron cifrados y no se muestran en pantalla.");
    clearOAuthStateCookie(success);
    setTokenVaultCookie(success, vault);
    return success;
  } catch (error) {
    const message = error instanceof TikTokConfigurationError ? "La integración no está configurada en el servidor." : "TikTok no pudo completar el intercambio de autorización.";
    return htmlResponse("No se pudo conectar TikTok", message, 502);
  }
}
