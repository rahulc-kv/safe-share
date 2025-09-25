/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// Placeholder components for complex UI elements
// TODO: Replace with proper shadcn/ui components

import React, { useState, useRef, useEffect } from 'react'
import { cn } from "@/lib/utils"

// Tabs
export const Tabs = ({ children, value, onValueChange, ...props }: any) => {
  const [activeTab, setActiveTab] = React.useState(value)
  
  React.useEffect(() => {
    setActiveTab(value)
  }, [value])

  const handleTabChange = (newValue: string) => {
    setActiveTab(newValue)
    onValueChange?.(newValue)
  }

  return (
    <div {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === TabsList) {
            return React.cloneElement(child as React.ReactElement<any>, { 
              activeTab,
              onTabChange: handleTabChange
            })
          }
          if (child.type === TabsContent) {
            return React.cloneElement(child as React.ReactElement<any>, { 
              activeTab
            })
          }
        }
        return child
      })}
    </div>
  )
}

export const TabsList = ({ children, className, activeTab, onTabChange, ...props }: any) => (
  <div 
    className={cn("inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground", className)} 
    {...props}
  >
    {React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.type === TabsTrigger) {
        return React.cloneElement(child as React.ReactElement<any>, { 
          activeTab,
          onTabChange
        })
      }
      return child
    })}
  </div>
)

export const TabsTrigger = ({ children, value, className, activeTab, onTabChange, ...props }: any) => {
  const isActive = activeTab === value
  
  return (
    <button 
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isActive ? "bg-background text-foreground shadow-sm" : "",
        className
      )}
      onClick={() => onTabChange?.(value)}
      {...props}
    >
      {children}
    </button>
  )
}

export const TabsContent = ({ children, value, className, activeTab, ...props }: any) => {
  if (activeTab !== value) return null
  
  return (
    <div className={cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className)} {...props}>
      {children}
    </div>
  )
}

// Select (with proper state management)
export const Select = ({ children, value, onValueChange, ...props }: any) => {
  const [open, setOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={selectRef} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === SelectTrigger) {
            return React.cloneElement(child as React.ReactElement<any>, { 
              onClick: () => setOpen(!open),
              'data-state': open ? 'open' : 'closed'
            })
          }
          if (child.type === SelectContent) {
            return React.cloneElement(child as React.ReactElement<any>, { 
              open,
              onClose: () => setOpen(false),
              onValueChange: (val: string) => {
                onValueChange?.(val)
                setOpen(false)
              }
            })
          }
        }
        return child
      })}
    </div>
  )
}

export const SelectTrigger = ({ children, className, onClick, ...props }: any) => (
  <button 
    className={cn("flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className)}
    onClick={onClick}
    {...props}
  >
    {children}
    <svg
      className="h-4 w-4 opacity-50"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </button>
)

export const SelectValue = ({ placeholder, value, children, ...props }: any) => {
  // Find the selected item's text from children
  const getSelectedText = () => {
    if (children) {
      return children
    }
    return placeholder
  }

  return (
    <span {...props}>{getSelectedText()}</span>
  )
}

export const SelectContent = ({ children, open, onClose, onValueChange, ...props }: any) => {
  if (!open) return null

  return (
    <div className="absolute top-full z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md mt-1" {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === SelectItem) {
          return React.cloneElement(child as React.ReactElement<any>, { 
            onClick: () => onValueChange?.((child as React.ReactElement<any>).props.value)
          })
        }
        return child
      })}
    </div>
  )
}

export const SelectItem = ({ children, value, onClick, ...props }: any) => (
  <div 
    className="relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground" 
    onClick={onClick}
    {...props}
  >
    {children}
  </div>
)

// Dialog (simplified)
export const Dialog = ({ children, open, onOpenChange, ...props }: any) => (
  open ? <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" {...props}>{children}</div> : null
)

export const DialogContent = ({ children, className, ...props }: any) => (
  <div className={cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg", className)} {...props}>
    {children}
  </div>
)

export const DialogHeader = ({ children, className, ...props }: any) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props}>
    {children}
  </div>
)

