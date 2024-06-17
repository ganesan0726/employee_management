import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [employeeList, setEmployeeList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [employeeDetails, setEmployeeDetails] = useState({
    name: "",
    email: "",
    position: "",
    department: "",
    startDate: null,
  });
  const [editEmployeeDetails, setEditEmployeeDetails] = useState({
    id: 0,
    name: "",
    email: "",
    position: "",
    department: "",
    startDate: null,
  });
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [userRoles, setUserRoles] = useState();
  const [validationError, setValidationError] = useState({});

  //Validation:

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };
  const validateName = (name) => {
    return name.length > 0;
  };

  const validatePosition = (position) => {
    return position.length > 0;
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const result = await axios.get("http://localhost:8080/auth/employees");
        if (result.data.Status) {
          setEmployeeList(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };

    fetchEmployees();
  }, [employeeList]); // dependency on employeeList

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const result = await axios.get("http://localhost:8080/auth/department");
        if (result.data.Status) {
          setDepartmentList(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      } catch (err) {
        console.error("Error fetching departments:", err);
      }
    };

    fetchDepartments();
  }, [departmentList]); // dependency on departmentList

  // Login / Logout:
  axios.defaults.withCredentials = true;
  const handleLogin = async () => {
    if (!validateEmail(credentials.email)) {
      setValidationError((prev) => ({
        ...prev,
        email: "Invalid email format",
      }));
      return;
    }

    if (!validatePassword(credentials.password)) {
      setValidationError((prev) => ({
        ...prev,
        password: "Password must be at least 8 characters",
      }));
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        credentials,
      );
      if (response.data.Status) {
        setUserRoles(response.data.role);
        localStorage.setItem("userRole", response.data.role);
        navigate("/dashboard");
      } else {
        setError(response.data.Error);
      }
    } catch (error) {
      setError("An error occurred during login");
      console.error("Error during login:", error);
    }
  };
  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:8080/auth/logout");
      if (response.data.Status) {
        localStorage.removeItem("userRole");
        navigate("/login");
      } else {
        alert(response.data.Error);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Handle Date Conditions:
  const handleDateChange_1 = (date) => {
    const formatedDate = format(date, "yyyy-MM-dd");
    setEmployeeDetails({
      ...employeeDetails,
      startDate: formatedDate,
    });
  };
  const handleDateChange_2 = (date) => {
    const formatedDate = format(date, "yyyy-MM-dd");
    setEditEmployeeDetails({
      ...editEmployeeDetails,
      startDate: formatedDate,
    });
  };

  //Add Employee Details:
  const handleSubmit = async () => {
    const errors = {};

    // Validation checks
    if (!employeeDetails.name) {
      errors.name = "Name is required";
    }
    if (!validateEmail(employeeDetails.email)) {
      errors.email = "Invalid email format";
    }
    if (!employeeDetails.position) {
      errors.position = "Position is required";
    }
    if (!employeeDetails.department) {
      errors.department = "Department is required";
    }
    if (!employeeDetails.startDate) {
      errors.startDate = "Start date is required";
    }

    setValidationError(errors);

    if (Object.keys(errors).length > 0) {
      return; // Don't proceed with submission if there are validation errors
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/add_employee",
        { ...employeeDetails },
      );

      if (response.data.Status) {
        // Clear the form on success
        setEmployeeDetails({
          name: "",
          email: "",
          position: "",
          department: "",
          startDate: null,
        });
        navigate("/dashboard/employee");
      } else {
        alert(response.data.Error);
        console.log(response.data.Error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Employee Details edit:
  const updateEmployeeDetails = async (id) => {
    if (id) {
      const response = await axios.get(
        `http://localhost:8080/auth/employees/${id}`,
      );
      try {
        setEditEmployeeDetails({
          ...editEmployeeDetails,
          id: response.data.Result[0].id,
          name: response.data.Result[0].name,
          email: response.data.Result[0].email,
          position: response.data.Result[0].position,
          department: response.data.Result[0].department,
          startDate: response.data.Result[0].startDate,
        });
      } catch {
        console.log(response.data.Error);
      }
    }
  };
  const handleEdit = async (id) => {
    const response = await axios.put(
      `http://localhost:8080/auth/edit_employee/${id}`,
      editEmployeeDetails,
    );
    try {
      if (response.data.Status) {
        navigate("/dashboard/employee");
      } else {
        alert(response.data.Error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Employee Details:
  const handleDelete = async (id) => {
    const response = await axios.delete(
      `http://localhost:8080/auth/delete_employee/${id}`,
    );
    try {
      alert(response.data.Status);
    } catch (error) {
      console.log(error);
    }
  };

  // Child Sharing
  const contextValue = {
    userRoles,
    credentials,
    setCredentials,
    error,
    setError,
    handleLogin,
    handleLogout,
    employeeList,
    departmentList,
    editEmployeeDetails,
    setEditEmployeeDetails,
    employeeDetails,
    setEmployeeDetails,
    handleSubmit,
    handleDateChange_1,
    handleDateChange_2,
    handleEdit,
    updateEmployeeDetails,
    handleDelete,
    validationError,
    validateName,
    validatePosition,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
