"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export default function PropensityScoreDistributionChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      const ctx = chartRef.current.getContext("2d")

      if (ctx) {
        // Custom data points for the distribution
        const propensityScores = [
          0, 0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.18, 0.2, 0.22, 0.24, 0.26, 0.28, 0.3, 0.32, 0.34, 0.36,
          0.38, 0.4, 0.42, 0.44, 0.46, 0.48, 0.5,
        ]

        // Steeper, less bell-curve-like distribution for Lumykras+Vectibix
        const lumykrasVectibixDensity = [
          0.01, 0.02, 0.05, 0.1, 0.2, 0.4, 0.8, 1.4, 2.2, 3.2, 4.2, 5.0, 5.5, 5.7, 5.6, 5.2, 4.5, 3.6, 2.7, 1.8, 1.1,
          0.6, 0.3, 0.15, 0.05, 0.01,
        ]

        // Krazati+Erbitux density values - similar but with more noticeable differences
        const krazatiErbituxDensity = [...lumykrasVectibixDensity].map((value, index) => {
          // Create more noticeable differences, especially around the peak
          if (index > 8 && index < 18) {
            // More variation around the peak
            return value + (Math.random() * 0.3 - 0.15)
          } else {
            // Less variation in the tails
            return value + (Math.random() * 0.1 - 0.05)
          }
        })

        chartInstance.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: propensityScores,
            datasets: [
              // Line charts only (no bar charts)
              {
                label: "Lumykras+Vectibix", // Updated label
                data: lumykrasVectibixDensity,
                borderColor: "rgb(220, 220, 220)", // Light grey
                backgroundColor: "transparent",
                fill: false,
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 0,
                order: 1,
              },
              {
                label: "Krazati+Erbitux",
                data: krazatiErbituxDensity,
                borderColor: "rgb(0, 102, 255)", // Blue
                backgroundColor: "transparent",
                fill: false,
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 0,
                order: 0,
              },
              {
                // This is a hidden dataset used just for the fill
                label: "Fill Area",
                data: lumykrasVectibixDensity,
                borderColor: "transparent",
                backgroundColor: "rgba(210, 180, 140, 0.5)", // Light tan/brown color
                fill: {
                  target: "+1", // Fill to the next dataset
                  above: "rgba(210, 180, 140, 0.5)",
                  below: "rgba(210, 180, 140, 0.5)",
                },
                tension: 0.4,
                borderWidth: 0,
                pointRadius: 0,
                order: 2,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Propensity Score",
                  font: {
                    size: 14,
                    weight: "bold",
                  },
                  padding: {
                    top: 10,
                  },
                },
                grid: {
                  display: true,
                  color: "rgba(200, 200, 200, 0.3)",
                },
                min: 0,
                max: 0.5,
                ticks: {
                  // Only show the 6 specific labels requested
                  autoSkip: true,
                  maxTicksLimit: 6,
                  callback: (value) => {
                    // Only show these specific values
                    const showValues = [0, 0.1, 0.2, 0.3, 0.4, 0.5]
                    if (showValues.includes(Number(value))) {
                      return Number(value).toFixed(1)
                    }
                    return ""
                  },
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Density",
                  font: {
                    size: 14,
                    weight: "bold",
                  },
                },
                min: 0,
                max: 6,
                grid: {
                  display: true,
                  color: "rgba(200, 200, 200, 0.3)",
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
                  filter: (item) => {
                    // Hide the fill area dataset from the legend
                    return item.text !== "Fill Area"
                  },
                },
              },
              tooltip: {
                callbacks: {
                  label: (context) => {
                    if (context.dataset.label === "Fill Area") {
                      return undefined
                    }
                    const label = context.dataset.label || ""
                    const value = context.parsed.y
                    return `${label}: ${value.toFixed(2)}`
                  },
                },
                filter: (tooltipItem) => {
                  // Hide tooltips for the fill area dataset
                  return tooltipItem.dataset.label !== "Fill Area"
                },
              },
              title: {
                display: true,
                text: "Propensity Score Distribution by Treatment Group",
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
