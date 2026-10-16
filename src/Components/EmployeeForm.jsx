import { useEffect, useState } from "react";

const emptyEmployee = {
  name: "",
  email: "",
  department: "IT",
  salary: "",
};

export default function EmployeeForm({
  selectedEmployee,
  onSave,
  onCancel,
}) {
  const [form, setForm] = useState(emptyEmployee);

  useEffect(() => {
    if (selectedEmployee) {
      setForm({
        name: selectedEmployee.name,
        email: selectedEmployee.email,
        department: selectedEmployee.department,
        salary: String(selectedEmployee.salary),
      });
    } else {
      setForm(emptyEmployee);
    }
  }, [selectedEmployee]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      ...form,
      salary: Number(form.salary),
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-1">
        {selectedEmployee ? "✏️ Edit Employee" : "➕ Add Employee"}
      </h2>

      <p className="text-sm text-gray-500 mb-6">
        Enter the employee details below.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Full Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter employee name"
            required
            className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="employee@example.com"
            required
            className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Department
          </label>
          <select
            name="department"
            value={form.department}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl p-3 bg-white outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option>IT</option>
            <option>HR</option>
            <option>Finance</option>
            <option>Marketing</option>
            <option>Sales</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Monthly Salary (₹)
          </label>
          <input
            type="number"
            name="salary"
            value={form.salary}
            onChange={handleChange}
            min="0"
            step="0.01"
            placeholder="Enter salary"
            required
            className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition"
        >
          {selectedEmployee ? "Update Employee" : "Add Employee"}
        </button>

        {selectedEmployee && (
          <button
            type="button"
            onClick={onCancel}
            className="w-full border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold py-3 rounded-xl"
          >
            Cancel Editing
          </button>
        )}
      </form>
    </div>
  );
}