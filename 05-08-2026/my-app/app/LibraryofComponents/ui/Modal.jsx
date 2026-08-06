// components/ui/Modal.jsx
"use client"
import { useEffect, useRef } from 'react';
import Button from './Button';

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
}) {
  const modalRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  //  Close when clicking outside
  const handleOutsideClick = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-6xl',
  };

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOutsideClick}
    >
      <div 
        className={`
          ${sizes[size]} 
          w-full mx-4 
          bg-white dark:bg-gray-800 
          rounded-2xl shadow-2xl
          transform transition-all duration-300
          animate-in fade-in zoom-in
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          {showCloseButton && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ✕
            </button>
          )}
        </div>

        {/* Body */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}