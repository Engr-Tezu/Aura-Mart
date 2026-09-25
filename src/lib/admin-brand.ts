import { getSiteSettings, DEFAULT_SITE_SETTINGS } from "@/lib/site";
import type { AdminBrandInfo } from "@/components/admin/AdminBrand";

/**
 * The admin reuses the storefront's logo and name, so uploading a new logo in
 * Settings → Brand updates the dashboard and the login screen too.
 */
export async function getAdminBrand(): Promise<AdminBrandInfo> {
  const settings = await getSiteSettings().catch(() => DEFAULT_SITE_SETTINGS);
  return {
    logoUrl: settings.logoUrl || DEFAULT_SITE_SETTINGS.logoUrl,
    name: settings.siteNameShort?.trim() || settings.siteName,
  };
}
