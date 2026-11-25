import { NextRequest, NextResponse } from "next/server";
import { callTikTokJson, getValidTokenVault, isN8nAuthorized, setTokenVaultCookie } from "@/lib/xaocode/tiktok";

export const runtime = "nodejs";

const PRIVACY_LEVELS = new Set(["PUBLIC_TO_EVERYONE", "MUTUAL_FOLLOW_FRIENDS", "SELF_ONLY"]);

type PublishBody = {
  confirm?: boolean;
  source?: "PULL_FROM_URL" | "FILE_UPLOAD";
  video_url?: string;
  video_size?: number;
  chunk_size?: number;
  total_chunk_count?: number;
  title?: string;
  privacy_level?: string;
  disable_comment?: boolean;
  disable_duet?: boolean;
  disable_stitch?: boolean;
  video_cover_timestamp_ms?: number;
};

function validPositiveInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value > 0;
}

export async function POST(request: NextRequest) {
  if (!isN8nAuthorized(request)) return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  const body = (await request.json().catch(() => null)) as PublishBody | null;
  if (!body || body.confirm !== true) return NextResponse.json({ error: "La publicación requiere confirm: true." }, { status: 400 });
  if (body.privacy_level && !PRIVACY_LEVELS.has(body.privacy_level)) return NextResponse.json({ error: "privacy_level no permitido." }, { status: 400 });

  const source = body.source ?? "PULL_FROM_URL";
  const sourceInfo = source === "PULL_FROM_URL"
    ? (() => {
        if (!body.video_url || !/^https:\/\//i.test(body.video_url)) return null;
        return { source: "PULL_FROM_URL", video_url: body.video_url };
      })()
    : validPositiveInteger(body.video_size) && validPositiveInteger(body.chunk_size) && validPositiveInteger(body.total_chunk_count)
      ? { source: "FILE_UPLOAD", video_size: body.video_size, chunk_size: body.chunk_size, total_chunk_count: body.total_chunk_count }
      : null;
  if (!sourceInfo) return NextResponse.json({ error: "Faltan datos válidos para el método de carga solicitado." }, { status: 400 });

  const vault = await getValidTokenVault(request);
  if (!vault) return NextResponse.json({ error: "TikTok no está conectado o el acceso expiró." }, { status: 401 });

  try {
    const payload = await callTikTokJson("/v2/post/publish/video/init/", vault.accessToken, {
      post_info: {
        title: typeof body.title === "string" ? body.title.slice(0, 150) : "",
        privacy_level: body.privacy_level ?? "SELF_ONLY",
        disable_comment: body.disable_comment ?? false,
        disable_duet: body.disable_duet ?? false,
        disable_stitch: body.disable_stitch ?? false,
        video_cover_timestamp_ms: body.video_cover_timestamp_ms ?? 0,
      },
      source_info: sourceInfo,
    });
    const response = NextResponse.json(payload, { headers: { "Cache-Control": "no-store" } });
    setTokenVaultCookie(response, vault);
    return response;
  } catch {
    return NextResponse.json({ error: "TikTok rechazó la preparación de la publicación." }, { status: 502 });
  }
}
