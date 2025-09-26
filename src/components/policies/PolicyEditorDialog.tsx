import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Save, ChevronDown, X } from 'lucide-react';
import type { PolicyData, PolicyForm } from '../../types';
// import { randId } from '../../utils/helpers';
import { cn } from '@/lib/utils';

interface PolicyEditorDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  save: (policy: PolicyData) => void;
  initial?: PolicyData;
}

// MultiSelect Component
interface MultiSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
}

function MultiSelect({ value, onChange, options, placeholder = "Select options...", className }: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  const handleRemove = (optionValue: string) => {
    onChange(value.filter(v => v !== optionValue));
  };

  return (
    <div className={cn("relative", className)} ref={selectRef}>
      <button
        type="button"
        className="flex h-auto min-h-[2.5rem] w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => setOpen(!open)}
      >
        <div className="flex flex-wrap gap-1">
          {value.length === 0 ? (
            <span className="text-muted-foreground">{placeholder}</span>
          ) : (
            value.map((val) => {
              const option = options.find(opt => opt.value === val);
              return (
                <Badge key={val} variant="secondary" className="gap-1">
                  {option?.label || val}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(val);
                    }}
                  />
                </Badge>
              );
            })
          )}
        </div>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>
      
      {open && (
        <div className="absolute top-full z-50 mt-1 w-full rounded-md border bg-popover text-popover-foreground shadow-md">
          <div className="p-1">
            {options.map((option) => (
              <div
                key={option.value}
                className="flex items-center space-x-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer"
                onClick={() => handleToggle(option.value)}
              >
                <Checkbox
                  checked={value.includes(option.value)}
                  onCheckedChange={() => handleToggle(option.value)}
                />
                <span>{option.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function PolicyEditorDialog({ open, setOpen, save, initial }: PolicyEditorDialogProps) {
  const [form, setForm] = useState<PolicyForm>({
    name: "",
    // author: "",
    tags: "",
    // source_type: "internal",
    // source_mapping: "",
    description: "",
    prompt: "",
    mode: ["mask"],
    version: "1.0.0",
    status: "inactive"
  });

  useEffect(() => {
    if (open) {
      if (initial) {
        // Edit existing policy
        setForm({
          name: initial.name,
          // author: initial.author,
          tags: initial.tags.join(", "),
          // source_type: initial.source_type,
          // source_mapping: initial.source_mapping.join(", "),
          description: initial.description,
          prompt: initial.prompt,
          mode: Array.isArray(initial.mode) ? initial.mode : ["mask"],
          version: initial.version,
          status: initial.status,
        });
      } else {
        // Create new policy
        setForm({
          name: "",
          // author: "",
          tags: "",
          // source_type: "internal",
          // source_mapping: "",
          description: "",
          prompt: "",
          mode: ["mask"],
          version: "1.0.0",
          status: "inactive"
        });
      }
    }
  }, [initial, open]);

  function handleSave() {
    const tags = String(form.tags || "").split(",").map((s) => s.trim()).filter(Boolean);
    
    const payload: PolicyData = {
      id: initial?.id, // Use existing ID for edit, generate new for create
      name: form.name,
      tags,
      description: form.description,
      prompt: form.prompt,
      rule_logic: { 
        entities: [{ type: "PAN" }], 
        thresholds: { 
          severity: { 
            override: 30, 
            mask: 60, 
            stopped: 80 
          } 
        } 
      },
      mode: form.mode, // Now supports multiple selections
      scope: { users: ["*"], groups: ["*"], apps: ["*"] },
      exceptions: [],
      version: form.version,
      status: form.status,
    };
    
    save(payload);
    setOpen(false);
  }

  const valid = form.name.trim() && form.prompt.trim() && form.mode.length > 0;

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
            <MultiSelect
              value={form.mode}
              onChange={(value) => setForm({ ...form, mode: value })}
              options={[
                { value: "override", label: "Override" },
                { value: "mask", label: "Mask" },
                { value: "stopped", label: "Stopped" }
              ]}
              placeholder="Select modes..."
            />
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Select 
              value={form.status} 
              onValueChange={(v: "inactive" | "active") => setForm({ ...form, status: v })}
            >
              <SelectTrigger><SelectValue placeholder="Select status..." /></SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
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
