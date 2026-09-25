import type { Metadata } from "next";
import { getSiteSettings, DEFAULT_SITE_SETTINGS } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings().catch(() => DEFAULT_SITE_SETTINGS);
  return {
    title: `Admin | ${settings.siteName}`,
    robots: { index: false, follow: false },
  };
}

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
