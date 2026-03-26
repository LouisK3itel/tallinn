"use client"

import { useState } from "react"
import { Wifi, Save, RotateCcw, Volume2, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function SettingsView() {
  const [sensorIp, setSensorIp] = useState("192.168.1.100")
  const [sensorPort, setSensorPort] = useState("8080")
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [alertsEnabled, setAlertsEnabled] = useState(true)

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      {/* Connection Settings */}
      <div className="bg-card border border-border rounded-xl p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6">
          <Wifi className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Connection Settings</h2>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              IoT Sensor IP Address
            </label>
            <Input
              value={sensorIp}
              onChange={(e) => setSensorIp(e.target.value)}
              placeholder="192.168.1.100"
              className="h-14 text-lg font-mono touch-manipulation"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Port
            </label>
            <Input
              value={sensorPort}
              onChange={(e) => setSensorPort(e.target.value)}
              placeholder="8080"
              className="h-14 text-lg font-mono touch-manipulation"
            />
          </div>
          <Button className="h-14 gap-2 touch-manipulation">
            <Save className="w-5 h-5" />
            Save Connection Settings
          </Button>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-card border border-border rounded-xl p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Notifications</h2>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => setAudioEnabled(!audioEnabled)}
            className={cn(
              "flex items-center justify-between p-4 rounded-lg border touch-manipulation",
              audioEnabled ? "border-primary bg-primary/10" : "border-border bg-secondary"
            )}
          >
            <div className="flex items-center gap-3">
              <Volume2 className={cn("w-6 h-6", audioEnabled ? "text-primary" : "text-muted-foreground")} />
              <div className="text-left">
                <p className="font-semibold text-foreground">Audio Alerts</p>
                <p className="text-sm text-muted-foreground">Sound on sheet ejection</p>
              </div>
            </div>
            <div className={cn(
              "w-12 h-7 rounded-full transition-colors flex items-center px-1",
              audioEnabled ? "bg-primary justify-end" : "bg-muted justify-start"
            )}>
              <div className="w-5 h-5 bg-foreground rounded-full" />
            </div>
          </button>

          <button
            onClick={() => setAlertsEnabled(!alertsEnabled)}
            className={cn(
              "flex items-center justify-between p-4 rounded-lg border touch-manipulation",
              alertsEnabled ? "border-primary bg-primary/10" : "border-border bg-secondary"
            )}
          >
            <div className="flex items-center gap-3">
              <Bell className={cn("w-6 h-6", alertsEnabled ? "text-primary" : "text-muted-foreground")} />
              <div className="text-left">
                <p className="font-semibold text-foreground">Visual Alerts</p>
                <p className="text-sm text-muted-foreground">Flash screen on errors</p>
              </div>
            </div>
            <div className={cn(
              "w-12 h-7 rounded-full transition-colors flex items-center px-1",
              alertsEnabled ? "bg-primary justify-end" : "bg-muted justify-start"
            )}>
              <div className="w-5 h-5 bg-foreground rounded-full" />
            </div>
          </button>
        </div>
      </div>

      {/* System Actions */}
      <div className="bg-card border border-border rounded-xl p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6">
          <RotateCcw className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold text-foreground">System Actions</h2>
        </div>

        <div className="flex flex-col gap-4">
          <Button variant="outline" className="h-14 gap-2 touch-manipulation justify-start">
            <RotateCcw className="w-5 h-5" />
            Reset Sheet Counter
          </Button>
          <Button variant="outline" className="h-14 gap-2 touch-manipulation justify-start text-destructive hover:text-destructive">
            Clear All Records
          </Button>
        </div>
      </div>

      {/* System Info */}
      <div className="bg-card border border-border rounded-xl p-6 lg:p-8">
        <h2 className="text-xl font-bold text-foreground mb-6">System Information</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Software Version</p>
            <p className="font-mono text-foreground">v2.4.1</p>
          </div>
          <div>
            <p className="text-muted-foreground">Last Updated</p>
            <p className="font-mono text-foreground">2026-03-20</p>
          </div>
          <div>
            <p className="text-muted-foreground">Device ID</p>
            <p className="font-mono text-foreground">PQC-001-FACTORY-A</p>
          </div>
          <div>
            <p className="text-muted-foreground">License</p>
            <p className="font-mono text-foreground">Enterprise</p>
          </div>
        </div>
      </div>
    </div>
  )
}
