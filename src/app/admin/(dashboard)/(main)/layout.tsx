import AdminShell from "@/components/admin/AdminShell";
import { getAdminBrand } from "@/lib/admin-brand";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const brand = await getAdminBrand();
  return <AdminShell brand={brand}>{children}</AdminShell>;
}
