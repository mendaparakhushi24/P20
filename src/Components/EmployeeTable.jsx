export default function EmployeeTable({
  employees,
  onEdit,
  onDelete,
}) {
  if (employees.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-10 text-center border border-gray-200">
        <div className="text-5xl mb-4">📋</div>
        <h3 className="text-xl font-bold text-gray-800">
          No Employees Found
        </h3>
        <p className="text-gray-500 mt-2">
          Add a new employee to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-5 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-800">
          Employee Records
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          View, update, or delete employee details.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-gray-600 text-sm">
            <tr>
              <th className="p-4">Employee</th>
              <th className="p-4">Department</th>
              <th className="p-4">Salary</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {employees.map((employee) => (
              <tr
                key={employee.id}
                className="hover:bg-slate-50 transition"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3 min-w-52">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                      {employee.name.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <p className="font-semibold text-gray-800">
                        {employee.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {employee.email}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="p-4">
                  <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {employee.department}
                  </span>
                </td>

                <td className="p-4 font-semibold text-gray-700 whitespace-nowrap">
                  ₹{Number(employee.salary).toLocaleString("en-IN")}
                </td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(employee)}
                      className="bg-amber-100 hover:bg-amber-200 text-amber-800 px-3 py-2 rounded-lg text-sm font-semibold"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(employee.id)}
                      className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg text-sm font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}