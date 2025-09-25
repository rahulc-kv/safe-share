import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Save } from 'lucide-react';
import type { PolicyData, PolicyForm } from '../../types';
import { randId } from '../../utils/helpers';

interface PolicyEditorDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  save: (policy: PolicyData) => void;
  initial?: PolicyData;
}

export function PolicyEditorDialog({ open, setOpen, save, initial }: PolicyEditorDialogProps) {
  const [form, setForm] = useState<PolicyForm>({
    name: "",
    author: "",
    tags: "",
    source_type: "internal",
    source_mapping: "",
    description: "",
    prompt: "",
    mode: "nudge",
    version: "1.0.0",
    status: "draft"
  });

  useEffect(() => {
    if (initial) {
      setForm({
        name: initial.name,
        author: initial.author,
        tags: initial.tags.join(", "),
        source_type: initial.source_type,
        source_mapping: initial.source_mapping.join(", "),
        description: initial.description,
        prompt: initial.prompt,
        mode: initial.mode,
        version: initial.version,
        status: initial.status
      });
    } else {
      setForm({
        name: "",
        author: "",
        tags: "",
        source_type: "internal",
        source_mapping: "",
        description: "",
        prompt: "",
        mode: "nudge",
        version: "1.0.0",
        status: "draft"
      });
    }
  }, [initial, open]);

  function handleSave() {
    const tags = String(form.tags || "").split(",").map((s) => s.trim()).filter(Boolean);
    const mapping = String(form.source_mapping || "").split(",").map((s) => s.trim()).filter(Boolean);
    const payload: PolicyData = {
      id: initial?.id || `pol_${randId()}`,
      name: form.name,
      author: form.author,
      tags,
      source_type: form.source_type,
      source_mapping: mapping,
      description: form.description,
      prompt: form.prompt,
      rule_logic: { 
        entities: [{ type: "PAN" }], 
        thresholds: { 
          severity: { 
            nudge: 30, 
            soft: 60, 
            hard: 80 
          } 
        } 
      },
      mode: form.mode,
      scope: { users: ["*"], groups: ["*"], apps: ["*"] },
      exceptions: [],
      version: form.version,
      status: form.status,
    };
    save(payload);
    setOpen(false);
  }

  const valid = form.name && form.author && form.prompt;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-scroll">
        <DialogHeader>
          <DialogTitle>{initial ? "Edit Policy" : "New Policy"}</DialogTitle>
          <DialogDescription>Define detection logic and enforcement details</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input 
              value={form.name} 
              onChange={(e) => setForm({ ...form, name: e.target.value })} 
              placeholder="Policy name"
            />
          </div>
          {/* <div className="space-y-2">
            <Label>Author / Researcher</Label>
            <Input 
              value={form.author} 
              onChange={(e) => setForm({ ...form, author: e.target.value })} 
              placeholder="Security Research"
            />
          </div> */}
          <div className="space-y-2">
            <Label>Entities (comma‑sep)</Label>
            <Input 
              value={form.tags} 
              onChange={(e) => setForm({ ...form, tags: e.target.value })} 
              placeholder="Salary breakup, Increments, Hiring budget..."
            />
          </div>
          {/* <div className="space-y-2">
            <Label>Source Type</Label>
            <Select 
              value={form.source_type} 
              onValueChange={(v: "internal" | "external" | "client") => setForm({ ...form, source_type: v })}
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="internal">Internal guideline</SelectItem>
                <SelectItem value="external">External standard</SelectItem>
                <SelectItem value="client">Client agreement</SelectItem>
              </SelectContent>
            </Select>
          </div> */}
          {/* <div className="space-y-2 sm:col-span-2">
            <Label>Source Mapping (comma‑sep)</Label>
            <Input 
              value={form.source_mapping} 
              onChange={(e) => setForm({ ...form, source_mapping: e.target.value })} 
              placeholder="DPDP §8, Client MSA 4.2"
            />
          </div> */}
          <div className="space-y-2 sm:col-span-2">
            <Label>Description</Label>
            <Textarea 
              rows={3} 
              value={form.description} 
              onChange={(e) => setForm({ ...form, description: e.target.value })} 
              placeholder="Detect Indian PAN and cloud secrets with contextual cues."
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Prompt / Detection Hint (for agent)</Label>
            <Textarea 
              rows={3} 
              value={form.prompt} 
              onChange={(e) => setForm({ ...form, prompt: e.target.value })} 
              placeholder="Flag Indian PAN formats and cloud secrets with context keywords like 'KYC' or 'client'."
            />
          </div>
          <div className="space-y-2">
            <Label>Mode</Label>
            <Select 
              value={form.mode} 
              onValueChange={(v: "nudge" | "soft" | "hard") => setForm({ ...form, mode: v })}
            >
              <SelectTrigger><SelectValue/></SelectTrigger>
              <SelectContent>
                {/* <SelectItem value="nudge">Nudge</SelectItem> */}
                <SelectItem value="soft">Masked</SelectItem>
                <SelectItem value="hard">Override</SelectItem>
                <SelectItem value="hard">Safe-send</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Select 
              value={form.status} 
              onValueChange={(v: "draft" | "published") => setForm({ ...form, status: v })}
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Active</SelectItem>
                <SelectItem value="published">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Version</Label>
            <Input 
              value={form.version} 
              onChange={(e) => setForm({ ...form, version: e.target.value })} 
              placeholder="1.0.0"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button disabled={!valid} onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
