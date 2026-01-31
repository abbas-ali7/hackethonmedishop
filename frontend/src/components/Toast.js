import React from 'react';

const Toast = ({ message, type = 'success', onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
  }[type];

  return (
    <div
      className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-lg fixed bottom-4 right-4 animate-in fade-in slide-in-from-right-4 duration-300 max-w-sm`}
      role="alert"
    >
      {message}
    </div>
  );
};

export default Toast;
