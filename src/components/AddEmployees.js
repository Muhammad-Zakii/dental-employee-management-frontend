import React, { useState, useEffect } from "react";
import { addEmployees, getDepartments, getEmployeeById, updateEmployee } from "../services/api";
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Typography,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

const AddEmployees = () => {
  const { id } = useParams(); // Get the employee ID from the URL if it exists
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    getDepartments().then((response) => setDepartments(response.data));

    if (id) {
      // If there's an ID in the URL, fetch the employee details
      getEmployeeById(id).then((response) => {
        const employee = response.data;
        setFirstName(employee.firstName);
        setLastName(employee.lastName);
        setDepartment(employee.department._id); // Assuming department is populated
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEmployee = { firstName, lastName, department };
    try {
      if (id) {
        // If there's an ID, update the employee
        await updateEmployee(id, newEmployee);
        alert("Employee updated successfully!");
      } else {
        // If no ID, add a new employee
        await addEmployees(newEmployee);
        alert("Employee added successfully!");
      }
      navigate("/"); // Redirect to the employee list after submission
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {id ? "Update Employee" : "Add New Employee"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          select
          label="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          fullWidth
          margin="normal"
        >
          {departments.map((dept) => (
            <MenuItem key={dept._id} value={dept._id}>
              {dept.department}
            </MenuItem>
          ))}
        </TextField>
        <Button type="submit" variant="contained" color="primary">
          {id ? "Update Employee" : "Add Employee"}
        </Button>
      </form>
    </Container>
  );
};

export default AddEmployees;
