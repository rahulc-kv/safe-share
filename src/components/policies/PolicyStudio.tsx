import React, { useEffect, useState } from 'react';
import { PolicyList } from './PolicyList';
import { PolicyEditorDialog } from './PolicyEditorDialog';
import type { PolicyData } from '../../types';
import { Icons } from '../layout/Sidebar';
import { Button } from '../ui/button';
import { Download, Plus } from 'lucide-react';
import { supabaseApi } from '@/supabase/api';

interface PolicyStudioProps {
  policies: PolicyData[];
  setPolicies: React.Dispatch<React.SetStateAction<PolicyData[]>>;
}

// eslint-disable-next-line no-empty-pattern
export function PolicyStudio({ }: PolicyStudioProps) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<PolicyData | null>(null);
  const [policies, setPolicies] = useState<PolicyData[]>([]);

  function openEditor(policy?: PolicyData) {
    setEditing(policy || null);
    setOpen(true);
  }

  const getInstruments = async () => {
    const { data } = await supabaseApi.from("policy").select(`
      id,
      name,
      description,
      is_enabled,
      version,
      tags,
      modes,
      created_at,
      prompt
    `);

    if (data) {
      // setIncidents(data as unknown as IncidentData);
      // Transform the data and update allIncidents
      // const transformedIncidents = transformIncidentData(data as unknown as IncidentData);
      // setIncidents(transformedIncidents)
      
      setPolicies(data.map((item) => {
        return {
          id: item.id,
          name: item.name,
          description: item.description,
          status: item.is_enabled ? "active" : "inactive",
          version: item.version,
          tags: item.tags,
          mode: item.modes,
          prompt: item.prompt
        }
      }))
    }

    console.log(data);
  };

  useEffect(() => {
    getInstruments();
  }, []);

  async function savePolicy(policy: PolicyData) {
    // setPolicies((list) => {
    //   const idx = list.findIndex(x => x.id === policy.id);
    //   if (idx >= 0) {
    //     const copy = [...list];
    //     copy[idx] = policy;
    //     return copy;
    //   }
    //   return [policy, ...list];
    // });
    await supabaseApi.from("policy").upsert({
      id: policy.id,
      name: policy.name,
      description: policy.description,
      is_enabled: policy.status === "active",
      version: policy.version,
      tags: policy.tags,
      modes: policy.mode,
      prompt: policy.prompt
    });
    getInstruments();
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
