import React from 'react';
import { Badge } from '@/components/ui/badge';

interface SeverityBadgeProps {
  value: number;
}

export function SeverityBadge({ value }: SeverityBadgeProps) {
  if (value > 80) {
    return <Badge variant="destructive">High</Badge>;
  }
  if (value > 50) {
    return <Badge>Medium</Badge>;
  }
  return <Badge variant="secondary">Low</Badge>;
}
