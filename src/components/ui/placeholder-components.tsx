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

  // Find all SelectItem children to pass to SelectValue
  const selectItems = React.Children.toArray(children).flatMap((child) => {
    if (React.isValidElement(child)) {
      const childType = child.type;
      const childTypeName = typeof childType === 'function' ? childType.name : childType;
      
      if (child.type === SelectContent || childTypeName === 'SelectContent') {
        return React.Children.toArray((child as React.ReactElement<any>).props.children).filter(
          (grandchild) => {
            if (React.isValidElement(grandchild)) {
              const grandchildType = grandchild.type;
              const grandchildTypeName = typeof grandchildType === 'function' ? grandchildType.name : grandchildType;
              return grandchild.type === SelectItem || grandchildTypeName === 'SelectItem';
            }
            return false;
          }
        )
      }
    }
    return []
  })

  return (
    <div className="relative" ref={selectRef} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          const childType = child.type;
          const childTypeName = typeof childType === 'function' ? childType.name : childType;
          
          if (child.type === SelectTrigger || childTypeName === 'SelectTrigger') {
            return React.cloneElement(child as React.ReactElement<any>, { 
              ...(child.props as any),
              onClick: () => setOpen(!open),
              'data-state': open ? 'open' : 'closed',
              value,
              selectItems
            })
          }
          if (child.type === SelectContent || childTypeName === 'SelectContent') {
            return React.cloneElement(child as React.ReactElement<any>, { 
              ...(child.props as any),
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

export const SelectTrigger = ({ children, className, onClick, value, selectItems, ...props }: any) => (
  <button 
    className={cn("flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className)}
    onClick={onClick}
    {...props}
  >
    {React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        const childType = child.type;
        const childTypeName = typeof childType === 'function' ? childType.name : childType;
        
        if (child.type === SelectValue || childTypeName === 'SelectValue') {
          return React.cloneElement(child as React.ReactElement<any>, { 
            ...(child.props as any),
            value,
            selectItems
          })
        }
      }
      return child
    })}
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

export const SelectValue = ({ placeholder, value, selectItems, children, ...props }: any) => {
  // Find the selected item's text from selectItems
  const getSelectedText = () => {
    // If explicit children provided, use them
    if (children) {
      return children
    }
    
    // Try to find from selectItems
    if (value && selectItems && Array.isArray(selectItems)) {
      const selectedItem = selectItems.find((item: any) => 
        React.isValidElement(item) && (item.props as any).value === value
      )
      if (selectedItem && React.isValidElement(selectedItem)) {
        return (selectedItem.props as any).children
      }
    }
    
    // Fallback to showing the value itself if it's a readable string
    if (value && typeof value === 'string') {
      // Capitalize first letter for better display
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
    
    return placeholder || "Select an option..."
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
        if (React.isValidElement(child)) {
          const childType = child.type;
          const childTypeName = typeof childType === 'function' ? childType.name : childType;
          
          if (child.type === SelectItem || childTypeName === 'SelectItem') {
            return React.cloneElement(child as React.ReactElement<any>, { 
              ...(child.props as any),
              onClick: () => onValueChange?.((child as React.ReactElement<any>).props.value)
            })
          }
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

// Dropdown Menu (with proper state management)
export const DropdownMenu = ({ children, ...props }: any) => {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  const closeDropdown = () => setOpen(false)

  return (
    <div className="relative" ref={dropdownRef} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          const childType = child.type;
          const childTypeName = typeof childType === 'function' ? childType.name : childType;
          
          if (child.type === DropdownMenuTrigger || childTypeName === 'DropdownMenuTrigger') {
            return React.cloneElement(child as React.ReactElement<any>, { 
              ...(child.props as any),
              open,
              setOpen,
              triggerRef
            })
          }
          if (child.type === DropdownMenuContent || childTypeName === 'DropdownMenuContent') {
            return React.cloneElement(child as React.ReactElement<any>, { 
              ...(child.props as any),
              open,
              setOpen,
              closeDropdown,
              triggerRef
            })
          }
        }
        return child
      })}
    </div>
  )
}

export const DropdownMenuTrigger = ({ children, asChild, open, setOpen, triggerRef, ...props }: any) => {
  const handleClick = () => {
    if (typeof setOpen === 'function') {
      setOpen(!open)
    } else {
      console.warn('DropdownMenuTrigger: setOpen is not a function. Make sure DropdownMenuTrigger is used within a DropdownMenu component.')
    }
  }

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      ...(children.props as any),
      ref: triggerRef,
      onClick: (e: any) => {
        handleClick()
        ;(children.props as any)?.onClick?.(e)
      }
    })
  }

  return (
    <div onClick={handleClick} ref={triggerRef} {...props}>
      {children}
    </div>
  )
}

export const DropdownMenuContent = ({ children, align = "start", className, open, setOpen, closeDropdown, triggerRef, ...props }: any) => {
  const [position, setPosition] = useState({ top: 0, left: 0 })

  useEffect(() => {
    if (open && triggerRef?.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
      
      let left = rect.left + scrollLeft
      let top = rect.bottom + scrollTop + 4 // 4px gap
      
      // Adjust for alignment
      if (align === "end") {
        left = rect.right + scrollLeft - 128 // 128px is min-w-[8rem]
      } else if (align === "center") {
        left = rect.left + scrollLeft + (rect.width / 2) - 64 // 64px is half of min-w-[8rem]
      }
      
      // Ensure dropdown doesn't go off screen
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      
      if (left + 128 > viewportWidth) {
        left = viewportWidth - 128 - 8
      }
      if (top + 200 > viewportHeight + scrollTop) {
        top = rect.top + scrollTop - 200 - 4 // Show above instead
      }
      
      setPosition({ top, left })
    }
  }, [open, align, triggerRef])

  if (!open) return null

  return (
    <div 
      className={cn(
        "fixed z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg",
        className
      )}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`
      }}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === DropdownMenuItem) {
          return React.cloneElement(child as React.ReactElement<any>, { 
            ...(child.props as any),
            closeDropdown
          })
        }
        return child
      })}
    </div>
  )
}

export const DropdownMenuItem = ({ children, className, onClick, closeDropdown, ...props }: any) => {
  const handleClick = (e: any) => {
    onClick?.(e)
    closeDropdown?.()
  }

  return (
    <div 
      className={cn("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground", className)} 
      onClick={handleClick}
      {...props}
    >
      {children}
    </div>
  )
}

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
