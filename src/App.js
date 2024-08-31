import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import EmployeeList from "./components/Employees";
import AddEmployee from "./components/AddEmployees";
import DepartmentList from "./components/Department";
import AddDepartment from "./components/AddDepartment";
import { Container, AppBar, Toolbar, Button } from "@mui/material";

const App = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            Employees
          </Button>
          <Button color="inherit" component={Link} to="/add-employee">
            Add Employee
          </Button>
          <Button color="inherit" component={Link} to="/departments">
            Departments
          </Button>
          <Button color="inherit" component={Link} to="/add-department">
            Add Departments
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/update-employee/:id" element={<AddEmployee />} />
          <Route path="/departments" element={<DepartmentList />} />
          <Route path="/add-department" element={<AddDepartment />} />
          <Route path="/update-department/:id" element={<AddDepartment />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
