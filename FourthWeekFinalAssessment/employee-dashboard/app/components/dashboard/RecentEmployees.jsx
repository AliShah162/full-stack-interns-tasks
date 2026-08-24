import Link from 'next/link';

export default function RecentEmployees({ employees }) {
  const recent = employees.slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Employees</h3>
        <Link href="/employees" className="text-sm text-blue-600 hover:text-blue-800">
          View All
        </Link>
      </div>
      
      <div className="space-y-4">
        {recent.map((employee) => (
          <Link
            key={employee.id}
            href={`/employees/${employee.id}`}
            className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <img
              src={employee.image || '/images/default-avatar.png'}
              alt={employee.firstName}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {employee.firstName} {employee.lastName}
              </p>
              <p className="text-sm text-gray-500 truncate">{employee.department}</p>
            </div>
            <span className={`px-2 py-1 text-xs rounded-full ${
              employee.status === 'active' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {employee.status || 'Active'}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}