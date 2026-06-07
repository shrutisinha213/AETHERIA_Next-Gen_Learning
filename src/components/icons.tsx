'use client';

import * as Icons from 'lucide-react';

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
}

export function DynamicIcon({ name, className, size = 20 }: DynamicIconProps) {
  // Resolve string to component
  const IconComponent = (Icons as any)[name];

  if (!IconComponent) {
    // Fallback to a default icon if not found
    return <Icons.HelpCircle className={className} size={size} />;
  }

  return <IconComponent className={className} size={size} />;
}
