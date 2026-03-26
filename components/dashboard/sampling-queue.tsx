"use client"

import { ClipboardCheck, FileStack } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface QueuedSheet {
  id: string
  sheetNumber: number
  ejectedAt: Date
}

interface SamplingQueueProps {
  queue: QueuedSheet[]
  onInspect: (sheet: QueuedSheet) => void
}

export function SamplingQueue({ queue, onInspect }: SamplingQueueProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-muted-foreground font-medium text-sm uppercase tracking-wider">
          Active Sampling Queue
        </h3>
        <div className="flex items-center gap-2">
          <FileStack className="w-5 h-5 text-primary" />
          <span className="text-primary font-bold">{queue.length}</span>
        </div>
      </div>

      {queue.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <ClipboardCheck className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No sheets awaiting inspection</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3 max-h-64 overflow-y-auto">
          {queue.map((sheet) => (
            <div
              key={sheet.id}
              className="flex items-center justify-between p-4 bg-secondary rounded-lg"
            >
              <div>
                <p className="font-bold text-foreground font-mono">
                  Sheet #{sheet.sheetNumber.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  {sheet.ejectedAt.toLocaleTimeString()}
                </p>
              </div>
              <Button
                onClick={() => onInspect(sheet)}
                className="h-12 px-6 touch-manipulation"
              >
                Inspect
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
