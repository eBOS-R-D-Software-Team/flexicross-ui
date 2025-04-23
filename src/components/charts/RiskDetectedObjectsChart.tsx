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
      <div className="bg-white p-3 border rounded-lg shadow-md">
        <p className="font-medium text-sm">{data.type}</p>
        <p className="text-sm text-gray-700">{data.percentage.toFixed(1)}% ({data.count} objects)</p>
        <p className="text-xs text-gray-500 mt-1">Click for details</p>
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
    <div className="w-full">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium mb-4 text-center">Risk Distribution by Object Type</h3>

        <div className="w-full h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }} barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="type" angle={-45} textAnchor="end" height={60} tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={(v) => `${v}%`} domain={[0, Math.ceil(Math.max(...data.map(d => d.percentage)) / 10) * 10]} />
              <RechartsTooltip content={<CustomBarTooltip />} cursor={{ fill: "rgba(0, 0, 0, 0.05)" }} />
              <Legend verticalAlign="top" height={36} formatter={(v) => <span className="text-sm">{v}</span>} />
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
          <div className="space-y-4">
            <div className="text-base mb-2">
              {selectedData.percentage.toFixed(1)}% of all objects are {selectedData.type.toLowerCase()}
            </div>
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
              {selectedData.risks.map((risk, index) => (
                <details
                  key={index}
                  className="border border-teal-300 rounded-lg p-3"
                  open={index === 0}
                >
                  <summary className="cursor-pointer font-semibold text-blue-900">
                    ▾ UTurnVehicle — {risk.datetime ? new Date(risk.datetime).toLocaleString() : "Unknown Time"}
                  </summary>
                  <div className="mt-2 text-sm space-y-1 pl-2">
                    <p><strong>ID:</strong> {risk.id}</p>
                    <p><strong>Risk Type:</strong> {risk.riskType}</p>
                    <p><strong>Visual ID:</strong> {risk.visualId}</p>
                   
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
