import type { MetadataRoute } from "next";
import { dominioPublico } from "@/configuracion/empresa";

export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: "*", allow: "/" }, sitemap: `${dominioPublico}/sitemap.xml` }; }
