import React, { useEffect, useState } from "react";
import { getDepartments, deleteDepartment } from "../services/api";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = () => {
    getDepartments()
      .then((response) => setDepartments(response?.data))
      .catch((error) => console.error("Error fetching departments:", error));
  };

  const handleEdit = (id) => {
    navigate(`/update-department/${id}`); // Navigate to the edit form
  };

  const handleDelete = async (id) => {
    try {
      await deleteDepartment(id);
      alert("Department deleted successfully!");
      fetchDepartments(); // Refresh the department list after deletion
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Department List
      </Typography>
      <List>
        {departments?.map((department) => (
          <ListItem key={department?._id} divider>
            <ListItemText primary={department?.department} />
            <Box>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleEdit(department?._id)}
                style={{ marginRight: "8px" }}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleDelete(department?._id)}
              >
                Delete
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Department;
