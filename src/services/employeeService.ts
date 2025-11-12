import api from "./interceptor";
import { Employee } from "@/data/mockData";

export interface EmployeeResponse {
  success: boolean;
  data: {
    employees?: Employee[];
    employee?: Employee;
  };
  message?: string;
}

const employeeService = {
  getAll: async (params?: { status?: string; role?: string }): Promise<Employee[]> => {
    const response = await api.get<EmployeeResponse>("/employees", { params });
    return response.data.data.employees || [];
  },

  getById: async (employeeId: string): Promise<Employee | null> => {
    const response = await api.get<EmployeeResponse>(`/employees/${employeeId}`);
    return response.data.data.employee || null;
  },

  create: async (employeeData: Partial<Employee>): Promise<Employee> => {
    const response = await api.post<EmployeeResponse>("/employees", employeeData);
    return response.data.data.employee!;
  },

  update: async (employeeId: string, employeeData: Partial<Employee>): Promise<Employee> => {
    const response = await api.put<EmployeeResponse>(`/employees/${employeeId}`, employeeData);
    return response.data.data.employee!;
  },

  delete: async (employeeId: string): Promise<void> => {
    await api.delete(`/employees/${employeeId}`);
  },
};

export default employeeService;
