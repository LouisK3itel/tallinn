"use client"

import { useState } from "react"
import { CheckCircle2, XCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import type { QueuedSheet } from "./sampling-queue"

interface InspectionFormProps {
  sheet: QueuedSheet
  onSubmit: (result: { operatorName: string; passed: boolean; timestamp: Date }) => void
  onClose: () => void
}

export function InspectionForm({ sheet, onSubmit, onClose }: InspectionFormProps) {
  const [operatorName, setOperatorName] = useState("")
  const [result, setResult] = useState<"pass" | "fail" | null>(null)

  const handleSubmit = () => {
    if (!operatorName || result === null) return
    onSubmit({
      operatorName,
      passed: result === "pass",
      timestamp: new Date(),
    })
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl w-full max-w-lg p-6 lg:p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Manual Inspection</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="touch-manipulation"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        <div className="bg-secondary rounded-xl p-4 mb-6">
          <p className="text-sm text-muted-foreground">Sheet ID</p>
          <p className="text-2xl font-bold font-mono text-foreground">
            #{sheet.sheetNumber.toLocaleString()}
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Operator Name
          </label>
          <Input
            value={operatorName}
            onChange={(e) => setOperatorName(e.target.value)}
            placeholder="Enter your name"
            className="h-14 text-lg touch-manipulation"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-muted-foreground mb-3">
            Inspection Result
          </label>
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className={cn(
                "h-20 text-lg font-semibold touch-manipulation",
                result === "pass" && "border-success bg-success/10 text-success"
              )}
              onClick={() => setResult("pass")}
            >
              <CheckCircle2 className="w-6 h-6 mr-2" />
              Pass
            </Button>
            <Button
              variant="outline"
              className={cn(
                "h-20 text-lg font-semibold touch-manipulation",
                result === "fail" && "border-destructive bg-destructive/10 text-destructive"
              )}
              onClick={() => setResult("fail")}
            >
              <XCircle className="w-6 h-6 mr-2" />
              Fail
            </Button>
          </div>
        </div>

        <div className="bg-secondary rounded-xl p-4 mb-6">
          <p className="text-sm text-muted-foreground">Timestamp</p>
          <p className="text-lg font-mono text-foreground">
            {new Date().toLocaleString()}
          </p>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!operatorName || result === null}
          className="w-full h-14 text-lg font-semibold touch-manipulation"
        >
          Submit Inspection
        </Button>
      </div>
    </div>
  )
}
