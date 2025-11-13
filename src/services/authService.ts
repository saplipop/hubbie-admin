import api from "./interceptor";
import { LoginRequest, SignupRequest } from "@/interfaces/authentication";


const login = async (credentials: LoginRequest): Promise<any> => {
  // Send both email and username to be compatible with different backends
  const payload: any = {
    email: credentials.email,
    username: credentials.email,
    password: credentials.password,
  };

  const response = await api.post<any>(`/login`, payload);
  const body = response.data;

  const token = body?.token ?? body?.data?.token;
  const user = body?.user ?? body?.data?.user;
  const roles = body?.roles ?? body?.data?.roles;

  if (token) localStorage.setItem("token", token);
  if (user?.id) localStorage.setItem("userId", user.id);
  if (Array.isArray(roles)) {
    localStorage.setItem("isAdmin", String(roles.includes("admin")));
  } else if (user?.role) {
    localStorage.setItem("isAdmin", String(user.role === "admin"));
  }

  return body;
};

const myRoles = async (): Promise<any> => {
  const response = await api.get<string[]>(`/my-roles`);
  return response.data;
};

const signup = async (userData: SignupRequest): Promise<any> => {
  const response = await api.post<any>(`/signup`, userData);
  return response.data;
};

const registerEmployee = async (userData: SignupRequest): Promise<any> => {
  const response = await api.post<SignupRequest>(`/register-employee`, userData);
  return response.data;
};

const logout = (): void => {
  localStorage.removeItem("token");
    localStorage.removeItem("userId");
  localStorage.removeItem("isAdmin");
};

const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export default {
  login,
  signup,
  logout,
  getToken,
  myRoles,
  registerEmployee
};
