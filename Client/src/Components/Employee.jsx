import { format } from "date-fns";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../Context/storeContext";

const Employee = () => {
  const { employeeList, updateEmployeeDetails,handleDelete } = useContext(StoreContext);

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Employee List</h3>
      </div>
      <Link to="/dashboard/add_employee" className="btn btn-success">
        Add Employee
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Department</th>
              <th>StartDate</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {employeeList.length > 0 ? (
              employeeList.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.position}</td>
                  <td>{item.department}</td>
                  <td>{format(new Date(item.startDate), "MM/dd/yyyy")}</td>
                  <td>
                    <Link to={`/dashboard/edit_employee/${item.id}`}>
                      <button
                        className="btn btn-info btn-sm me-2"
                        onClick={() => updateEmployeeDetails(item.id)}
                      >
                        Edit
                      </button>
                    </Link>
                    <button className="btn btn-warning btn-sm" onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
