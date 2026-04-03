import { ApiResponse, Employee } from './types';

const API_URL = 'https://dummy.restapiexample.com/api/v1/employees';

export const fetchEmployeesFromAPI = async (): Promise<Employee[]> => {
  try {
    const response = await fetch(API_URL);
    const json: ApiResponse = await response.json();
    return json.data;
  } catch (err) {
    console.error('Error fetching employees:', err);
    throw err;
  }
};
