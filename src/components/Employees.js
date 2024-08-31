import React, { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../services/api";
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

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    getEmployees()
      .then((response) => setEmployees(response?.data))
      .catch((error) => console.error("Error fetching Employees:", error));
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      alert("Employee deleted successfully!");
      fetchEmployees(); // Refresh the department list after deletion
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update-employee/${id}`);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Employee List
      </Typography>
      <List>
        {employees?.map((employee) => (
          <ListItem key={employee?._id} divider>
            <ListItemText
              primary={`${employee?.firstName} ${employee?.lastName}`}
              secondary={`Department: ${employee?.department?.department}`}
            />
            <Box>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleUpdate(employee?._id)}
                style={{ marginRight: 8 }}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleDelete(employee?._id)}
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

export default EmployeeList;
