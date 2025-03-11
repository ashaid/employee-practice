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

interface CreateEmployeeDialogProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  formData: FormData;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent) => void;
}

export function CreateEmployeeDialog({
  isOpen,
  setIsOpen,
  formData,
  handleInputChange,
  handleSubmit,
}: CreateEmployeeDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Employee</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
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
            <Button type="button" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
