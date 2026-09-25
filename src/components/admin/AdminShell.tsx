"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import AdminBrand, { AdminBrandInfo } from "./AdminBrand";

export default function AdminShell({
  brand,
  children,
}: {
  brand: AdminBrandInfo;
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-theme flex min-h-screen bg-ld-black">
      {/* Desktop sidebar */}
      <div className="fixed inset-y-0 left-0 z-30 hidden w-64 shrink-0 lg:block">
        <AdminSidebar brand={brand} />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-[min(18rem,86vw)] transform transition-transform duration-300 lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <AdminSidebar brand={brand} onNavigate={() => setSidebarOpen(false)} showClose />
      </div>

      <div className="flex min-w-0 flex-1 flex-col lg:ml-64">
        {/* Mobile top bar — hamburger stays put, the brand takes what's left. */}
        <header className="sticky top-0 z-20 flex items-center gap-2 border-b border-ld-grey/50 bg-ld-dark/95 px-3 py-2 backdrop-blur-md sm:gap-3 sm:px-4 sm:py-3 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="shrink-0 rounded-lg p-2 text-ld-light transition-colors hover:bg-ld-charcoal hover:text-ld-gold"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link href="/admin" className="min-w-0 flex-1">
            <AdminBrand brand={brand} className="text-sm" />
          </Link>
        </header>

        <main className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
