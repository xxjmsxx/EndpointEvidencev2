"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export default function BalanceImprovementChart() {
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
            labels: [
              "Age",
              "Prior Chemotherapy",
              "Prior Lines",
              "Heart Disease",
              "Former Smoker",
              "Hypertension",
              "ECOG Score",
              "Never Smoker",
              "Gender (Male)",
              "Diabetes",
              "COPD",
            ],
            datasets: [
              {
                label: "Before Matching",
                data: [0.275, 0.235, 0.172, 0.112, 0.033, 0.03, 0.025, 0.025, 0.01, 0.005, 0.005],
                backgroundColor: "rgb(220, 220, 220)",
                barPercentage: 0.7,
                categoryPercentage: 0.8,
              },
              {
                label: "After Matching",
                data: [0.35, 0.167, 0.07, 0.125, 0.015, 0.015, 0.025, 0.06, 0.015, 0.045, 0.095],
                backgroundColor: "rgb(0, 102, 255)",
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
                  text: "Variable",
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
                max: 0.4,
                title: {
                  display: true,
                  text: "Standardized Mean Difference",
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
                  callback: (value) => Number(value).toFixed(2),
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
                text: "Standardized Mean Difference After Propensity Score Matching",
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

          // Draw data labels for Before Matching
          meta0.data.forEach((bar, index) => {
            const data = this.data.datasets[0].data[index]
            if (typeof data === "number") {
              ctx.fillText(data.toFixed(2), bar.x, bar.y - 5)
            }
          })

          // Draw data labels for After Matching
          meta1.data.forEach((bar, index) => {
            const data = this.data.datasets[1].data[index]
            if (typeof data === "number") {
              ctx.fillText(data.toFixed(2), bar.x, bar.y - 5)
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
