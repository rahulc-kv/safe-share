import { Badge } from '@/components/ui/badge';
import type { Entity } from '../../types';

interface EntityPillsProps {
  entities: Entity[];
}

export function EntityPills({ entities }: EntityPillsProps) {
  return (
    <div className="flex flex-wrap gap-1">
      {entities.map((e, i) => (
        <Badge 
          key={i} 
          variant={
            e.type === "Secret" ? "destructive" : 
            e.type === "PAN" ? "default" : 
            "secondary"
          }
        >
          {e.type} {Math.round(e.confidence * 100)}%
        </Badge>
      ))}
    </div>
  );
}
