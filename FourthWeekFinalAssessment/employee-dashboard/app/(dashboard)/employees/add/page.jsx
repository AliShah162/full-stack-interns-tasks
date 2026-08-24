'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { addEmployee } from '@/app/store/slices/employeeSlice';
import EmployeeForm from '@/app/components/employees/EmployeeForm';
import toast from 'react-hot-toast';

export default function AddEmployeePage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      // Add employee to API
      const result = await dispatch(addEmployee(data)).unwrap();
      toast.success('Employee added successfully!');
      router.push('/employees');
    } catch (error) {
      toast.error(error || 'Failed to add employee');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6 text-black">Add New Employee</h1>
      <div className="bg-white rounded-lg shadow p-6 text-black">
        <EmployeeForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
}