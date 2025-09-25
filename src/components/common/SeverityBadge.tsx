import React from 'react';
import { Badge } from '@/components/ui/badge';

interface SeverityBadgeProps {
  value: string;
}

export function SeverityBadge({ value }: SeverityBadgeProps) {
  if (value.toLowerCase() === 'high') {
    return <Badge variant="destructive">High</Badge>;
  }
  if (value.toLowerCase() === 'medium') {
    return <Badge>Medium</Badge>;
  }
  return <Badge variant="secondary">Low</Badge>;
}
