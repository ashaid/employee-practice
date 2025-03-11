import { useState } from "react";
import { useEmployees, Employee } from "@/hook/useEmployees";
import { useEmployeeMutations } from "@/hook/useEmployeeMutations";
import { DataTable } from "./data-table";
import { columns } from "./employeeColumns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function EmployeeManage() {
  const { data: employees, isLoading, error } = useEmployees();
  const { createEmployee, updateEmployee, deleteEmployee } =
    useEmployeeMutations();

  // State for managing dialogs
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);

  // Form state
  const [formData, setFormData] = useState<Partial<Employee>>({
    name: "",
    department: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createEmployee.mutate(formData as Omit<Employee, "id">, {
      onSuccess: () => {
        setIsCreateDialogOpen(false);
      },
    });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentEmployee) {
      updateEmployee.mutate(
        { id: currentEmployee.id, ...formData } as Employee,
        {
          onSuccess: () => {
            setIsEditDialogOpen(false);
          },
        }
      );
    }
  };

  const handleDeleteConfirm = () => {
    if (currentEmployee) {
      deleteEmployee.mutate(currentEmployee.id, {
        onSuccess: () => {
          setIsDeleteDialogOpen(false);
        },
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

      {!isLoading && !error && (
        <DataTable columns={enhancedColumns} data={employees!} />
      )}

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Employee</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateSubmit}>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                name="name"
                value={formData.name || ""}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="department">Department:</label>
              <input
                id="department"
                name="department"
                value={formData.department || ""}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Button
                type="button"
                onClick={() => setIsCreateDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Create</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit}>
            <div>
              <label htmlFor="edit-name">Name:</label>
              <input
                id="edit-name"
                name="name"
                value={formData.name || ""}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="edit-department">Department:</label>
              <input
                id="edit-department"
                name="department"
                value={formData.department || ""}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Button type="button" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Employee</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete {currentEmployee?.name}? This action
            cannot be undone.
          </p>
          <div>
            <Button type="button" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleDeleteConfirm}>Delete</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default EmployeeManage;
