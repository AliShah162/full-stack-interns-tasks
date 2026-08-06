// components/ui/Input.jsx
"use client"
import { useState } from 'react';

export default function Input({
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  error = '',
  required = false,
  disabled = false,
  className = '',
  id,
}) {
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Handle password visibility toggle
  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className={`w-full ${className}`}>
      {/* Label */}
      {label && (
        <label 
          htmlFor={id} 
          className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {/* Input */}
        <input
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`
            w-full px-4 py-2 border rounded-lg
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-white
            placeholder-gray-400 dark:placeholder-gray-500
            transition-colors duration-200
            ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            focus:outline-none focus:ring-2
          `}
        />

        {/* Password toggle button */}
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}