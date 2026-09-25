"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderTree,
  Package,
  Settings,
  LogOut,
  X,
  MessageSquareQuote,
  HelpCircle,
  ExternalLink,
} from "lucide-react";
import AdminBrand, { AdminBrandInfo } from "./AdminBrand";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Products", icon: Package, exact: false },
  { href: "/admin/categories", label: "Categories", icon: FolderTree, exact: false },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle, exact: false },
  { href: "/admin/reviews", label: "Reviews", icon: MessageSquareQuote, exact: false },
  { href: "/admin/settings", label: "Settings", icon: Settings, exact: false },
];

interface AdminSidebarProps {
  brand: AdminBrandInfo;
  onNavigate?: () => void;
  showClose?: boolean;
}

export default function AdminSidebar({ brand, onNavigate, showClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/login", { method: "DELETE" });
    router.push("/admin");
    router.refresh();
  };

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <aside className="flex h-full w-full flex-col border-r border-ld-grey/50 bg-ld-dark">
      <div className="flex items-center justify-between gap-2 border-b border-ld-grey/50 p-4 sm:p-5">
        <Link href="/admin" onClick={onNavigate} className="min-w-0 flex-1">
          <AdminBrand brand={brand} />
        </Link>
        {showClose && (
          <button
            onClick={onNavigate}
            className="shrink-0 rounded-lg p-2 text-ld-silver transition-colors hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
              isActive(item.href, item.exact)
                ? "border border-ld-gold/20 bg-ld-gold/15 text-ld-gold-light"
                : "text-ld-light hover:bg-ld-charcoal hover:text-white"
            }`}
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="space-y-1 border-t border-ld-grey/50 p-4">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-ld-silver transition-colors hover:text-ld-gold"
        >
          <ExternalLink className="h-5 w-5 shrink-0" />
          View Site
        </Link>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-400 transition-colors hover:bg-red-500/10"
        >
          <LogOut className="h-5 w-5 shrink-0" />
          Logout
        </button>
      </div>
    </aside>
  );
}
