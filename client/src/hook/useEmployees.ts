import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/config";

export interface Employee {
  id: string;
  name: string;
  department: string;
}

/**
 * hook to fetch all employees
 * @returns query result with employees data
 */
export const useEmployees = () => {
  return useQuery({
    queryKey: ["employees"],
    queryFn: async (): Promise<Employee[]> => {
      const response = await apiClient.get("/users");
      return response.data;
    },
  });
};

/**
 * hook to fetch a single employee by ID
 * @param id the employee ID
 * @returns query result with employee data
 */
export const useEmployee = (id: string) => {
  return useQuery({
    queryKey: ["employee", id],
    queryFn: async (): Promise<Employee> => {
      const response = await apiClient.get(`/users/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};
