import React, { useContext, useState } from "react";
import { StoreContext } from "../Context/storeContext";
import { format } from "date-fns";

const Home = () => {
  const { employeeList } = useContext(StoreContext);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredEmployees = employeeList.filter((employee) => {
    const term = searchTerm.toLowerCase();
    return (
      employee.name.toLowerCase().includes(term) ||
      employee.email.toLowerCase().includes(term) ||
      employee.position.toLowerCase().includes(term) ||
      employee.department.toLowerCase().includes(term)
    );
  });

  return (
    <div className="px-5 mt-3 row">
      <div className="d-flex justify-content-start justify-content-lg-center ">
        <h3>Employee List</h3>
      </div>
      <div className="mt-3">
        <input
          type="text"
          placeholder="Search employees"
          value={searchTerm}
          onChange={handleSearchChange}
          className="form-control mb-3"
          style={{ width: "200px", height: "30px" }}
        />
        <div className="table-responsive table-container">
          <table className="table table table-striped table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Position</th>
                <th>Department</th>
                <th>Start Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.position}</td>
                    <td>{item.department}</td>
                    <td>{format(new Date(item.startDate), "MM/dd/yyyy")}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
