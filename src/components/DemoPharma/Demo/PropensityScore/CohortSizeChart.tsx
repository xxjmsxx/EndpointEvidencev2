"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export default function CohortSizeChart() {
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
          type: "bar",
          data: {
            labels: ["Before Matching", "After Matching"],
            datasets: [
              {
                label: "Keytruda + Trodelvy",
                data: [260, 260],
                backgroundColor: "rgb(0, 102, 255)",
                barPercentage: 0.7,
                categoryPercentage: 0.8,
              },
              {
                label: "Keytruda + Chemotherapy",
                data: [1882, 260],
                backgroundColor: "rgb(220, 220, 220)",
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
              },
              y: {
                beginAtZero: true,
                max: 2000,
                title: {
                  display: true,
                  text: "Number of Patients",
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
              },
            },
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
                },
              },
              tooltip: {
                callbacks: {
                  label: (context) => `${context.dataset.label}: ${context.raw}`,
                },
              },
              title: {
                display: true,
                text: "Cohort Size Before and After Matching",
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

        // Add data labels
        const originalDraw = chartInstance.current.draw
        chartInstance.current.draw = function (...args) {
          originalDraw.apply(this, args)

          const ctx = this.ctx
          const meta0 = this.getDatasetMeta(0)
          const meta1 = this.getDatasetMeta(1)

          ctx.save()
          ctx.font = "12px Arial"
          ctx.textAlign = "center"
          ctx.textBaseline = "bottom"
          ctx.fillStyle = "#333"

          // Draw data labels for Keytruda+Trodelvy
          if (meta0.data) {
            meta0.data.forEach((bar, index) => {
              const data = this.data.datasets[0].data[index]
              if (data != null) {
                ctx.fillText(data.toString(), bar.x, bar.y - 5)
              }
            })
          }

          // Draw data labels for Keytruda+Chemotherapy
          if (meta1.data) {
            meta1.data.forEach((bar, index) => {
              const data = this.data.datasets[1].data[index]
              if (data != null) {
                ctx.fillText(data.toString(), bar.x, bar.y - 5)
              }
            })
          }

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
