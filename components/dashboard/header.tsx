"use client"

import { Clock, User } from "lucide-react"
import { useEffect, useState } from "react"

interface HeaderProps {
  shiftStatus: "active" | "break" | "ended"
}

export function Header({ shiftStatus }: HeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const statusConfig = {
    active: { label: "Shift Active", color: "bg-success text-success-foreground" },
    break: { label: "On Break", color: "bg-warning text-warning-foreground" },
    ended: { label: "Shift Ended", color: "bg-muted text-muted-foreground" },
  }

  const status = statusConfig[shiftStatus]

  return (
    <header className="h-16 lg:h-20 bg-card border-b border-border flex items-center justify-between px-4 lg:px-8">
      <div className="flex items-center gap-4">
        <h2 className="text-lg lg:text-xl font-bold text-foreground">
          Paper Printing QC System
        </h2>
      </div>

      <div className="flex items-center gap-4 lg:gap-6">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-5 h-5" />
          <span className="font-mono text-sm lg:text-base">
            {currentTime.toLocaleTimeString()}
          </span>
        </div>
        
        <div className={`px-3 lg:px-4 py-2 rounded-lg font-semibold text-sm ${status.color}`}>
          {status.label}
        </div>
        
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary">
          <User className="w-5 h-5 text-muted-foreground" />
          <span className="hidden lg:block text-sm text-foreground">Operator</span>
        </div>
      </div>
    </header>
  )
}
