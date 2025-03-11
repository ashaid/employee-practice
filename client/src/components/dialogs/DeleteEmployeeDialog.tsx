import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Dispatch, SetStateAction } from "react";
import { Employee } from "@/hook/useEmployees";

interface DeleteEmployeeDialogProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  employee: Employee | null;
  handleConfirm: () => void;
}

export function DeleteEmployeeDialog({
  isOpen,
  setIsOpen,
  employee,
  handleConfirm,
}: DeleteEmployeeDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Employee</DialogTitle>
        </DialogHeader>
        <p>
          Are you sure you want to delete {employee?.name}? This action cannot
          be undone.
        </p>
        <div>
          <Button type="button" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Delete</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
