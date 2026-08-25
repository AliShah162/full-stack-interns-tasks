'use client';
import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedEmployee } from '@/app/store/slices/employeeSlice';
import { FiMail, FiPhone, FiMapPin, FiBriefcase, FiCalendar } from 'react-icons/fi';
import Link from 'next/link';

export default function EmployeeDetailsPage() { 
  const params = useParams();
  const router = useRouter();//useParams hook lets components read dynamic parameters from the current URL path. It returns an object of key-value pairs matching dynamic route segments (like /users/:id), making it easy to fetch and display specific data.
  const dispatch = useDispatch();
  const { employees, selectedEmployee } = useSelector((state) => state.employee);

  useEffect(() => {                           
    const employee = employees.find(e => e.id === Number(params.id));
    if (employee) {
      dispatch(setSelectedEmployee(employee));
    } else {
      router.push('/employees');
    }
  }, [params.id, employees]);

  if (!selectedEmployee) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const { firstName, lastName, email, phone, department, designation, company, age, gender, address, image, status } = selectedEmployee;
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Employee Details</h1>
        <div className="flex gap-3">
          <Link
            href={`/employees/edit/${selectedEmployee.id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Edit Employee
          </Link>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Back
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-6">
            <img
              src={image || '/images/default-avatar.png'}
              alt={`${firstName} ${lastName}`}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {firstName} {lastName}
              </h2>
              <p className="text-gray-600">{designation}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {status || 'Active'}
                </span>
                <span className="text-sm text-gray-500">ID: {selectedEmployee.id}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200">
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
            <div className="flex items-start gap-3">
              <FiMail className="mt-1 text-gray-400" />
              <div>
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="text-sm text-gray-900">{email}</dd>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <FiPhone className="mt-1 text-gray-400" />
              <div>
                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                <dd className="text-sm text-gray-900">{phone}</dd>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <FiBriefcase className="mt-1 text-gray-400"/>
              <div>                  
                <dt className="text-sm font-medium text-gray-500">Department & Company</dt>
                <dd className="text-sm text-gray-900">{department} @ {company}</dd>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <FiCalendar className="mt-1 text-gray-400" />
              <div>
                <dt className="text-sm font-medium text-gray-500">Age & Gender</dt>
                <dd className="text-sm text-gray-900">{age} years • {gender}</dd>
              </div>
            </div>
            
            <div className="flex items-start gap-3 md:col-span-2">
              <FiMapPin className="mt-1 text-gray-400" />
              <div>
                <dt className="text-sm font-medium text-gray-500">Address</dt>
                <dd className="text-sm text-gray-900">
                  {address?.address || 'N/A'}<br />
                  {address?.city && `${address.city}, `}
                  {address?.state && `${address.state} `}
                  {address?.postalCode}
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}