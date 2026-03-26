"use client"

import { CheckCircle2, XCircle, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

export interface InspectionRecord {
  id: string
  sheetNumber: number
  timestamp: Date
  operatorName: string
  passed: boolean
}

interface ProductionLogProps {
  records: InspectionRecord[]
}

export function ProductionLog({ records }: ProductionLogProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-muted-foreground font-medium text-sm uppercase tracking-wider">
          Production Log
        </h3>
        <FileText className="w-5 h-5 text-primary" />
      </div>

      {records.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>No inspection records yet</p>
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
              {records.map((record) => (
                <tr key={record.id} className="border-b border-border/50">
                  <td className="py-4 px-2 font-mono font-bold text-foreground">
                    #{record.sheetNumber.toLocaleString()}
                  </td>
                  <td className="py-4 px-2 text-sm text-muted-foreground">
                    {record.timestamp.toLocaleString()}
                  </td>
                  <td className="py-4 px-2 text-foreground">
                    {record.operatorName}
                  </td>
                  <td className="py-4 px-2">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium",
                      record.passed
                        ? "bg-success/10 text-success"
                        : "bg-destructive/10 text-destructive"
                    )}>
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
    </div>
  )
}
