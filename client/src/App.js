import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import PublicRoute from "./components/Routes/PublicRoute";
import Loading from "./components/Loading/loading";

// Lazy Loading Components
const HomePage = lazy(() => import("./pages/HomePage"));
const Register = lazy(() => import("./pages/auth/Register"));
const Login = lazy(() => import("./pages/auth/login"));
const Donor = lazy(() => import("./pages/Dashboard/donor"));
const Hospitals = lazy(() => import("./pages/Dashboard/Hospitals"));
const OrganisationPage = lazy(() => import("./pages/Dashboard/OrganisationPage"));
const Consumer = lazy(() => import("./pages/Dashboard/consumer"));
const Donation = lazy(() => import("./pages/Donation"));
const Analytics = lazy(() => import("./pages/Dashboard/Analytics"));
const AdminHome = lazy(() => import("./pages/Admin/AdminHome"));
const DonarList = lazy(() => import("./pages/Admin/DonarList"));
const HospitalList = lazy(() => import("./pages/Admin/HospitalList"));
const OrgList = lazy(() => import("./pages/Admin/OrgList"));
const DonorPage = lazy(() => import("./pages/Dashboard/DonorPage"));
const HospitalPage = lazy(() => import("./pages/Dashboard/HospitalPage"));

function App() {
  return (
    <>
      {/* Toast Notifications */}
      <ToastContainer />

      <Routes>
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Suspense fallback={<Loading />}>
                <AdminHome />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/donor-list"
          element={
            <ProtectedRoute>
              <Suspense fallback={<Loading />}>
                <DonarList />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/hospital-list"
          element={
            <ProtectedRoute>
              <Suspense fallback={<Loading />}>
                <HospitalList />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/org-list"
          element={
            <ProtectedRoute>
              <Suspense fallback={<Loading />}>
                <OrgList />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Suspense fallback={<Loading />}>
                <HomePage />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/donor"
          element={
            <ProtectedRoute>
              <Suspense fallback={<Loading />}>
                <Donor />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/consumer"
          element={
            <ProtectedRoute>
              <Suspense fallback={<Loading />}>
                <Consumer />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Suspense fallback={<Loading />}>
                <Analytics />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/donation"
          element={
            <ProtectedRoute>
              <Suspense fallback={<Loading />}>
                <Donation />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/organisation"
          element={
            <ProtectedRoute>
              <Suspense fallback={<Loading />}>
                <OrganisationPage />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/hospital"
          element={
            <ProtectedRoute>
              <Suspense fallback={<Loading />}>
                <Hospitals />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/donor-page"
          element={
            <ProtectedRoute>
              <Suspense fallback={<Loading />}>
                <DonorPage />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/hospital-page"
          element={
            <ProtectedRoute>
              <Suspense fallback={<Loading />}>
                <HospitalPage />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Suspense fallback={<Loading />}>
                <Login />
              </Suspense>
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Suspense fallback={<Loading />}>
                <Register />
              </Suspense>
            </PublicRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
