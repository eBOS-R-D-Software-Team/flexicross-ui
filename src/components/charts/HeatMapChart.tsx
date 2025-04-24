"use client"

import { useMemo, useState } from "react"

type HeatmapData = {
  [key: string]: number[]
}

type TooltipData = {
  [key: string]: { [key: string]: { [riskType: string]: number } }
}

type RiskData = {
  id: string
  datetime: string
  type: string
  riskType: string
  severity: string
  probability: string
  involvedObjects?: any[]
  location?: any
  trackingDetection?: any
  faceDetection?: any
  metrics?: any[]
  metadata?: any[]
}

const probabilityMapping: { [key: string]: string } = {
  Rare: "Rare",
  AlmostImprobable: "Almost Improbable",
  Occasional: "Occasional",
  Frequent: "Frequent",
  HighlyProbable: "Highly Probable",
  VeryProbable: "Very Probable",
}

const severityMapping: { [key: string]: string } = {
  PotentialOBUMisoperation: "Potential OBU",
  HighSeverity: "High",
  MediumSeverity: "Medium",
  LowSeverity: "Low",
  NegligableSeverity: "Negligible",
  NoSeverity: "No Severity",
}

const columns = ["Rare", "Almost Improbable", "Occasional", "Frequent", "Highly Probable", "Very Probable"]
const rows = ["Potential OBU", "High", "Medium", "Low", "Negligible", "No Severity"]

