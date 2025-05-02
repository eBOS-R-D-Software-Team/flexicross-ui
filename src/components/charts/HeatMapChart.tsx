"use client"

import { Modal, Tooltip, Typography, Collapse } from "antd"
import { useMemo, useState } from "react"

const { Text } = Typography
const { Panel } = Collapse

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
  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleCancel = () => {
    setSelectedCell(null)
    setIsModalVisible(false)
  }

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
    return (
      <div style={{ minWidth: 120 }}>
        {Object.entries(cellData).map(([riskType, count]) => (
          <div key={riskType} style={{ padding: "4px 0" }}>
            <Text strong>{count}</Text> {riskType}
          </div>
        ))}
        <Text type="secondary" style={{ fontSize: 12, display: 'block', marginTop: 4 }}>Click for details</Text>
      </div>
    )
  }

  const handleCellClick = (row: string, col: string) => {
    setSelectedCell({ row, col })
    setIsModalVisible(true)
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
                    onClick={() => handleCellClick(row, col)}
                  >
                    {count}
                    {hasTooltip && isHovered && (
                      <Tooltip
                        title={buildTooltipContent(cellTooltipData)}
                        open={true}
                        placement={
                          rowIndex === 0 ? 'bottom' : 
                          rowIndex === rows.length - 1 ? 'top' : 
                          colIndex === columns.length - 1 ? 'left' : 
                          colIndex === 0 ? 'right' : 'top'
                        }
                        color="white"
                        overlayInnerStyle={{ color: 'black', padding: 12, border: '1px solid #002353', }}
                        arrow={false}
                      />
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

      <Modal
        title={`Detailed Risks for ${selectedCell?.row || ''} - ${selectedCell?.col || ''}`}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width="80%"
        style={{ maxWidth: '1024px' }}
      >
        {selectedCell && (
          <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            {(cellRisks[`${selectedCell.row}-${selectedCell.col}`] || []).length === 0 ? (
              <Text type="secondary">No detailed risks in this cell.</Text>
            ) : (
              <Collapse bordered={false}>
                {cellRisks[`${selectedCell.row}-${selectedCell.col}`].map((risk) => (
                  <Panel 
                    key={risk.id} 
                    header={`${risk.riskType} — ${new Date(risk.datetime).toLocaleString()}`}
                    style={{ 
                      marginBottom: 16, 
                      border: '2px solid #32c7c1',
                      color: '#002353',
                      borderRadius: 8,
                      overflow: 'hidden'
                    }}
                  >
                    <div style={{ padding: 16 }}>
                      <div><Text strong>ID:</Text> {risk.id}</div>
                      <div><Text strong>Severity:</Text> {severityMapping[risk.severity]}</div>
                      <div><Text strong>Probability:</Text> {probabilityMapping[risk.probability]}</div>
                      {risk.metrics?.map((metric) => (
                        <div key={metric.key}>
                          <Text strong>{metric.description}:</Text> {metric.value} {metric.unit}
                        </div>
                      ))}
                    </div>
                  </Panel>
                ))}
              </Collapse>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}