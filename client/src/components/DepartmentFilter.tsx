import { Employee } from "@/hook/useEmployees";

interface DepartmentFilterProps {
  data: Employee[];
  onFilterChange: (department: string) => void;
}

export function DepartmentFilter({
  data,
  onFilterChange,
}: DepartmentFilterProps) {
  // Extract unique departments from data
  const departments = [...new Set(data.map((item) => item.department))];

  return (
    <div>
      <select onChange={(e) => onFilterChange(e.target.value)}>
        <option value="">All Departments</option>
        {departments.map((department) => (
          <option key={department} value={department}>
            {department}
          </option>
        ))}
      </select>
    </div>
  );
}
