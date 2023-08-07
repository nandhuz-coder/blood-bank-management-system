import React from "react";
import {Routes,Route} from "react-router-dom";
import HomePage from "./pages/HomePage";

import Register from "./pages/auth/Register";
import Login from "./pages/auth/login";
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import PublicRoute from "./components/Routes/PublicRoute";
import Donor from "./pages/Dashboard/donor";
import Hospitals from "./pages/Dashboard/Hospitals";
import OrganisationPage from "./pages/Dashboard/OrganisationPage";
import Consumer from "./pages/Dashboard/consumer";
import Donation from "./pages/Donation";
import Analytics from "./pages/Dashboard/Analytics";
import AdminHome from "./pages/Admin/AdminHome";
import DonarList from "./pages/Admin/DonarList";
import HospitalList from "./pages/Admin/HospitalList";
import OrgList from "./pages/Admin/OrgList";
import DonorPage from "./pages/Dashboard/DonorPage";
import HospitalPage from "./pages/Dashboard/HospitalPage";



function App() {
return (
  <>
  <ToastContainer/>
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
          <HomePage/>
        </ProtectedRoute>
      }/>
       <Route path="/donor" element={
        <ProtectedRoute>
         <Donor/>
        </ProtectedRoute>
      }/>

<Route path="/consumer" element={
        <ProtectedRoute>
     <Consumer/>
        </ProtectedRoute>
      }/>

<Route path="/analytics" element={
        <ProtectedRoute>
     <Analytics/>
        </ProtectedRoute>
      }/>

<Route path="/donation" element={
        <ProtectedRoute>
     <Donation/>
        </ProtectedRoute>
      }/>

<Route path="/organisation" element={
        <ProtectedRoute>
          <OrganisationPage/>
        </ProtectedRoute>
      }/>
       <Route path="/hospital" element={
        <ProtectedRoute>
          <Hospitals/>
        </ProtectedRoute>
      }/>

<Route path="/donor-page" element={
        <ProtectedRoute>
          <DonorPage/>
        </ProtectedRoute>
      }/>

<Route path="/hospital-page" element={
        <ProtectedRoute>
          <HospitalPage/>
        </ProtectedRoute>
      }/>

      <Route path="/login" element={
        <PublicRoute><Login/></PublicRoute>
      }/>
      <Route path="/register" element={<PublicRoute><Register/></PublicRoute>}/>
    </Routes>
  </>
)
}

export default App;
