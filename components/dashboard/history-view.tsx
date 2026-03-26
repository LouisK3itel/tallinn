"use client"

import { CheckCircle2, XCircle, Filter, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { InspectionRecord } from "./production-log"
import { useState } from "react"

interface HistoryViewProps {
  records: InspectionRecord[]
}

export function HistoryView({ records }: HistoryViewProps) {
  const [filter, setFilter] = useState<"all" | "pass" | "fail">("all")

  const filteredRecords = records.filter((record) => {
    if (filter === "all") return true
    if (filter === "pass") return record.passed
    if (filter === "fail") return !record.passed
    return true
  })

  const passCount = records.filter((r) => r.passed).length
  const failCount = records.filter((r) => !r.passed).length
  const passRate = records.length > 0 ? ((passCount / records.length) * 100).toFixed(1) : "0"

  return (
    <div className="flex flex-col gap-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-6">
          <p className="text-sm text-muted-foreground mb-2">Total Inspections</p>
          <p className="text-4xl font-bold font-mono text-foreground">{records.length}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <p className="text-sm text-muted-foreground mb-2">Passed</p>
          <p className="text-4xl font-bold font-mono text-success">{passCount}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <p className="text-sm text-muted-foreground mb-2">Failed</p>
          <p className="text-4xl font-bold font-mono text-destructive">{failCount}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <p className="text-sm text-muted-foreground mb-2">Pass Rate</p>
          <p className="text-4xl font-bold font-mono text-primary">{passRate}%</p>
        </div>
      </div>

      {/* Filter & Export */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <span className="font-medium text-foreground">Filter Records</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "default" : "secondary"}
              className="h-12 touch-manipulation"
              onClick={() => setFilter("all")}
            >
              All
            </Button>
            <Button
              variant={filter === "pass" ? "default" : "secondary"}
              className="h-12 touch-manipulation"
              onClick={() => setFilter("pass")}
            >
              Passed
            </Button>
            <Button
              variant={filter === "fail" ? "default" : "secondary"}
              className="h-12 touch-manipulation"
              onClick={() => setFilter("fail")}
            >
              Failed
            </Button>
          </div>
        </div>

        {filteredRecords.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No inspection records found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                    Sheet #
                  </th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                    Timestamp
                  </th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                    Operator
                  </th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="border-b border-border/50">
                    <td className="py-4 px-2 font-mono font-bold text-foreground">
                      #{record.sheetNumber.toLocaleString()}
                    </td>
                    <td className="py-4 px-2 text-sm text-muted-foreground">
                      {record.timestamp.toLocaleString()}
                    </td>
                    <td className="py-4 px-2 text-foreground">{record.operatorName}</td>
                    <td className="py-4 px-2">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium",
                          record.passed
                            ? "bg-success/10 text-success"
                            : "bg-destructive/10 text-destructive"
                        )}
                      >
                        {record.passed ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <XCircle className="w-4 h-4" />
                        )}
                        {record.passed ? "Pass" : "Fail"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {records.length > 0 && (
          <div className="mt-6 pt-6 border-t border-border">
            <Button variant="outline" className="h-12 gap-2 touch-manipulation">
              <Download className="w-5 h-5" />
              Export to CSV
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
