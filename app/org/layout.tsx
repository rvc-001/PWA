import ProtectedRoute from "@/components/ProtectedRoute";

export default function OrgLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}

