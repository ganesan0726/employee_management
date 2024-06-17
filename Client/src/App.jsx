import React, { Suspense, lazy } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoutes";

// Lazy load components
const Dashboard = lazy(() => import("./Components/Dashboard"));
const Home = lazy(() => import("./Components/Home"));
const Employee = lazy(() => import("./Components/Employee"));
const Department = lazy(() => import("./Components/Department"));
const AddDepartment = lazy(() => import("./Components/AddDepartment"));
const AddEmployee = lazy(() => import("./Components/AddEmployee"));
const EditEmployee = lazy(() => import("./Components/EditEmployee"));
const Login = lazy(() => import("./Components/Login"));
import "./Components/style.css";

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin", "employee"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="" element={<Home />} />
          <Route
            path="/dashboard/employee"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Employee />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/add_employee"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AddEmployee />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/edit_employee/:id"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <EditEmployee />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/department"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Department />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/add_department"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AddDepartment />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
