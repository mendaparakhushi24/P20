export default function Header() {
  return (
    <header className="bg-indigo-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-5 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            👥 EmployeeHub
          </h1>
          <p className="text-indigo-200 text-sm mt-1">
            Employee Management System
          </p>
        </div>

        <span className="hidden sm:block bg-indigo-600 px-4 py-2 rounded-lg text-sm">
          Admin Dashboard
        </span>
      </div>
    </header>
  );
}