"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export default function AdverseEventsChart() {
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
        const adverseEvents = [
          "Alopecia",
          "Anemia",
          "Constipation",
          "Decreased appetite",
          "Diarrhea",
          "Fatigue",
          "Nausea",
          "Neutropenia",
          "Rash",
          "Vomiting",
        ]

        const keytrudaChemoData = [18.4, 27.3, 28.1, 23.4, 23.0, 43.8, 43.4, 30.5, 21.9, 27.0]

        const keytrudaTrodelvyData = [22.8, 30.9, 16.2, 29.7, 35.5, 59.8, 48.6, 37.8, 21.2, 20.8]

        chartInstance.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: adverseEvents,
            datasets: [
              {
                label: "Keytruda + Chemotherapy",
                data: keytrudaChemoData,
                backgroundColor: "rgb(220, 220, 220)", // Light grey to match the Balance Improvement chart
                barPercentage: 0.7,
                categoryPercentage: 0.8,
              },
              {
                label: "Keytruda + Trodelvy",
                data: keytrudaTrodelvyData,
                backgroundColor: "rgb(0, 102, 255)", // Blue to match the Balance Improvement chart
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
                  text: "Adverse Event Type",
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
                max: 70, // Match the scale in the image
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
                position: "bottom", // Match the legend position of the Balance Improvement chart
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
                text: "Top 10 Adverse Events by Treatment",
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

          // Draw data labels for Keytruda+Chemotherapy
          meta0.data.forEach((bar, index) => {
            const data = this.data.datasets[0].data[index]
            ctx.fillText(`${data}%`, bar.x, bar.y - 5)
          })

          // Draw data labels for Keytruda+Trodelvy
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
