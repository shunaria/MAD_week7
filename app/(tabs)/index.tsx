import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import { Employee } from './types';
import { styles } from './styles';
import { fetchEmployeesFromAPI } from './api';
import { getAgeColor, filterBySalary } from './utils';

const MIN_SALARY = 500000;

export default function StartScreen() {
  // State Management
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  // Fetch Function
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(false);
      const data = await fetchEmployeesFromAPI();
      setEmployees(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // useEffect - Run when screen loads
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Filter employees with salary > MIN_SALARY
  const filteredEmployees = filterBySalary(employees, MIN_SALARY);

  // Loading State
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading employees...</Text>
      </View>
    );
  }

  // Error State
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Failed to load data</Text>
        <TouchableOpacity style={styles.reloadBtn} onPress={fetchEmployees}>
          <Text style={styles.reloadBtnText}>Reload</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Empty State
  if (filteredEmployees.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>No employees found with salary > 500000</Text>
        <TouchableOpacity style={styles.reloadBtn} onPress={fetchEmployees}>
          <Text style={styles.reloadBtnText}>Reload</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Main Screen with FlatList
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.reloadBtn} onPress={fetchEmployees}>
        <Text style={styles.reloadBtnText}>Reload</Text>
      </TouchableOpacity>

      <FlatList<Employee>
        data={filteredEmployees}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              { backgroundColor: getAgeColor(item.employee_age) },
            ]}
          >
            <Text style={styles.cardText}>
              <Text style={styles.label}>Name: </Text>
              {item.employee_name}
            </Text>
            <Text style={styles.cardText}>
              <Text style={styles.label}>Age: </Text>
              {item.employee_age}
            </Text>
            <Text style={styles.cardText}>
              <Text style={styles.label}>Salary: </Text>
              ${item.employee_salary.toLocaleString()}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
