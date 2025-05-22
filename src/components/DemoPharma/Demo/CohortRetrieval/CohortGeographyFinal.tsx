"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export default function GeographicDistributionFinalChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    const countries = [
      "Spain",
      "Germany",
      "Italy",
      "France",
      "Netherlands",
      "Sweden",
      "Hungary",
      "Norway",
    ]

    const finalPatients = [562, 519, 375, 201, 154, 146, 99, 86]

    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d")
      if (ctx) {
        if (chartInstance.current) chartInstance.current.destroy()

        chartInstance.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: countries,
            datasets: [
              {
                label: "Patients",
                data: finalPatients,
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
                grid: { display: false },
                border: { display: true },
                title: {
                  display: true,
                  text: "Country",
                  font: { size: 14, weight: "bold" },
                  padding: { top: 10 },
                },
              },
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Number of Patients",
                  font: { size: 14, weight: "bold" },
                  padding: { bottom: 10 },
                },
                grid: { display: true },
                border: { display: false },
                ticks: {
                  callback: (value) => `${value}`,
                },
              },
            },
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: (context) => `${context.raw} patients`,
                },
              },
              title: {
                display: true,
                text: "Final Study Cohort (2,142 patients)",
                font: { size: 18, weight: "bold" },
                padding: { bottom: 30 },
              },
            },
          },
        })

        // Draw labels
        const originalDraw = chartInstance.current.draw
        chartInstance.current.draw = function (...args) {
          originalDraw.apply(this, args)
          const ctx = this.ctx
          const meta = this.getDatasetMeta(0)
          ctx.save()
          ctx.font = "10px Arial"
          ctx.textAlign = "center"
          ctx.textBaseline = "bottom"
          ctx.fillStyle = "#333"
          meta.data.forEach((bar, i) => {
            ctx.fillText(`${finalPatients[i]}`, bar.x, bar.y - 5)
          })
          ctx.restore()
        }
      }
    }

    return () => {
      if (chartInstance.current) chartInstance.current.destroy()
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
