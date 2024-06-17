const express = require("express");
const jwt = require("jsonwebtoken");
const connection = require("../utils/dbConfig");

const router = express.Router();

//Login / Logout:

router.post("/login", (req, res) => {
  const sql = "SELECT * FROM users WHERE email = ? and password = ?";
  connection.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query Error" });
    if (result.length > 0) {
      const userRole = result[0].role;
      const token = jwt.sign(
        { role: userRole },
        "Our-jsonwebtoken-secret-key",
        {
          expiresIn: "1d",
        },
      );
      res.cookie("token", token);
      return res.json({ Status: true, role: userRole });
    } else {
      return res.json({ Status: false, Error: "Wrong Email or Password" });
    }
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: true });
});

// Get Department :
router.get("/department", (req, res) => {
  const sql = "SELECT * FROM department";
  connection.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

// Add Department:
router.post("/add_department", (req, res) => {
  const sql = "INSERT INTO department (departmentName) VALUES (?)";
  connection.query(sql, [req.body.department], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true });
  });
});

//Add Employee:
router.post("/add_employee", (req, res) => {
  const sql = `INSERT INTO employees (name,email,position,department,startDate) VALUES (?, ?, ?, ?, ?)`;
  const values = [
    req.body.employeeDetails.name,
    req.body.employeeDetails.email,
    req.body.employeeDetails.position,
    req.body.employeeDetails.department,
    req.body.employeeDetails.startDate,
  ];
  connection.query(sql, values, (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true });
  });
});

//Get Employee:
router.get("/employees", (req, res) => {
  const sql = "SELECT * FROM employees";
  connection.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

//Edit Employee:
router.get("/employees/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employees WHERE id = ?";
  connection.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

router.put("/edit_employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE employees
        set name = ?, email = ?, position = ?, department = ?, startDate = ?
        Where id = ?`;
  const values = [
    req.body.name,
    req.body.email,
    req.body.position,
    req.body.department,
    req.body.startDate,
  ];
  connection.query(sql, [...values, id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

// Delete Employee :
router.delete("/delete_employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = "delete from employees where id = ?";
  connection.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

module.exports = router;
