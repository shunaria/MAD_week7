import { Employee } from './types';

// Get background color based on age
export const getAgeColor = (age: number): string => {
  if (age >= 50) return '#90EE90'; // green
  if (age >= 40) return '#FFFF00'; // yellow
  if (age >= 30) return '#0000FF'; // blue
  if (age >= 20) return '#FF0000'; // red
  return '#FFFFFF'; // white
};

// Filter employees by salary
export const filterBySalary = (
  employees: Employee[],
  minSalary: number
): Employee[] => {
  return employees.filter((emp) => emp.employee_salary > minSalary);
};
