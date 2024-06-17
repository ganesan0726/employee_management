import React, { useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { StoreContext } from "../Context/storeContext";

const AddEmployee = () => {
  const {
    employeeDetails,
    setEmployeeDetails,
    departmentList,
    handleSubmit,
    handleDateChange_1,
    validationError,
  } = useContext(StoreContext);

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded-3 w-50 border shadow-sm form-control">
        <h3 className="text-center">Add Employee</h3>
        <form className="row g-1" onSubmit={(e) => e.preventDefault()}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-2"
              id="inputName"
              placeholder="Enter Name"
              value={employeeDetails.name}
              onChange={(e) =>
                setEmployeeDetails({ ...employeeDetails, name: e.target.value })
              }
            />
            {validationError.name && (
              <div className="text-danger">{validationError.name}</div>
            )}
          </div>
          <div className="col-12">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-2"
              id="inputEmail"
              placeholder="Enter Email"
              autoComplete="off"
              value={employeeDetails.email}
              onChange={(e) =>
                setEmployeeDetails({
                  ...employeeDetails,
                  email: e.target.value,
                })
              }
            />
            {validationError.email && (
              <div className="text-danger">{validationError.email}</div>
            )}
          </div>
          <div className="col-12">
            <label htmlFor="inputPosition" className="form-label">
              Position
            </label>
            <input
              type="text"
              className="form-control rounded-2"
              id="inputPosition"
              placeholder="Enter Position"
              autoComplete="off"
              value={employeeDetails.position}
              onChange={(e) =>
                setEmployeeDetails({
                  ...employeeDetails,
                  position: e.target.value,
                })
              }
            />
            {validationError.position && (
              <div className="text-danger">{validationError.position}</div>
            )}
          </div>
          <div className="col-12">
            <label htmlFor="department" className="form-label">
              Department
            </label>
            <select
              name="department"
              id="department"
              className="form-select"
              value={employeeDetails.department}
              onChange={(e) => {
                const selectedDepartment = departmentList.find(
                  (item) => item.departmentName === e.target.value,
                );
                setEmployeeDetails({
                  ...employeeDetails,
                  department: selectedDepartment
                    ? selectedDepartment.departmentName
                    : "",
                });
              }}
            >
              <option value="">Select department</option>
              {departmentList.map((item, index) => {
                return (
                  <option key={index} value={item.departmentName}>
                    {item.departmentName}
                  </option>
                );
              })}
            </select>
            {validationError.department && (
              <div className="text-danger">{validationError.department}</div>
            )}
          </div>
          <div className="col-12">
            <label htmlFor="inputStartDate" className="form-label">
              Start Date
            </label>
            <div className="mt-auto">
              <DatePicker
                id="date-picker"
                className="form-control rounded-2 mt-2"
                style="width:100px,"
                selected={employeeDetails.startDate}
                onChange={handleDateChange_1}
                dateFormat="yyyy-MM-dd"
                minDate={new Date()}
                showTimeSelect={false}
                placeholderText="Select Start Date"
              />
            </div>
            {validationError.startDate && (
              <div className="text-danger">{validationError.startDate}</div>
            )}
          </div>
          <div className="col-12 mt-3 mb-5">
            <button
              type="submit"
              className="btn btn-primary w-100"
              onClick={() => handleSubmit()}
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
