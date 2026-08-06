// components/ui/Card.jsx
"use client"

export default function Card({
  children,
  title,
  subtitle,
  className = '',
  padding = 'p-6',
  hover = false,
}) {
  return (
    <div 
      className={`
        bg-white dark:bg-gray-800 
        rounded-xl shadow-md 
        ${padding} 
        ${hover ? 'hover:shadow-xl transition-shadow duration-300' : ''}
        ${className}
      `}
    >
      {/* Card Header */}
      {(title || subtitle) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Card Content */}
      {children}
    </div>
  );
}