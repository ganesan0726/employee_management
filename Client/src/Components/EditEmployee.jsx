import React, { useContext } from "react";
import { StoreContext } from "../Context/storeContext";
import DatePicker from "react-datepicker";

const EditEmployee = () => {
  const {
    departmentList,
    editEmployeeDetails,
    setEditEmployeeDetails,
    handleDateChange_2,
    handleEdit,
  } = useContext(StoreContext);

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded-3 w-50 border shadow">
        <h3 className="text-center">Edit Employee Details</h3>
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
              value={editEmployeeDetails.name}
              onChange={(e) =>
                setEditEmployeeDetails({
                  ...editEmployeeDetails,
                  name: e.target.value,
                })
              }
            />
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
              value={editEmployeeDetails.email}
              onChange={(e) =>
                setEditEmployeeDetails({
                  ...editEmployeeDetails,
                  email: e.target.value,
                })
              }
            />
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
              value={editEmployeeDetails.position}
              onChange={(e) =>
                setEditEmployeeDetails({
                  ...editEmployeeDetails,
                  position: e.target.value,
                })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="department" className="form-label">
              Department
            </label>
            <select
              name="department"
              id="department"
              className="form-select"
              value={editEmployeeDetails.department}
              onChange={(e) => {
                const selectedDepartment = departmentList.find(
                  (item) => item.departmentName === e.target.value,
                );
                setEditEmployeeDetails({
                  ...editEmployeeDetails,
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
          </div>
          <div className="col-12">
            <label htmlFor="date-picker" className="form-label">
              Start Date
            </label>
            <div className="mt-auto">
              <DatePicker
                id="date-picker"
                className="form-control rounded-2 mt-2"
                style="width:100px"
                selected={editEmployeeDetails.startDate}
                onChange={handleDateChange_2}
                dateFormat="yyyy-MM-dd"
                minDate={new Date()}
                showTimeSelect={false}
                placeholderText="Select Start Date"
              />
            </div>
          </div>
          <div className="col-12 mt-3">
            <button
              type="submit"
              className="btn btn-primary w-100"
              onClick={() => handleEdit(editEmployeeDetails.id)}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
