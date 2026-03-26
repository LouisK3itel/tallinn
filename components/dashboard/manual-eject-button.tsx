"use client"

import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ManualEjectButtonProps {
  onEject: () => void
  disabled?: boolean
}

export function ManualEjectButton({ onEject, disabled }: ManualEjectButtonProps) {
  return (
    <Button
      onClick={onEject}
      disabled={disabled}
      variant="destructive"
      className="w-full h-16 text-lg font-bold touch-manipulation gap-3"
    >
      <AlertTriangle className="w-6 h-6" />
      Manual Eject
    </Button>
  )
}
