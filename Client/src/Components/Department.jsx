import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../Context/storeContext";

const Department = () => {
  const { departmentList } = useContext(StoreContext);
  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Department List</h3>
      </div>
      <Link to="/dashboard/add_department" className="btn btn-success">
        Add Departments
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Department Name</th>
            </tr>
          </thead>
          <tbody>
            {departmentList.map((items, index) => (
              <tr key={index}>
                <td>{items.departmentName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Department;
