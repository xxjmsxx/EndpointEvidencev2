"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export default function AgeDistributionChart() {
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
            labels: ["<55", "55-64", "65-74", "≥75"],
            datasets: [
              {
                label: "Lumykras + Vectibix (n=591)",
                data: [12.3, 40.0, 40.4, 7.3],
                backgroundColor: "rgb(0, 102, 255)",
                barPercentage: 0.7,
                categoryPercentage: 0.8,
              },
              {
                label: "Krazati + Erbitux (n=478)",
                data: [6.2, 30.0, 47.3, 16.5],
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
                title: {
                  display: true,
                  text: "Age Group",
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
                max: 50,
                title: {
                  display: true,
                  text: "Percentage of Patients (%)",
                  font: {
                    size: 14,
                    weight: "bold",
                  },
                  padding: {
                    bottom: 10,
                  },
                },
                ticks: {
                  callback: (value) => `${value}`,
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
                  label: (context) => `${context.dataset.label}: ${context.raw}%`,
                },
              },
              title: {
                display: true,
                text: "Age Distribution in Cohort Retrieved (N=1,069)",
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
          ctx.font = "10px Arial"
          ctx.textAlign = "center"
          ctx.textBaseline = "bottom"
          ctx.fillStyle = "#333"

          // Draw data labels for Lumykras + Vectibix
          meta0.data.forEach((bar, index) => {
            const data = this.data.datasets[0].data[index]
            ctx.fillText(`${data}%`, bar.x, bar.y - 5)
          })

          // Draw data labels for Krazati + Erbitux
          meta1.data.forEach((bar, index) => {
            const data = this.data.datasets[1].data[index]
            ctx.fillText(`${data}%`, bar.x, bar.y - 5)
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
