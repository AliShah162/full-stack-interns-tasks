export default function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  type = "button",
  className = "",
  fullWidth = false,
}) {
  const variants = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    secondary: "bg-gray-500 hover:bg-gray-600 text-white",
    success: "bg-green-500 hover:bg-green-600 text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    warning: "bg-yellow-500 hover:bg-yellow-600 text-white",
    outline:
      "border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white",
  };

  const sizes={
     sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return(
    <button type={type} onClick={onClick} disabled={disabled}  className={`
        ${variants[variant]} 
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        rounded-lg font-medium transition-all duration-200
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    
    
    
    >
    {children}</button>
  )
}
