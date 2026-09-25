import SiteLogo from "@/components/ui/SiteLogo";

export interface AdminBrandInfo {
  logoUrl: string;
  /** Short site name, as set in Settings → Brand. */
  name: string;
}

/**
 * Logo + "<Site> Admin" lockup, shared by the sidebar, the mobile top bar and
 * the login screen so the admin always shows the logo uploaded in Settings.
 *
 * The logo is `shrink-0` and the text `min-w-0 truncate`, so a long site name
 * never pushes the logo out of frame or overflows a narrow phone header.
 */
export default function AdminBrand({
  brand,
  size = "admin",
  className = "",
}: {
  brand: AdminBrandInfo;
  size?: "admin" | "hero";
  className?: string;
}) {
  return (
    <span className={`flex min-w-0 items-center gap-2.5 ${className}`}>
      <SiteLogo size={size} logoUrl={brand.logoUrl} alt={brand.name} className="shrink-0" />
      <span className="min-w-0 truncate font-[family-name:var(--font-display)] text-base font-bold leading-tight text-white">
        {brand.name} <span className="text-ld-gold">Admin</span>
      </span>
    </span>
  );
}
