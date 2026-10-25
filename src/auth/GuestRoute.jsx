import { Navigate, Outlet } from "react-router-dom";
import { useAuthSession } from "./userSession";

function GuestRoute() {
  const { session, loading, error } = useAuthSession();

  if (loading) {
    return null;
  }

  if (error) {
    return <p role="alert">Gagal memeriksa sesi. Silakan muat ulang halaman.</p>;
  }

  if (session) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default GuestRoute;
