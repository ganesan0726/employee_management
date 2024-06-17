import React, { useContext } from "react";
import { StoreContext } from "../Context/storeContext";

const AddDepartment = () => {
  const { setDepartment, HandleAddDepartment } = useContext(StoreContext);

  return (
    <div className="d-flex justify-content-center align-items-center h-75 ">
      <div className="p-3 rounded w-25 border shadow">
        <h2>Add Department</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-3">
            <label htmlFor="department">
              <strong className="fs-6">Department:</strong>
            </label>
            <input
              type="text"
              name="department"
              placeholder="Enter Department"
              onChange={(e) => setDepartment(e.target.value)}
              className="form-control rounded-0"
            />
          </div>
          <button
            className="btn btn-success w-100 rounded-3 mb-2"
            onClick={() => HandleAddDepartment()}
          >
            Add Department
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;
