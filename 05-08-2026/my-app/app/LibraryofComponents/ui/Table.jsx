// components/ui/Table.jsx
"use client"

export default function Table({
  columns,
  data,
  className = '',
  striped = true,
  hover = true,
}) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full text-sm text-left">
        {/* Table Head */}
        <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700">
          <tr>
            {columns.map((col, index) => (
              <th 
                key={index} 
                className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.map((row, rowIndex) => (
            <tr 
              key={rowIndex}
              className={`
                border-b border-gray-200 dark:border-gray-700
                ${striped && rowIndex % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800/50' : ''}
                ${hover ? 'hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors' : ''}
              `}
            >
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="px-6 py-4">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Empty state */}
      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No data available
        </div>
      )}
    </div>
  );
}