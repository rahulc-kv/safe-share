import React, { useState } from 'react';
import { PolicyList } from './PolicyList';
import { PolicyEditorDialog } from './PolicyEditorDialog';
import type { PolicyData } from '../../types';
import { Icons } from '../layout/Sidebar';
import { Button } from '../ui/button';
import { Download, Plus } from 'lucide-react';

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
    <>
      <header className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icons.policies className="h-5 w-5" />
          <h1 className="text-xl font-semibold capitalize">
            Policies
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {/* <div className="flex gap-2 "> */}
            <Button variant="outline" onClick={() => openEditor(undefined)}>
              <Plus className="mr-2 h-4 w-4" />
              New Policy
            </Button>
          {/* </div> */}
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </header>
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
    </>
  );
}
