import { useCallback, useEffect, useState } from "react";
import Header from "./Components/Header";
import EmployeeForm from "./Components/EmployeeForm";
import EmployeeTable from "./Components/EmployeeTable";

const API_URL = "https://jsonplaceholder.typicode.com/users";

const departments = ["IT", "HR", "Finance", "Marketing", "Sales"];

function normalizeEmployee(user, index = 0) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    department: departments[index % departments.length],
    salary: 25000 + index * 5000,
  };
}

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Unable to fetch employee records.");
      }

      const data = await response.json();

      setEmployees(data.map((user, index) =>
        normalizeEmployee(user, index)
      ));
    } catch {
      setError(
        "Could not load employees. Check your internet connection and try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleSave = async (formData) => {
    setSaving(true);
    setError("");
    setMessage("");

    const isEditing = Boolean(selectedEmployee);

    const payload = isEditing
      ? { ...selectedEmployee, ...formData }
      : { ...formData };

    try {
      const response = await fetch(
        isEditing
          ? `${API_URL}/${selectedEmployee.id}`
          : API_URL,
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Unable to save employee.");
      }

      const result = await response.json();

      if (isEditing) {
        setEmployees((prev) =>
          prev.map((employee) =>
            employee.id === selectedEmployee.id
              ? { ...employee, ...formData }
              : employee
          )
        );

        setMessage("Employee updated successfully!");
      } else {
        const newEmployee = {
          ...payload,
          id: Math.max(0, ...employees.map((e) => e.id)) + 1,
        };

        setEmployees((prev) => [newEmployee, ...prev]);
        setMessage("Employee added successfully!");
      }

      setSelectedEmployee(null);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmed) return;

    setError("");
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Unable to delete employee.");
      }

      setEmployees((prev) =>
        prev.filter((employee) => employee.id !== id)
      );

      if (selectedEmployee?.id === id) {
        setSelectedEmployee(null);
      }

      setMessage("Employee deleted successfully!");
    } catch (err) {
      setError(err.message || "Unable to delete employee.");
    }
  };

  const totalSalary = employees.reduce(
    (sum, employee) => sum + Number(employee.salary || 0),
    0
  );

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8 md:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Employee Dashboard
          </h2>
          <p className="text-gray-500 mt-2">
            Manage your workforce from one place.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Total Employees</p>
            <h3 className="text-3xl font-bold text-indigo-700 mt-2">
              {loading ? "..." : employees.length}
            </h3>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Departments</p>
            <h3 className="text-3xl font-bold text-emerald-600 mt-2">
              {new Set(employees.map((e) => e.department)).size}
            </h3>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Monthly Payroll</p>
            <h3 className="text-2xl font-bold text-violet-700 mt-2">
              ₹{totalSalary.toLocaleString("en-IN")}
            </h3>
          </div>
        </div>

        {message && (
          <div role="status" className="mb-5 p-4 rounded-xl bg-green-100 text-green-800 border border-green-200">
            ✓ {message}
          </div>
        )}

        {error && (
          <div role="alert" className="mb-5 p-4 rounded-xl bg-red-100 text-red-700 border border-red-200">
            {error}
            <button
              onClick={fetchEmployees}
              className="ml-3 underline font-semibold"
            >
              Retry
            </button>
          </div>
        )}

        {loading ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <p className="text-indigo-700 font-semibold">
              Loading employees...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-1">
              <EmployeeForm
                selectedEmployee={selectedEmployee}
                onSave={handleSave}
                onCancel={() => setSelectedEmployee(null)}
              />

              {saving && (
                <p className="text-indigo-600 text-sm mt-3">
                  Saving employee...
                </p>
              )}
            </div>

            <div className="lg:col-span-2 min-w-0">
              <EmployeeTable
                employees={employees}
                onEdit={(employee) => {
                  setSelectedEmployee(employee);
                  setMessage("");
                  setError("");
                }}
                onDelete={handleDelete}
              />
            </div>
          </div>
        )}

        <footer className="text-center text-sm text-gray-500 mt-10 pb-5">
          EmployeeHub © 2026 | Employee Management System
        </footer>
      </main>
    </div>
  );
}