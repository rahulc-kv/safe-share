import React, { useState } from 'react';
import { PolicyList } from './PolicyList';
import { PolicyEditorDialog } from './PolicyEditorDialog';
import type { PolicyData } from '../../types';

interface PolicyStudioProps {
  policies: PolicyData[];
  setPolicies: React.Dispatch<React.SetStateAction<PolicyData[]>>;
}

export function PolicyStudio({ policies, setPolicies }: PolicyStudioProps) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<PolicyData | null>(null);

  function openEditor(policy?: PolicyData) {
    setEditing(policy || null);
    setOpen(true);
  }

  function savePolicy(policy: PolicyData) {
    setPolicies((list) => {
      const idx = list.findIndex(x => x.id === policy.id);
      if (idx >= 0) {
        const copy = [...list];
        copy[idx] = policy;
        return copy;
      }
      return [policy, ...list];
    });
  }

  return (
    <div className="space-y-4">
      <PolicyList 
        policies={policies} 
        setPolicies={setPolicies} 
        openEditor={openEditor}
      />
      <PolicyEditorDialog 
        open={open} 
        setOpen={setOpen} 
        save={savePolicy} 
        initial={editing || undefined}
      />
    </div>
  );
}
