import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import PublicRoute from "./components/Routes/PublicRoute";

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
      <ToastContainer />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/donor-list"
            element={
              <ProtectedRoute>
                <DonarList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hospital-list"
            element={
              <ProtectedRoute>
                <HospitalList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/org-list"
            element={
              <ProtectedRoute>
                <OrgList />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />
          <Route path="/donor" element={
            <ProtectedRoute>
              <Donor />
            </ProtectedRoute>
          } />
          <Route path="/consumer" element={
            <ProtectedRoute>
              <Consumer />
            </ProtectedRoute>
          } />
          <Route path="/analytics" element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          } />
          <Route path="/donation" element={
            <ProtectedRoute>
              <Donation />
            </ProtectedRoute>
          } />
          <Route path="/organisation" element={
            <ProtectedRoute>
              <OrganisationPage />
            </ProtectedRoute>
          } />
          <Route path="/hospital" element={
            <ProtectedRoute>
              <Hospitals />
            </ProtectedRoute>
          } />
          <Route path="/donor-page" element={
            <ProtectedRoute>
              <DonorPage />
            </ProtectedRoute>
          } />
          <Route path="/hospital-page" element={
            <ProtectedRoute>
              <HospitalPage />
            </ProtectedRoute>
          } />
          <Route path="/login" element={
            <PublicRoute><Login /></PublicRoute>
          } />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App;
