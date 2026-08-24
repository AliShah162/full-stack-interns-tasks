'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import StatsCard from '@/app/components/dashboard/StatsCard';
import StatsCard from '@/app/(dashboard)/dashboard/StatsCard';
import DepartmentChart from '@/app/components/dashboard/DepartmentChart';
import RecentEmployees from '@/app/components/dashboard/RecentEmployees';
// import { fetchEmployees } from '@/store/slices/employeeSlice';
import { fetchEmployees } from '@/app/store/slices/employeeSlice';
import { FiUsers, FiUserCheck, FiUserX, FiBriefcase } from 'react-icons/fi';

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { employees, loading } = useSelector((state) => state.employee);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  // Calculate stats
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(e => e.status === 'active').length;
  const inactiveEmployees = employees.filter(e => e.status === 'inactive').length;
  
  // Get unique departments
  const departments = [...new Set(employees.map(e => e.department))];
  const departmentCount = departments.length;

  const stats = [
    {
      title: 'Total Employees',
      value: totalEmployees,
      icon: FiUsers,
      color: 'blue',
    },
    {
      title: 'Active Employees',
      value: activeEmployees,
      icon: FiUserCheck,
      color: 'green',
    },
    {
      title: 'Inactive Employees',
      value: inactiveEmployees,
      icon: FiUserX,
      color: 'red',
    },
    {
      title: 'Departments',
      value: departmentCount,
      icon: FiBriefcase,
      color: 'purple',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <DepartmentChart employees={employees} />
        <RecentEmployees employees={employees} />
      </div>
    </div>
  );
}