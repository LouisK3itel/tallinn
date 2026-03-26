"use client"

import { Minus, Plus, Settings2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SamplingConfigProps {
  interval: number
  onIntervalChange: (value: number) => void
}

export function SamplingConfig({ interval, onIntervalChange }: SamplingConfigProps) {
  const adjustInterval = (delta: number) => {
    const newValue = Math.max(100, Math.min(5000, interval + delta))
    onIntervalChange(newValue)
  }

  const presets = [250, 500, 1000, 2000]

  return (
    <div className="bg-card border border-border rounded-xl p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-muted-foreground font-medium text-sm uppercase tracking-wider">
          Sampling Interval
        </h3>
        <Settings2 className="w-6 h-6 text-primary" />
      </div>

      <div className="flex items-center justify-center gap-4 mb-6">
        <Button
          variant="outline"
          size="icon"
          className="w-14 h-14 rounded-xl touch-manipulation"
          onClick={() => adjustInterval(-100)}
        >
          <Minus className="w-6 h-6" />
        </Button>
        
        <div className="flex-1 text-center">
          <div className="text-4xl lg:text-5xl font-bold font-mono text-foreground">
            {interval.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            every Nth sheet
          </div>
        </div>
        
        <Button
          variant="outline"
          size="icon"
          className="w-14 h-14 rounded-xl touch-manipulation"
          onClick={() => adjustInterval(100)}
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {presets.map((preset) => (
          <Button
            key={preset}
            variant={interval === preset ? "default" : "secondary"}
            className="h-12 touch-manipulation"
            onClick={() => onIntervalChange(preset)}
          >
            {preset}
          </Button>
        ))}
      </div>
    </div>
  )
}
