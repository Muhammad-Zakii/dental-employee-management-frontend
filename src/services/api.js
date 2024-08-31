import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api", // Adjust if needed
});

export const getEmployees = () => api.get("/employees");
export const getEmployeeById = (id) => api.get(`/employees/${id}`);
export const addEmployees = (employee) => api.post("/employees", employee);
export const updateEmployee = (id, employee) =>
  api.put(`/employees/${id}`, employee);
export const deleteEmployee = (id) => api.delete(`/employees/${id}`);

export const getDepartments = () => api.get("/departments");
export const AddDepartments = (department) =>
  api.post("/departments", department);
export const updateDepartment = (id, department) =>
  api.put(`/departments/${id}`, department);
export const getDepartmentById = (id) => api.get(`/departments/${id}`);
export const deleteDepartment = (id) => api.delete(`/departments/${id}`);
