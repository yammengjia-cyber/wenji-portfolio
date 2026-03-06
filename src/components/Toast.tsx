'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface ToastMessage {
  id: number;
  text: string;
  type: 'info' | 'success' | 'warning';
}

interface ToastContextType {
  showToast: (text: string, type?: 'info' | 'success' | 'warning') => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((text: string, type: 'info' | 'success' | 'warning' = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 2500);
  }, []);

  const bgColor = {
    info: 'bg-gray-800',
    success: 'bg-green-600',
    warning: 'bg-primary',
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-16 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`${bgColor[toast.type]} text-white px-5 py-2.5 rounded-full text-sm font-medium shadow-lg whitespace-nowrap animate-toastIn`}
          >
            {toast.text}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
