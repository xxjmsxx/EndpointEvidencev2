"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export default function TreatmentDistributionChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing chart instance if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      const ctx = chartRef.current.getContext("2d")

      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: "doughnut",
          data: {
            labels: ["Lumykras + Vectibix (n=591)", "Krazati + Erbitux (n=478)"],
            datasets: [
              {
                data: [55.3, 44.7],
                backgroundColor: ["rgb(0, 102, 255)", "rgb(220, 220, 220)"],
                borderColor: ["rgb(0, 102, 255)", "rgb(220, 220, 220)"],
                borderWidth: 1,
                hoverOffset: 10,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: "70%", // Changed from 80% to 70% to make the donut hole smaller
            plugins: {
              legend: {
                position: "bottom",
                align: "center",
                labels: {
                  usePointStyle: false,
                  padding: 20,
                  font: {
                    size: 14,
                  },
                  boxWidth: 15,
                  generateLabels: (chart) => {
                    const data = chart.data
                    if (data.labels && data.datasets.length) {
                      return data.labels.map((label, i) => {
                        return {
                          text: `${label}`, // Removed the percentage part
                          fillStyle: Array.isArray(data.datasets[0].backgroundColor) ? data.datasets[0].backgroundColor[i] : data.datasets[0].backgroundColor,
                          strokeStyle: Array.isArray(data.datasets[0].borderColor) ? data.datasets[0].borderColor[i] : data.datasets[0].borderColor,
                          lineWidth: 1,
                          hidden: false,
                          index: i,
                        }
                      })
                    }
                    return []
                  },
                },
              },
              tooltip: {
                callbacks: {
                  label: (context) => `${context.label}: ${context.raw}%`,
                },
              },
              title: {
                display: true,
                text: "Treatment Distribution in Cohort Retrieved (N=1,069)",
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

        // Update the custom draw function to place percentages directly in the donut segments
        // Add data labels inside the doughnut
        const originalDraw = chartInstance.current.draw
        chartInstance.current.draw = function (...args) {
          originalDraw.apply(this, args)

          const ctx = this.ctx
          const meta = this.getDatasetMeta(0)

          ctx.save()
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"

          meta.data.forEach((element, index) => {
            const data = this.data.datasets[0].data[index]
            const centerX = element.x
            const centerY = element.y
            // Define a type for the arc element
            type ArcElement = { startAngle: number; endAngle: number; innerRadius: number; outerRadius: number }
            const arc = element as unknown as ArcElement
            const angle = arc.startAngle + (arc.endAngle - arc.startAngle) / 2

            // Calculate position for the label (in the middle of the donut segment)
            const radius = (arc.innerRadius + arc.outerRadius) / 2
            const labelX = centerX + Math.cos(angle) * radius
            const labelY = centerY + Math.sin(angle) * radius

            // Set text color based on background
            ctx.fillStyle = index === 0 ? "#ffffff" : "#333333"
            ctx.font = "bold 16px Arial" // Increased font size for better visibility
            ctx.fillText(`${data}%`, labelX, labelY)
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
      <div className="h-[400px]">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  )
}
