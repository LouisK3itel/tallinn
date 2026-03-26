"use client"

import { useState, useEffect, useCallback } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { LiveCounter } from "@/components/dashboard/live-counter"
import { SamplingConfig } from "@/components/dashboard/sampling-config"
import { SystemStatus } from "@/components/dashboard/system-status"
import { SamplingQueue, type QueuedSheet } from "@/components/dashboard/sampling-queue"
import { InspectionForm } from "@/components/dashboard/inspection-form"
import { ProductionLog, type InspectionRecord } from "@/components/dashboard/production-log"
import { ManualEjectButton } from "@/components/dashboard/manual-eject-button"
import { HistoryView } from "@/components/dashboard/history-view"
import { SettingsView } from "@/components/dashboard/settings-view"

export default function QualityControlDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [sheetCount, setSheetCount] = useState(47832)
  const [samplingInterval, setSamplingInterval] = useState(500)
  const [productionRate, setProductionRate] = useState(125)
  const [sensorConnected, setSensorConnected] = useState(true)
  const [diverterStatus, setDiverterStatus] = useState<"ready" | "active" | "error">("ready")
  const [queue, setQueue] = useState<QueuedSheet[]>([])
  const [inspectionRecords, setInspectionRecords] = useState<InspectionRecord[]>([])
  const [selectedSheet, setSelectedSheet] = useState<QueuedSheet | null>(null)
  const [lastEjectedSheet, setLastEjectedSheet] = useState(0)

  // Simulate real-time sheet counting
  useEffect(() => {
    const interval = setInterval(() => {
      setSheetCount((prev) => {
        const newCount = prev + Math.floor(Math.random() * 3) + 1
        return newCount
      })
      setProductionRate(120 + Math.floor(Math.random() * 20))
    }, 500)

    return () => clearInterval(interval)
  }, [])

  // Auto-eject sheets based on sampling interval
  const ejectSheet = useCallback((sheetNumber: number) => {
    const newSheet: QueuedSheet = {
      id: `sheet-${sheetNumber}`,
      sheetNumber,
      ejectedAt: new Date(),
    }
    setQueue((prev) => [...prev, newSheet])
    setDiverterStatus("active")
    setTimeout(() => setDiverterStatus("ready"), 1000)
  }, [])

  useEffect(() => {
    const nextEjectAt = Math.ceil(lastEjectedSheet / samplingInterval) * samplingInterval + samplingInterval
    if (sheetCount >= nextEjectAt && sheetCount !== lastEjectedSheet) {
      const sheetToEject = Math.floor(sheetCount / samplingInterval) * samplingInterval
      if (sheetToEject > lastEjectedSheet) {
        ejectSheet(sheetToEject)
        setLastEjectedSheet(sheetToEject)
      }
    }
  }, [sheetCount, samplingInterval, lastEjectedSheet, ejectSheet])

  const handleManualEject = () => {
    ejectSheet(sheetCount)
    setLastEjectedSheet(sheetCount)
  }

  const handleInspect = (sheet: QueuedSheet) => {
    setSelectedSheet(sheet)
  }

  const handleInspectionSubmit = (result: {
    operatorName: string
    passed: boolean
    timestamp: Date
  }) => {
    if (!selectedSheet) return

    const record: InspectionRecord = {
      id: `record-${selectedSheet.sheetNumber}`,
      sheetNumber: selectedSheet.sheetNumber,
      timestamp: result.timestamp,
      operatorName: result.operatorName,
      passed: result.passed,
    }

    setInspectionRecords((prev) => [record, ...prev])
    setQueue((prev) => prev.filter((s) => s.id !== selectedSheet.id))
    setSelectedSheet(null)
  }

  // Simulate occasional sensor disconnection
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.02) {
        setSensorConnected(false)
        setTimeout(() => setSensorConnected(true), 3000)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header shiftStatus="active" />
        
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          {activeTab === "dashboard" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
              {/* Main Counter - Full Width on Mobile, 2/3 on Desktop */}
              <div className="lg:col-span-2">
                <LiveCounter count={sheetCount} rate={productionRate} />
              </div>
              
              {/* System Status */}
              <div className="lg:col-span-1">
                <SystemStatus
                  sensorConnected={sensorConnected}
                  diverterStatus={diverterStatus}
                />
              </div>
              
              {/* Sampling Config */}
              <div className="lg:col-span-1">
                <SamplingConfig
                  interval={samplingInterval}
                  onIntervalChange={setSamplingInterval}
                />
              </div>
              
              {/* Sampling Queue */}
              <div className="lg:col-span-1">
                <SamplingQueue queue={queue} onInspect={handleInspect} />
              </div>
              
              {/* Manual Eject Button */}
              <div className="lg:col-span-1">
                <div className="bg-card border border-border rounded-xl p-6 lg:p-8">
                  <h3 className="text-muted-foreground font-medium text-sm uppercase tracking-wider mb-4">
                    Emergency Controls
                  </h3>
                  <ManualEjectButton
                    onEject={handleManualEject}
                    disabled={diverterStatus === "active"}
                  />
                </div>
              </div>
              
              {/* Production Log - Full Width */}
              <div className="lg:col-span-3">
                <ProductionLog records={inspectionRecords} />
              </div>
            </div>
          )}
          
          {activeTab === "history" && (
            <HistoryView records={inspectionRecords} />
          )}
          
          {activeTab === "settings" && (
            <SettingsView />
          )}
        </main>
      </div>
      
      {/* Inspection Form Modal */}
      {selectedSheet && (
        <InspectionForm
          sheet={selectedSheet}
          onSubmit={handleInspectionSubmit}
          onClose={() => setSelectedSheet(null)}
        />
      )}
    </div>
  )
}
