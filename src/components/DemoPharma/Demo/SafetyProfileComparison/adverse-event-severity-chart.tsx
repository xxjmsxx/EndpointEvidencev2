"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export default function AdverseEventSeverityChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      const ctx = chartRef.current.getContext("2d")

      if (ctx) {
        // Data from the provided image
        const grades = ["1", "2", "3", "4", "5"]

        const keytrudaChemoData = [57.5, 27.5, 12.9, 2.1, 0.0]
        const keytrudaTrodelvyData = [49.0, 25.7, 22.0, 3.3, 0.0]

        chartInstance.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: grades,
            datasets: [
              {
                label: "Keytruda + Chemotherapy", // Updated label
                data: keytrudaChemoData,
                backgroundColor: "rgb(220, 220, 220)", // Light grey to match the other chart
                barPercentage: 0.7,
                categoryPercentage: 0.8,
              },
              {
                label: "Keytruda + Trodelvy",
                data: keytrudaTrodelvyData,
                backgroundColor: "rgb(0, 102, 255)", // Blue to match the other chart
                barPercentage: 0.7,
                categoryPercentage: 0.8,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: "x",
            scales: {
              x: {
                grid: {
                  display: false,
                },
                border: {
                  display: true,
                },
                title: {
                  display: true,
                  text: "Grade",
                  font: {
                    size: 14,
                    weight: "bold",
                  },
                  padding: {
                    top: 10,
                  },
                },
              },
              y: {
                beginAtZero: true,
                max: 60, // Match the scale in the image
                title: {
                  display: true,
                  text: "Percentage of Adverse Events (%)",
                  font: {
                    size: 14,
                    weight: "bold",
                  },
                  padding: {
                    bottom: 10,
                  },
                },
                grid: {
                  display: true,
                },
                border: {
                  display: false,
                },
                ticks: {
                  callback: (value) => `${value}`,
                },
              },
            },
            plugins: {
              legend: {
                position: "bottom", // Match the legend position of the other chart
                align: "center",
                labels: {
                  usePointStyle: false,
                  padding: 20,
                  font: {
                    size: 14,
                  },
                  boxWidth: 15,
                },
              },
              tooltip: {
                callbacks: {
                  label: (context) => `${context.dataset.label}: ${context.raw}%`,
                },
              },
              title: {
                display: true,
                text: "Adverse Event Severity Distribution by Treatment",
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

        // Add custom rendering for data labels
        const originalDraw = chartInstance.current.draw
        chartInstance.current.draw = function (...args) {
          originalDraw.apply(this, args)

          const ctx = this.ctx
          const meta0 = this.getDatasetMeta(0)
          const meta1 = this.getDatasetMeta(1)

          ctx.save()
          ctx.font = "10px Arial"
          ctx.textAlign = "center"
          ctx.textBaseline = "bottom"

          // Draw data labels for Keytruda+Chemotherapy
          meta0.data.forEach((bar, index) => {
            const data = keytrudaChemoData[index]
            if (data > 0) {
              // Only show labels for non-zero values
              ctx.fillStyle = "#333"
              ctx.fillText(`${data}%`, bar.x, bar.y - 5)
            }
          })

          // Draw data labels for Keytruda+Trodelvy
          meta1.data.forEach((bar, index) => {
            const data = keytrudaTrodelvyData[index]
            if (data > 0) {
              // Only show labels for non-zero values
              ctx.fillStyle = "#333"
              ctx.fillText(`${data}%`, bar.x, bar.y - 5)
            }
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
    </div>
  )
}
