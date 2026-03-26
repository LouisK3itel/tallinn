"use client"

import { LayoutDashboard, History, Settings, Printer } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "history", label: "History", icon: History },
  { id: "settings", label: "Settings", icon: Settings },
]

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="w-20 lg:w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-4 lg:p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <Printer className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="hidden lg:block">
            <h1 className="font-bold text-sidebar-foreground text-lg">PrintQC</h1>
            <p className="text-xs text-muted-foreground">Quality Control</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-2 lg:p-4">
        <ul className="flex flex-col gap-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-4 rounded-lg transition-colors touch-manipulation",
                  "text-sidebar-foreground",
                  activeTab === item.id
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "hover:bg-sidebar-accent/50"
                )}
              >
                <item.icon className={cn(
                  "w-6 h-6 mx-auto lg:mx-0",
                  activeTab === item.id ? "text-primary" : ""
                )} />
                <span className="hidden lg:block font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-2 lg:p-4 border-t border-sidebar-border">
        <div className="text-xs text-muted-foreground hidden lg:block">
          <p>System v2.4.1</p>
        </div>
      </div>
    </aside>
  )
}
