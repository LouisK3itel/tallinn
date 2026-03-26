"use client"

import { Wifi, WifiOff, Cog, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface SystemStatusProps {
  sensorConnected: boolean
  diverterStatus: "ready" | "active" | "error"
}

export function SystemStatus({ sensorConnected, diverterStatus }: SystemStatusProps) {
  const diverterConfig = {
    ready: { label: "Ready", color: "text-success", bgColor: "bg-success/10" },
    active: { label: "Active", color: "text-primary", bgColor: "bg-primary/10" },
    error: { label: "Error", color: "text-destructive", bgColor: "bg-destructive/10" },
  }

  const diverter = diverterConfig[diverterStatus]

  return (
    <div className="bg-card border border-border rounded-xl p-6 lg:p-8">
      <h3 className="text-muted-foreground font-medium text-sm uppercase tracking-wider mb-6">
        System Status
      </h3>

      <div className="flex flex-col gap-4">
        <div className={cn(
          "flex items-center justify-between p-4 rounded-lg",
          sensorConnected ? "bg-success/10" : "bg-destructive/10"
        )}>
          <div className="flex items-center gap-3">
            {sensorConnected ? (
              <Wifi className="w-6 h-6 text-success" />
            ) : (
              <WifiOff className="w-6 h-6 text-destructive" />
            )}
            <div>
              <p className="font-semibold text-foreground">IoT Sensor</p>
              <p className="text-sm text-muted-foreground">
                {sensorConnected ? "Connected" : "Disconnected"}
              </p>
            </div>
          </div>
          <div className={cn(
            "w-3 h-3 rounded-full",
            sensorConnected ? "bg-success animate-pulse" : "bg-destructive"
          )} />
        </div>

        <div className={cn(
          "flex items-center justify-between p-4 rounded-lg",
          diverter.bgColor
        )}>
          <div className="flex items-center gap-3">
            {diverterStatus === "error" ? (
              <AlertCircle className={cn("w-6 h-6", diverter.color)} />
            ) : (
              <Cog className={cn(
                "w-6 h-6",
                diverter.color,
                diverterStatus === "active" && "animate-spin"
              )} />
            )}
            <div>
              <p className="font-semibold text-foreground">Sheet Diverter</p>
              <p className="text-sm text-muted-foreground">{diverter.label}</p>
            </div>
          </div>
          <div className={cn(
            "w-3 h-3 rounded-full",
            diverterStatus === "ready" && "bg-success",
            diverterStatus === "active" && "bg-primary animate-pulse",
            diverterStatus === "error" && "bg-destructive"
          )} />
        </div>
      </div>
    </div>
  )
}
