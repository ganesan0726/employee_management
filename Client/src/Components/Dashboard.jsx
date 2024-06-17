import React, { useContext } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, Outlet } from "react-router-dom";
import { StoreContext } from "../Context/storeContext";

const Dashboard = () => {
  const { handleLogout, userRole } = useContext(StoreContext);

  return (
    <div className="container-fluid overflow-hidden vh-100 custom-container">
      <div className="row flex-nowrap h-100">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-2 pt-2 text-white min-vh-100">
            <Link
              to="/dashboard"
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 fw-bolder d-none d-sm-inline">
                Employee Management
              </span>
            </Link>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="nav-item w-100">
                <Link
                  to="/dashboard"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi-speedometer2 ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>
              {userRole === "admin" && (
                <>
                  <li className="nav-item w-100">
                    <Link
                      to="/dashboard/employee"
                      className="nav-link px-0 align-middle text-white"
                    >
                      <i className="fs-4 bi-people ms-2"></i>
                      <span className="ms-2 d-none d-sm-inline">
                        Manage Employees
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item w-100">
                    <Link
                      to="/dashboard/department"
                      className="nav-link px-0 align-middle text-white"
                    >
                      <i className="fs-4 bi-columns ms-2"></i>
                      <span className="ms-2 d-none d-sm-inline">
                        Departments
                      </span>
                    </Link>
                  </li>
                </>
              )}
              <li className="nav-item w-100">
                <Link
                  to="#"
                  className="nav-link px-0 align-middle text-white"
                  onClick={() => handleLogout()}
                >
                  <i className="fs-4 bi-power ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col m-0 p-0">
          <div className="p-2 d-flex justify-content-start justify-content-lg-center shadow">
            <h4 className="fs-md-4 fs-lg-5 fw-bolder">
              Employee Management System
            </h4>
          </div>
          <div className="content-container flex-grow-1 overflow-scroll">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
