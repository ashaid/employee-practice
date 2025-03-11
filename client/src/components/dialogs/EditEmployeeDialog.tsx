import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Dispatch, SetStateAction, ChangeEvent, FormEvent } from "react";

interface FormData {
  name: string;
  department: string;
}

interface EditEmployeeDialogProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  formData: FormData;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent) => void;
}

export function EditEmployeeDialog({
  isOpen,
  setIsOpen,
  formData,
  handleInputChange,
  handleSubmit,
}: EditEmployeeDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Employee</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
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
            <Button type="button" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
