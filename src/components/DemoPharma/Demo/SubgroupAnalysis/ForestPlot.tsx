"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

// Forest plot data
const forestPlotData = [
  { subgroup: "Overall", hr: 0.82, lowerCI: 0.61, upperCI: 1.09, pValue: 0.1768 },
  { subgroup: "Age < 65", hr: 0.89, lowerCI: 0.73, upperCI: 1.09, pValue: 0.4845 },
  { subgroup: "Age ≥ 65", hr: 0.8, lowerCI: 0.63, upperCI: 1.03, pValue: 0.4138 },
  { subgroup: "Male", hr: 0.92, lowerCI: 0.74, upperCI: 1.09, pValue: 0.1871 },
  { subgroup: "Female", hr: 1.05, lowerCI: 0.85, upperCI: 1.25, pValue: 0.094 },
  { subgroup: "ECOG 0", hr: 0.78, lowerCI: 0.59, upperCI: 0.99, pValue: 0.3579 },
  { subgroup: "ECOG 1-2", hr: 0.78, lowerCI: 0.61, upperCI: 0.94, pValue: 0.2481 },
  { subgroup: "No prior therapy", hr: 1.06, lowerCI: 0.85, upperCI: 1.27, pValue: 0.1049 },
  { subgroup: "1-2 prior therapies", hr: 0.94, lowerCI: 0.77, upperCI: 1.1, pValue: 0.2728 },
  { subgroup: "PD-L1 50-75%", hr: 0.75, lowerCI: 0.57, upperCI: 0.91, pValue: 0.0655 },
  { subgroup: "PD-L1 ≥75%", hr: 0.9, lowerCI: 0.71, upperCI: 1.15, pValue: 0.4592 },
  { subgroup: "Adenocarcinoma", hr: 0.77, lowerCI: 0.58, upperCI: 1.02, pValue: 0.0841 },
  { subgroup: "Squamous", hr: 0.95, lowerCI: 0.71, upperCI: 1.25, pValue: 0.6903 },
]

export default function ForestPlot() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      const ctx = chartRef.current.getContext("2d")

      if (ctx) {
        // Reverse the data for proper display (bottom to top)
        const reversedData = [...forestPlotData].reverse()

        // Prepare data for the chart
        const labels = reversedData.map((item) => item.subgroup)
        const hrValues = reversedData.map((item) => item.hr)
        const lowerCIValues = reversedData.map((item) => item.lowerCI)
        const upperCIValues = reversedData.map((item) => item.upperCI)
        const pValues = reversedData.map((item) => `p=${item.pValue.toFixed(4)}`)
        const hrWithCI = reversedData.map(
          (item) => `${item.hr.toFixed(2)} (${item.lowerCI.toFixed(2)}-${item.upperCI.toFixed(2)})`,
        )

        chartInstance.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Hazard Ratio",
                data: hrValues,
                backgroundColor: "rgb(0, 102, 255)",
                borderColor: "rgb(0, 102, 255)",
                borderWidth: 2,
                pointStyle: "circle",
                barThickness: 2,
                maxBarThickness: 2,
              },
            ],
          },
          options: {
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                min: 0,
                max: 4.0,
                grid: {
                  color: "rgba(200, 200, 200, 0.3)",
                },
                title: {
                  display: true,
                  text: "Hazard Ratio (95% CI)",
                  font: {
                    size: 14,
                    weight: "bold",
                  },
                  padding: {
                    top: 10,
                  },
                },
                ticks: {
                  stepSize: 0.5,
                },
              },
              y: {
                grid: {
                  display: false,
                },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                enabled: true,
                callbacks: {
                  label: (context) => {
                    const index = context.dataIndex
                    const item = reversedData[index]
                    return [
                      `HR: ${item.hr.toFixed(2)} (${item.lowerCI.toFixed(2)}-${item.upperCI.toFixed(2)})`,
                      `p-value: ${item.pValue.toFixed(4)}`,
                    ]
                  },
                },
              },
              title: {
                display: true,
                text: "Subgroup Analysis of Overall Survival",
                font: {
                  size: 18,
                  weight: "bold",
                },
                padding: {
                  bottom: 30,
                },
              },
            },
          },
        })

        // Add custom error bars, reference line, and text labels
        const originalDraw = chartInstance.current.draw
        chartInstance.current.draw = function (...args) {
          originalDraw.apply(this, args)

          const ctx = this.ctx
          const meta = this.getDatasetMeta(0)

          // Draw reference line at HR = 1.0
          const xScale = this.scales.x
          const yScale = this.scales.y
          const x = xScale.getPixelForValue(1.0)

          ctx.save()
          ctx.strokeStyle = "rgba(0, 0, 0, 0.5)"
          ctx.setLineDash([5, 5])
          ctx.beginPath()
          ctx.moveTo(x, yScale.top)
          ctx.lineTo(x, yScale.bottom)
          ctx.stroke()
          ctx.restore()

          // Draw error bars
          ctx.save()
          ctx.strokeStyle = "rgb(0, 102, 255)"
          ctx.lineWidth = 2

          meta.data.forEach((dataPoint, index) => {
            const lowerCI = lowerCIValues[index]
            const upperCI = upperCIValues[index]

            const centerY = dataPoint.y

            const leftX = xScale.getPixelForValue(lowerCI)
            const rightX = xScale.getPixelForValue(upperCI)

            // Horizontal line for confidence interval
            ctx.beginPath()
            ctx.moveTo(leftX, centerY)
            ctx.lineTo(rightX, centerY)
            ctx.stroke()

            // Left cap
            ctx.beginPath()
            ctx.moveTo(leftX, centerY - 5)
            ctx.lineTo(leftX, centerY + 5)
            ctx.stroke()

            // Right cap
            ctx.beginPath()
            ctx.moveTo(rightX, centerY - 5)
            ctx.lineTo(rightX, centerY + 5)
            ctx.stroke()
          })

          // Add HR and p-value text
          ctx.textAlign = "right"
          ctx.textBaseline = "middle"
          ctx.font = "11px Arial"

          meta.data.forEach((dataPoint, index) => {
            const centerY = dataPoint.y
            const rightEdge = xScale.getPixelForValue(4.0)

            // Draw HR with CI
            ctx.fillText(hrWithCI[index], rightEdge - 100, centerY)

            // Draw p-value
            ctx.fillText(pValues[index], rightEdge - 10, centerY)
          })

          ctx.restore()
        }
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="h-[500px]">
        <canvas ref={chartRef}></canvas>
      </div>

      <div className="mt-4 flex justify-between text-sm text-gray-600">
        <div>Favors Keytruda+Trodelvy</div>
        <div>Favors Keytruda+Chemo</div>
      </div>
    </div>
  )
}
