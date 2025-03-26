import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import PublicRoute from "./components/Routes/PublicRoute";
import Loading from "./components/Loading/loading";

// ✅ Lazy Loading Components
const HomePage = lazy(() => import("./pages/HomePage"));
const Register = lazy(() => import("./pages/auth/Register"));
const Login = lazy(() => import("./pages/auth/login"));

// ✅ Dashboard Components
const Donor = lazy(() => import("./pages/Dashboard/donor"));
const Hospitals = lazy(() => import("./pages/Dashboard/Hospitals"));
const Consumer = lazy(() => import("./pages/Dashboard/consumer"));
const Donation = lazy(() => import("./pages/Donation"));
const Analytics = lazy(() => import("./pages/Dashboard/Analytics"));
const DonorPage = lazy(() => import("./pages/Dashboard/DonorPage"));
const HospitalPage = lazy(() => import("./pages/Dashboard/HospitalPage"));

// ✅ Admin Components
const AdminHome = lazy(() => import("./pages/Admin/AdminHome"));
const DonarList = lazy(() => import("./pages/Admin/DonarList"));
const HospitalList = lazy(() => import("./pages/Admin/HospitalList"));

// ✅ Protected Routes List
const protectedRoutes = [
  { path: "/", element: <HomePage /> },
  { path: "/admin", element: <AdminHome /> },
  { path: "/donor-list", element: <DonarList /> },
  { path: "/hospital-list", element: <HospitalList /> },
  { path: "/donor", element: <Donor /> },
  { path: "/consumer", element: <Consumer /> },
  { path: "/analytics", element: <Analytics /> },
  { path: "/donation", element: <Donation /> },
  { path: "/hospital", element: <Hospitals /> },
  { path: "/donor-page", element: <DonorPage /> },
  { path: "/hospital-page", element: <HospitalPage /> },
];

function App() {
  return (
    <>
      {/* ✅ Toast Notifications */}
      <ToastContainer />
      {/* ✅ Wrap Entire Routes with Suspense */}
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* ✅ Protected Routes - Map through the list */}
          {protectedRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={<ProtectedRoute>{element}</ProtectedRoute>} />
          ))}
          {/* ✅ Public Routes */}
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;