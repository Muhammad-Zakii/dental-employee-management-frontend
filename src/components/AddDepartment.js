import React, { useState, useEffect } from "react";
import {
  AddDepartments,
  getDepartmentById,
  updateDepartment,
} from "../services/api";
import { Container, TextField, Button, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

const AddDepartment = () => {
  const { id } = useParams(); // Get the department ID from the URL if it exists
  const navigate = useNavigate();
  const [department, setDepartment] = useState("");

  useEffect(() => {
    if (id) {
      // If there's an ID in the URL, fetch the department details
      getDepartmentById(id).then((response) => {
        setDepartment(response.data.department);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newDepartment = { department };
    try {
      if (id) {
        // If there's an ID, update the department
        await updateDepartment(id, newDepartment);
        alert("Department updated successfully!");
      } else {
        // If no ID, add a new department
        await AddDepartments(newDepartment);
        alert("Department added successfully!");
      }
      navigate("/departments"); // Redirect to the department list after submission
    } catch (error) {
      console.error("Error saving department:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {id ? "Update Department" : "Add New Department"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Department Name"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          {id ? "Update Department" : "Add Department"}
        </Button>
      </form>
    </Container>
  );
};

export default AddDepartment;
