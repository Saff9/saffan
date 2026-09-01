'use client';

import { useEffect, useRef, useState } from 'react';

interface RevealSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3 | 4;
}

export default function RevealSection({ children, className = '', delay = 0 }: RevealSectionProps) {
  const [isVisible, setIsVisible] = useState(true); // Default to visible to prevent ANY white screen or layout hiding

  return (
    <div className={`transition-all duration-500 ease-out ${className}`}>
      {children}
    </div>
  );
}
