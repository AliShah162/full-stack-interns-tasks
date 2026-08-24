export default function EmployeeFilters({ filters, setFilters }) {
  const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Design'];
  const statuses = ['active', 'inactive'];
  const genders = ['male', 'female'];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value || undefined,
    }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  return (
    <div className="flex flex-wrap items-center gap-4 text-black">
      <select
        value={filters.department || ''}
        onChange={(e) => handleFilterChange('department', e.target.value)}
        className="px-3 text-black py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="" className="text-black">All Departments</option>
        {departments.map(dept => (
          <option key={dept} value={dept} className="text-black">{dept}</option>
        ))}
      </select>

      <select
        value={filters.gender || ''}
        onChange={(e) => handleFilterChange('gender', e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">All Genders</option>
        {genders.map(gender => (
          <option key={gender} value={gender}>{gender}</option>
        ))}
      </select>

      <select
        value={filters.status || ''}
        onChange={(e) => handleFilterChange('status', e.target.value)}
        className="px-3 py-2 text-black border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="" className="text-black">All Status</option>
        {statuses.map(status => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>

      <button
        onClick={clearFilters}
        className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
      >
        Clear Filters
      </button>
    </div>
  );
}