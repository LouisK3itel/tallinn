"use client"

import { FileText, TrendingUp } from "lucide-react"

interface LiveCounterProps {
  count: number
  rate: number
}

export function LiveCounter({ count, rate }: LiveCounterProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 lg:p-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-muted-foreground font-medium text-sm uppercase tracking-wider">
          Current Sheet Count
        </h3>
        <FileText className="w-6 h-6 text-primary" />
      </div>
      
      <div className="flex items-end gap-4">
        <span className="text-5xl lg:text-7xl font-bold text-foreground font-mono tracking-tight">
          {count.toLocaleString()}
        </span>
      </div>
      
      <div className="mt-4 flex items-center gap-2 text-muted-foreground">
        <TrendingUp className="w-4 h-4 text-success" />
        <span className="text-sm">
          <span className="text-success font-semibold">{rate}</span> sheets/min
        </span>
      </div>
    </div>
  )
}
