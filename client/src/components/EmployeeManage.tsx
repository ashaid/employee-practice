import { useState, ChangeEvent, FormEvent } from "react";
import { useEmployees, Employee } from "@/hook/useEmployees";
import { useEmployeeMutations } from "@/hook/useEmployeeMutations";
import { DataTable } from "./data-table";
import { columns } from "./employeeColumns";
import { Button } from "@/components/ui/button";
import { CreateEmployeeDialog } from "./dialogs/CreateEmployeeDialog";
import { EditEmployeeDialog } from "./dialogs/EditEmployeeDialog";
import { DeleteEmployeeDialog } from "./dialogs/DeleteEmployeeDialog";
import { DepartmentFilter } from "./DepartmentFilter";

function EmployeeManage() {
  const { data: employees, isLoading, error } = useEmployees();
  const { createEmployee, updateEmployee, deleteEmployee } =
    useEmployeeMutations();

  // State for managing dialogs
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState({ name: "", department: "" });
  const [departmentFilter, setDepartmentFilter] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenCreateDialog = () => {
    setFormData({ name: "", department: "" });
    setIsCreateDialogOpen(true);
  };

  const handleOpenEditDialog = (employee: Employee) => {
    setCurrentEmployee(employee);
    setFormData({ name: employee.name, department: employee.department });
    setIsEditDialogOpen(true);
  };

  const handleOpenDeleteDialog = (employee: Employee) => {
    setCurrentEmployee(employee);
    setIsDeleteDialogOpen(true);
  };

  const handleCreateSubmit = (e: FormEvent) => {
    e.preventDefault();
    createEmployee.mutate(formData as Omit<Employee, "id">, {
      onSuccess: () => setIsCreateDialogOpen(false),
    });
  };

  const handleEditSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (currentEmployee) {
      updateEmployee.mutate(
        { id: currentEmployee.id, ...formData },
        { onSuccess: () => setIsEditDialogOpen(false) }
      );
    }
  };

  const handleDeleteConfirm = () => {
    if (currentEmployee) {
      deleteEmployee.mutate(currentEmployee.id, {
        onSuccess: () => setIsDeleteDialogOpen(false),
      });
    }
  };

  const enhancedColumns = [
    ...columns,
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: { row: { original: Employee } }) => (
        <div>
          <Button onClick={() => handleOpenEditDialog(row.original)}>
            Edit
          </Button>
          <Button onClick={() => handleOpenDeleteDialog(row.original)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <h2>Employee Management Dashboard</h2>

      <Button onClick={handleOpenCreateDialog}>Add New Employee</Button>

      {!isLoading && !error && employees && (
        <>
          <div style={{ marginBottom: "1rem" }}>
            <DepartmentFilter
              data={employees}
              onFilterChange={setDepartmentFilter}
            />
          </div>
          <DataTable
            columns={enhancedColumns}
            data={
              departmentFilter
                ? employees.filter((emp) => emp.department === departmentFilter)
                : employees
            }
          />
        </>
      )}

      <CreateEmployeeDialog
        isOpen={isCreateDialogOpen}
        setIsOpen={setIsCreateDialogOpen}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleCreateSubmit}
      />

      <EditEmployeeDialog
        isOpen={isEditDialogOpen}
        setIsOpen={setIsEditDialogOpen}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleEditSubmit}
      />

      <DeleteEmployeeDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        employee={currentEmployee}
        handleConfirm={handleDeleteConfirm}
      />
    </>
  );
}

export default EmployeeManage;