export const DialogTitle = ({ children, className, ...props }: any) => (
  <h2 className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props}>
    {children}
  </h2>
)

export const DialogDescription = ({ children, className, ...props }: any) => (
  <p className={cn("text-sm text-muted-foreground", className)} {...props}>
    {children}
  </p>
)

export const DialogFooter = ({ children, className, ...props }: any) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props}>
    {children}
  </div>
)

export const DialogTrigger = ({ children, ...props }: any) => (
  <div {...props}>{children}</div>
)

// Sheet (simplified)
export const Sheet = ({ children, open, onOpenChange, ...props }: any) => (
  open ? <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" {...props}>{children}</div> : null
)

export const SheetContent = ({ children, side = "right", className, ...props }: any) => (
  <div className={cn("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out", side === "right" && "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm", className)} {...props}>
    {children}
  </div>
)

export const SheetHeader = ({ children, className, ...props }: any) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props}>
    {children}
  </div>
)

export const SheetTitle = ({ children, className, ...props }: any) => (
  <h2 className={cn("text-lg font-semibold text-foreground", className)} {...props}>
    {children}
  </h2>
)

export const SheetDescription = ({ children, className, ...props }: any) => (
  <p className={cn("text-sm text-muted-foreground", className)} {...props}>
    {children}
  </p>
)

export const SheetTrigger = ({ children, ...props }: any) => (
  <div {...props}>{children}</div>
)

// Dropdown Menu (simplified)
export const DropdownMenu = ({ children, ...props }: any) => (
  <div className="relative" {...props}>{children}</div>
)

export const DropdownMenuTrigger = ({ children, asChild, ...props }: any) => (
  <div {...props}>{children}</div>
)

export const DropdownMenuContent = ({ children, align = "start", className, ...props }: any) => (
  <div className={cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg", className)} {...props}>
    {children}
  </div>
)

export const DropdownMenuItem = ({ children, className, ...props }: any) => (
  <div className={cn("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground", className)} {...props}>
    {children}
  </div>
)

export const DropdownMenuSeparator = ({ className, ...props }: any) => (
  <div className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />
)

export const DropdownMenuLabel = ({ children, className, ...props }: any) => (
  <div className={cn("px-2 py-1.5 text-sm font-semibold", className)} {...props}>
    {children}
  </div>
)

export const DropdownMenuCheckboxItem = ({ children, ...props }: any) => (
  <div {...props}>{children}</div>
)

// Switch (simplified)
export const Switch = ({ checked, onCheckedChange, className, ...props }: any) => (
  <button 
    className={cn("peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50", checked ? "bg-primary" : "bg-input", className)}
    onClick={() => onCheckedChange && onCheckedChange(!checked)}
    {...props}
  >
    <span className={cn("pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform", checked ? "translate-x-5" : "translate-x-0")} />
  </button>
)

// Tooltip (simplified)
export const TooltipProvider = ({ children, ...props }: any) => (
  <div {...props}>{children}</div>
)

export const Tooltip = ({ children, ...props }: any) => (
  <div {...props}>{children}</div>
)

export const TooltipTrigger = ({ children, ...props }: any) => (
  <div {...props}>{children}</div>
)

export const TooltipContent = ({ children, ...props }: any) => (
  <div {...props}>{children}</div>
)

// Checkbox (simplified)
export const Checkbox = ({ checked, onCheckedChange, className, ...props }: any) => (
  <input 
    type="checkbox" 
    checked={checked}
    onChange={(e) => onCheckedChange && onCheckedChange(e.target.checked)}
    className={cn("h-4 w-4 rounded border border-primary text-primary focus:ring-2 focus:ring-primary", className)}
    {...props}
  />
)

// Popover (simplified)
export const Popover = ({ children, ...props }: any) => (
  <div {...props}>{children}</div>
)

export const PopoverTrigger = ({ children, ...props }: any) => (
  <div {...props}>{children}</div>
)

export const PopoverContent = ({ children, className, ...props }: any) => (
  <div className={cn("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none", className)} {...props}>
    {children}
  </div>
)