export default function HeatMapChart({ data }: any) {
  const risks: RiskData[] = data.data
  const [hoveredCell, setHoveredCell] = useState<{ row: string, col: string } | null>(null)
  const [selectedCell, setSelectedCell] = useState<{ row: string, col: string } | null>(null)

  const { heatmapData, tooltipData, cellRisks } = useMemo(() => {
    const initialData: HeatmapData = {}
    const initialTooltips: TooltipData = {}
    const risksByCell: { [key: string]: RiskData[] } = {}

    rows.forEach(row => {
      initialData[row] = new Array(columns.length).fill(0)
      initialTooltips[row] = {}
      columns.forEach(col => {
        initialTooltips[row][col] = {}
        risksByCell[`${row}-${col}`] = []
      })
    })

    risks.forEach((risk: RiskData) => {
      const mappedSeverity = severityMapping[risk.severity]
      const mappedProbability = probabilityMapping[risk.probability]

      if (mappedSeverity && mappedProbability) {
        const colIndex = columns.indexOf(mappedProbability)
        if (colIndex !== -1) {
          initialData[mappedSeverity][colIndex]++
          const columnName = columns[colIndex]
          initialTooltips[mappedSeverity][columnName][risk.riskType] =
            (initialTooltips[mappedSeverity][columnName][risk.riskType] || 0) + 1
          risksByCell[`${mappedSeverity}-${columnName}`].push(risk)
        }
      }
    })

    return { heatmapData: initialData, tooltipData: initialTooltips, cellRisks: risksByCell }
  }, [risks])

  const getCellColor = (rowIndex: number, colIndex: number) => {
    const rowPercent = rowIndex / (rows.length - 1)
    const colPercent = colIndex / (columns.length - 1)
    const riskScore = (1 - rowPercent + colPercent) / 2

    if (riskScore < 0.1) return "#d9f99d"
    if (riskScore < 0.2) return "#34d399"
    if (riskScore < 0.3) return "#10b981"
    if (riskScore < 0.4) return "#059669"
    if (riskScore < 0.5) return "#065f46"
    if (riskScore < 0.6) return "#eab308"
    if (riskScore < 0.65) return "#f59e0b"
    if (riskScore < 0.7) return "#f97316"
    if (riskScore < 0.75) return "#fb923c"
    if (riskScore < 0.8) return "#ef4444"
    if (riskScore < 0.9) return "#dc2626"
    if (riskScore < 0.95) return "#991b1b"
    return "#7c2d12"
  }

  const buildTooltipContent = (cellData: { [riskType: string]: number }) => {
    return Object.entries(cellData).map(([riskType, count]) => (
      <div key={riskType}  style={{ padding: "0.25rem 0", fontSize: "0.75rem", whiteSpace: "nowrap", textAlign: "left" }}>
        {count} {riskType}
      </div>
    ))
  }

  const buildModal = (row: string, col: string) => {
    const cellKey = `${row}-${col}`
    const risksInCell = cellRisks[cellKey] || []
    console.log(risksInCell)

    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 40, backgroundColor: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ backgroundColor: "#fff", padding: 24, borderRadius: 8, boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)", maxHeight: "90vh", overflowY: "auto", width: "100%", maxWidth: "64rem", position: "relative" }}>
          <button
            style={{ position: "absolute", top: 8, right: 8, color: "#6b7280", background: "none", border: "none", cursor: "pointer" }}
            onClick={() => setSelectedCell(null)}
          >
            ✕
          </button>
          <h2 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: 16, color: "#002353" }}>
            Detailed Risks for {row} - {col}
          </h2>
          {risksInCell.length === 0 ? (
            <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>No detailed risks in this cell.</p>
          ) : (
            risksInCell.map((risk) => (
              <details key={risk.id} style={{ marginBottom: 16, border: "2px solid #32c7c1", color: "#002353", padding: 16, borderRadius: 8 }}>
                <summary style={{ cursor: "pointer", fontWeight: 500 }}>
                  {risk.riskType} — {new Date(risk.datetime).toLocaleString()}
                </summary>
                <div style={{ marginTop: 8, fontSize: "0.875rem" }}>
                  <div><strong>ID:</strong> {risk.id}</div>
                  <div><strong>Severity:</strong> {severityMapping[risk.severity]}</div>
                  <div><strong>Probability:</strong> {probabilityMapping[risk.probability]}</div>
                  {risk.metrics?.map((metric) => (
                    <div key={metric.key}>
                      <strong>{metric.description}:</strong> {metric.value} {metric.unit}
                    </div>
                  ))}   
                </div>
              </details>
            ))
          )}
        </div>
      </div>
    )
  }

  return (
    <div style={{ width: "100%", position: "relative", overflow: "auto" }}>
    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 4 }}>
      <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Total of Risk Rating</div>
    </div>

    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={row}>
            <th style={{ padding: 8, textAlign: "left", fontWeight: "normal" }}>{row}</th>
            {columns.map((col, colIndex) => {
              const count = heatmapData[row]?.[colIndex] || 0
              const cellTooltipData = tooltipData[row]?.[col] || {}
              const isHovered = hoveredCell?.row === row && hoveredCell?.col === col
              const hasTooltip = Object.keys(cellTooltipData).length > 0

              return (
                <td
                  key={col}
                  style={{
                    position: "relative",
                    border: "1px solid #ccc",
                    padding: 8,
                    textAlign: "center",
                    fontWeight: 500,
                    cursor: "pointer",
                    backgroundColor: getCellColor(rowIndex, colIndex),
                    color: "#ffffff"
                  }}
                  onMouseEnter={() => hasTooltip && setHoveredCell({ row, col })}
                  onMouseLeave={() => setHoveredCell(null)}
                  onClick={() => setSelectedCell({ row, col })}
                >
                  {count}
                  {hasTooltip && isHovered && (
                    <div style={{ position: "absolute", zIndex: 20, backgroundColor: "#fff", color: "#000", fontSize: "0.75rem", borderRadius: 8, boxShadow: "0 4px 6px rgba(0,0,0,0.1)", padding: 8, marginTop: 8, left: "50%", transform: "translateX(-50%)" }}>
                      {buildTooltipContent(cellTooltipData)}
                    </div>
                  )}
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th style={{ padding: 8 }}></th>
          {columns.map((col) => (
            <th key={col} style={{ padding: 8, textAlign: "center", fontWeight: "normal" }}>
              {col}
            </th>
          ))}
        </tr>
      </tfoot>
    </table>

    {selectedCell && buildModal(selectedCell.row, selectedCell.col)}
  </div>
  )
}
