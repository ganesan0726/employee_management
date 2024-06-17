import React, { useContext } from "react";
import "./style.css";
import { StoreContext } from "../Context/storeContext";

const Login = () => {
  const { credentials, setCredentials, error, handleLogin, validationError } =
    useContext(StoreContext);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-30 border loginForm">
        <div className="text-danger">{error && error}</div>
        <h2>Login Page</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email : </strong>
            </label>
            <input
              className="form-control rounded-0"
              type="email"
              name="email"
              placeholder="Enter Email"
              autoComplete="off"
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
            />
            {validationError.email && (
              <div className="text-danger">{validationError.email}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password : </strong>
            </label>
            <input
              className="form-control rounded-0"
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
            {validationError.password && (
              <div className="text-danger">{validationError.password}</div>
            )}
          </div>
          <button
            className="btn btn-success w-100 rounded-0 mb-2"
            onClick={() => handleLogin()}
          >
            Login
          </button>
          <div className="mb-1">
            <input type="checkbox" name="tick" id="tick" className="me-2" />
            <label htmlFor="password" className="fs-6">
              You are Agree with terms & conditions
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
