import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts"
import { Modal } from "antd"

// Interfaces
interface InvolvedObject {
  type: string
  visualId: string | number
  location?: any
  role?: string
  metadata?: any[]
}

interface Risk {
  id: string
  datetime: string
  type: string
  riskType: string
  severity: string
  probability: string
  involvedObjects: InvolvedObject[]
  location?: any
  trackingDetection?: any
  faceDetection?: any
  metrics?: any[]
  metadata?: any[]
  
}

interface ChartData {
  type: string
  count: number
  percentage: number
  risks: {
    id: string
    riskType: string
    severity: string
    probability: string
    metrics?: any[]
    visualId: string | number
    datetime?: string
    metadata?: any[]
  }[]
  
}

const COLORS = [
  "#0f766e", "#0369a1", "#4338ca", "#7e22ce", "#be185d",
  "#b45309", "#15803d", "#b91c1c", "#4d7c0f", "#0f172a"
]

// Process data
const processRisksData = (risksData: Risk[]): ChartData[] => {
  const typeCounts: Record<string, { count: number, risks: ChartData["risks"] }> = {}
  let totalObjects = 0
console.log(risksData)
  risksData.forEach((risk) => {
    if (risk.involvedObjects) {
      risk.involvedObjects.forEach((obj) => {
        const objectType = obj.type
        if (!typeCounts[objectType]) {
          typeCounts[objectType] = { count: 0, risks: [] }
        }

        typeCounts[objectType].count++
        totalObjects++
        typeCounts[objectType].risks.push({
          id: risk.id,
          riskType: risk.riskType,
          visualId: obj.visualId,
          datetime: risk.datetime,
          metadata: obj.metadata,
          severity: risk.severity,
          probability: risk.probability,
          metrics:risk.metrics
          
        })
      })
    }
  })

  return Object.entries(typeCounts)
    .map(([type, data]) => ({
      type,
      count: data.count,
      percentage: totalObjects > 0 ? (data.count / totalObjects) * 100 : 0,
      risks: data.risks,
    }))
    .sort((a, b) => b.percentage - a.percentage)
}

// Tooltip
const CustomBarTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div style={{
        backgroundColor: "white",
        padding: "12px",
        border: "1px solid #d1d5db",
        borderRadius: "0.5rem",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        fontSize: "0.875rem"
      }}>
        <p style={{ fontWeight: "500" }}>{data.type}</p>
        <p style={{ color: "#374151" }}>{data.percentage.toFixed(1)}% ({data.count} objects)</p>
        <p style={{ marginTop: "0.25rem", color: "#6b7280", fontSize: "0.75rem" }}>Click for details</p>
      </div>
    )
  }
  return null
}

export default function ObjectTypePercentageBarChart({ risksData }: { risksData: Risk[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedData, setSelectedData] = useState<ChartData | null>(null)
console.log(selectedData)
  const data = processRisksData(risksData)

  const handleBarClick = (entry: any) => {
    const clickedData = data.find((item) => item.type === entry.type)
    if (clickedData) {
      setSelectedData(clickedData)
      setIsModalOpen(true)
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
     <div style={{ width: "100%" }}>
      <div style={{
        backgroundColor: "white",
        padding: "16px",
        borderRadius: "0.5rem",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
      }}>
        <h3 style={{ fontSize: "1.125rem", fontWeight: "500", marginBottom: "1rem", textAlign: "center" }}>
          Risk Distribution by Object Type
        </h3>

        <div style={{ width: "100%", height: "450px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }} barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="type" angle={-45} textAnchor="end" height={60} tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={(v) => `${v}%`} domain={[0, Math.ceil(Math.max(...data.map(d => d.percentage)) / 10) * 10]} />
              <RechartsTooltip content={<CustomBarTooltip />} cursor={{ fill: "rgba(0, 0, 0, 0.05)" }} />
              <Legend verticalAlign="top" height={36} formatter={(v) => <span style={{ fontSize: "0.875rem" }}>{v}</span>} />
              <Bar
                dataKey="percentage"
                name="Percentage of Total"
                onClick={handleBarClick}
                cursor="pointer"
                label={{ position: "top", formatter: (v: number) => `${v.toFixed(1)}%`, fontSize: 12 }}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <Modal title={`${selectedData?.type} Objects`} open={isModalOpen} onCancel={handleCancel} footer={null} width={600}>
        {selectedData && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ fontSize: "1rem" }}>
              <span style={{ fontWeight: "500" }}>{selectedData.percentage.toFixed(1)}%</span> of all objects are{" "}
              <span style={{ fontWeight: "500" }}>{selectedData.type.toLowerCase()}</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem 1rem", fontSize: "0.875rem" }}>
              <div style={{ color: "#4b5563", fontWeight: "600" }}>Object Type:</div>
              <div style={{ fontWeight: "600" }}>{selectedData.type}</div>
              <div style={{ color: "#4b5563", fontWeight: "600" }}>Count:</div>
              <div style={{ fontWeight: "600" }}>{selectedData.count}</div>
              <div style={{ color: "#4b5563", fontWeight: "600" }}>Percentage:</div>
              <div style={{ fontWeight: "600" }}>{selectedData.percentage.toFixed(1)}%</div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxHeight: "300px", overflowY: "auto", paddingRight: "0.5rem" }}>
              <div style={{ fontWeight: "600", color: "#1f2937" }}>Associated Risks:</div>
              {selectedData.risks.map((risk, index) => (
                <details key={index} style={{ border: "1px solid #14b8a6", borderRadius: "0.5rem", padding: "0.75rem" }} open={index === 0}>
                  <summary style={{ cursor: "pointer", fontWeight: "600", color: "#1e3a8a" }}>
                    ▾ UTurnVehicle — {risk.datetime ? new Date(risk.datetime).toLocaleString() : "Unknown Time"}
                  </summary>
                  <div style={{ marginTop: "0.5rem", fontSize: "0.875rem", paddingLeft: "0.5rem", display: "flex", flexDirection: "column" }}>
                    <p style={{margin:"unset"}}><strong>ID:</strong> {risk.id}</p>
                    <p style={{margin:"unset"}}><strong>Risk Type:</strong> {risk.riskType}</p>
                    <p style={{margin:"unset"}}><strong>Visual ID:</strong> {risk.visualId}</p>
                    <p style={{margin:"unset"}}><strong>Risk Severity:</strong> {risk.severity}</p>
                    <p style={{margin:"unset"}}><strong>Risk Probability:</strong> {risk.probability}</p>
                    {risk.metrics?.map((metric) => (
                      <div key={metric.key}>
                        <strong>{metric.description}:</strong> {metric.value} {metric.unit}
                      </div>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
