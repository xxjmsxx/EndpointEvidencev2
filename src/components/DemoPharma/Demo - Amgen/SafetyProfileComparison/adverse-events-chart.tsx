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
        // Updated data for the new comparison
        const adverseEvents = [
          "Diarrhea",
          "Rash",
          "Fatigue",
          "Nausea",
          "Stomatitis",
          "Decreased appetite",
          "Anemia",
          "Hypomagnesemia",
          "Skin reactions",
          "Abdominal pain",
        ]

        const lumykrasVectibixData = [32.4, 28.6, 35.2, 26.7, 18.9, 22.3, 19.5, 15.7, 24.8, 17.3]

        const krazatiErbituxData = [38.5, 31.2, 42.7, 29.3, 15.8, 26.8, 22.1, 18.9, 27.4, 19.6]

        chartInstance.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: adverseEvents,
            datasets: [
              {
                label: "Lumykras + Vectibix",
                data: lumykrasVectibixData,
                backgroundColor: "rgb(220, 220, 220)", // Light grey to match the Balance Improvement chart
                barPercentage: 0.7,
                categoryPercentage: 0.8,
              },
              {
                label: "Krazati + Erbitux",
                data: krazatiErbituxData,
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
                max: 50, // Match the scale in the image
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

          // Draw data labels for Lumykras+Vectibix
          meta0.data.forEach((bar, index) => {
            const data = this.data.datasets[0].data[index]
            ctx.fillText(`${data}%`, bar.x, bar.y - 5)
          })

          // Draw data labels for Krazati+Erbitux
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
