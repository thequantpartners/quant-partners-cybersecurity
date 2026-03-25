import React, { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const TerminalLine = ({ text, delay = 0, status = "info", className }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!visible) return null;

  const statusColors = {
    info: 'text-gray-400',
    warning: 'text-yellow-400',
    critical: 'text-red-500 text-glow-red',
    success: 'text-signals text-glow',
  };

  return (
    <div className={cn("font-mono text-sm md:text-base flex items-start gap-3 py-1", className)}>
      <span className="text-gray-600 shrink-0">{'>'}</span>
      <span className={statusColors[status]}>{text}</span>
    </div>
  );
};
