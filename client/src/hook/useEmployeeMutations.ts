import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api/config";
import { Employee } from "./useEmployees";

/**
 * hook providing mutations for employee CRUD operations
 * @returns object containing mutation functions for create, update, and delete operations
 */
export const useEmployeeMutations = () => {
  const queryClient = useQueryClient();

  const createEmployee = useMutation({
    mutationFn: async (
      employeeData: Omit<Employee, "id">
    ): Promise<Employee> => {
      const response = await apiClient.post("/users", employeeData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  const updateEmployee = useMutation({
    mutationFn: async (employee: Employee): Promise<Employee> => {
      const response = await apiClient.put(`/users/${employee.id}`, employee);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({ queryKey: ["employee", data.id] });
    },
  });

  const deleteEmployee = useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await apiClient.delete(`/users/${id}`);
    },
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({ queryKey: ["employee", id] });
    },
  });

  return {
    createEmployee,
    updateEmployee,
    deleteEmployee,
  };
};
