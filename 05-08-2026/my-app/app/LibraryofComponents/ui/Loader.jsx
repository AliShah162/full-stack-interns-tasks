// components/ui/Loader.jsx
"use client"

export default function Loader({ 
  size = 'md', 
  color = 'blue',
  fullScreen = false,
  text = '',
}) {
  const sizes = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
    xl: 'w-24 h-24 border-4',
  };

  const colors = {
    blue: 'border-blue-500',
    white: 'border-white',
    gray: 'border-gray-500',
    green: 'border-green-500',
    red: 'border-red-500',
  };

  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <div 
        className={`
          ${sizes[size]} 
          ${colors[color]}
          rounded-full 
          border-t-transparent 
          animate-spin
        `}
      />
      {text && <p className="text-gray-500 dark:text-gray-400">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-black bg-opacity-80 z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
}