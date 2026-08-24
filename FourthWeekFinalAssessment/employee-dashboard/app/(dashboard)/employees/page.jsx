'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees } from '@/app/store/slices/employeeSlice';
import EmployeeTable from '@/app/components/employees/EmployeeTable';
import EmployeeFilters from '@/app/components/employees/EmployeeFilters';
import EmployeeSearch from '@/app/components/employees/EmployeeSearch';
import Link from 'next/link';
import { FiPlus } from 'react-icons/fi';

export default function EmployeeListPage() {
  const dispatch = useDispatch();
  const { employees, loading } = useSelector((state) => state.employee);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  useEffect(() => {
    // Apply filters and search
    let result = employees;

    // Search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(emp =>
        emp.firstName.toLowerCase().includes(term) ||
        emp.lastName.toLowerCase().includes(term) ||
        emp.email.toLowerCase().includes(term) ||
        emp.phone.includes(term) ||
        emp.department.toLowerCase().includes(term)
      );
    }

    // Filters
    if (filters.department) {
      result = result.filter(emp => emp.department === filters.department);
    }
    if (filters.gender) {
      result = result.filter(emp => emp.gender === filters.gender);
    }
    if (filters.status) {
      result = result.filter(emp => emp.status === filters.status);
    }

    setFilteredEmployees(result);
  }, [employees, searchTerm, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredEmployees.length / pageSize);
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
        <Link
          href="/employees/add"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FiPlus size={20} />
          Add Employee
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <EmployeeSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        
        <div className="p-4 border-b border-gray-200">
          <EmployeeFilters filters={filters} setFilters={setFilters} />
        </div>

        <div className="overflow-x-auto">
          <EmployeeTable 
            employees={paginatedEmployees} 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
        </div>
      </div>
    </div>
  );
}