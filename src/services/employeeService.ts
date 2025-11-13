import api from "./interceptor";
import { Employee } from "@/data/mockData";

export interface EmployeeResponse {
  success: boolean;
  data: {
    employee?: Employee;
    employees?: Employee[];
  };
  message?: string;
}

const employeeService = {
  getAll: async (params?: any): Promise<Employee[]> => {
    const response = await api.get<Employee[]>(`/users/role/employee`, { params });
    return response.data;
  },

  getById: async (id: string): Promise<Employee | null> => {
    const response = await api.get<EmployeeResponse>(`/users/${id}`);
    return response.data.data.employee || null;
  },

  create: async (employeeData: Partial<Employee>): Promise<Employee> => {
    const response = await api.post<EmployeeResponse>("/users", employeeData);
    return response.data.data.employee!;
  },

  update: async (id: string, employeeData: Partial<Employee>): Promise<Employee> => {
    const response = await api.put<EmployeeResponse>(`/users/${id}`, employeeData);
    return response.data.data.employee!;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};

export default employeeService;
