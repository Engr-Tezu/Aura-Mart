import { getAdminSession } from "@/lib/auth";
import { getAdminBrand } from "@/lib/admin-brand";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import AdminShell from "@/components/admin/AdminShell";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default async function AdminPage() {
  const [session, brand] = await Promise.all([getAdminSession(), getAdminBrand()]);

  if (!session) {
    return <AdminLoginForm brand={brand} />;
  }

  return (
    <AdminShell brand={brand}>
      <AdminDashboard />
    </AdminShell>
  );
}
