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
      <div key={riskType} className="py-1 text-xs whitespace-nowrap text-start">
        {count} {riskType}
      </div>
    ))
  }

  const buildModal = (row: string, col: string) => {
    const cellKey = `${row}-${col}`
    const risksInCell = cellRisks[cellKey] || []
    console.log(risksInCell)

    return (
      <div className="fixed inset-0 z-40 bg-black bg-opacity-30 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto w-full max-w-4xl relative">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-black"
            onClick={() => setSelectedCell(null)}
          >
            ✕
          </button>
          <h2 className="text-lg font-semibold mb-4 text-[#002353]">
            Detailed Risks for {row} - {col}
          </h2>
          {risksInCell.length === 0 ? (
            <p className="text-sm text-gray-500">No detailed risks in this cell.</p>
          ) : (
            risksInCell.map((risk) => (
              <details key={risk.id} className="mb-4 border-2 border-[#32c7c1] text-[#002353] p-4 rounded-lg">
                <summary className="cursor-pointer font-medium">
                  {risk.riskType} — {new Date(risk.datetime).toLocaleString()}
                </summary>
                <div className="mt-2 space-y-2 text-sm text-[#002353] ">
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
    <div className="w-full relative overflow-auto">
      <div className="flex justify-end mb-1">
        <div className="text-sm text-gray-500">Total of Risk Rating</div>
      </div>

      <table className="w-full border-collapse">
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={row}>
              <th className="p-2 text-left font-normal">{row}</th>
              {columns.map((col, colIndex) => {
                const count = heatmapData[row]?.[colIndex] || 0
                const cellTooltipData = tooltipData[row]?.[col] || {}
                const isHovered = hoveredCell?.row === row && hoveredCell?.col === col
                const hasTooltip = Object.keys(cellTooltipData).length > 0

                return (
                  <td
                    key={col}
                    className="relative border p-2 text-center font-medium  cursor-pointer"
                    style={{
                      backgroundColor: getCellColor(rowIndex, colIndex),
                      color: "#ffffff",
                    }}
                    onMouseEnter={() => hasTooltip && setHoveredCell({ row, col })}
                    onMouseLeave={() => setHoveredCell(null)}
                    onClick={() => setSelectedCell({ row, col })}
                  >
                    {count}
                    {hasTooltip && isHovered && (
                      <div className="absolute z-20 bg-white text-black text-xs rounded-lg shadow-lg p-2 mt-2 left-1/2 transform -translate-x-1/2">
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
            <th className="p-2"></th>
            {columns.map((col) => (
              <th key={col} className="p-2 text-center font-normal">
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
