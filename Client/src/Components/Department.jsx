import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../Context/storeContext";

const Department = () => {
  const { departmentList, setDepartmentList } = useContext(StoreContext);

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
  }, []);
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
