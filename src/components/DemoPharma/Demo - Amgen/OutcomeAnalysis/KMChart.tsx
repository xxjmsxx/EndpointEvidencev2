"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export default function KaplanMeierChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const riskChartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)
  const riskChartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    // Data for the Kaplan-Meier chart
    const months = Array.from({ length: 13 }, (_, i) => i) // 0-12 months

    const lumykrasVectibixSurvival = [
      100, 97.18, 94.36, 91.54, 88.72, 85.9, 83.08, 80.77, 78.46, 76.15, 73.85, 71.54, 69.23,
    ].map((val) => val / 100) // Convert to decimal for chart

    const krazatiErbituxSurvival = [
      100, 97.12, 94.23, 91.35, 88.46, 85.58, 82.69, 80.83, 78.97, 77.12, 75.26, 73.4, 71.54,
    ].map((val) => val / 100) // Convert to decimal for chart

    // Generate confidence interval data (approximated for demonstration)
    // In a real implementation, these would be calculated statistically
    const lumykrasVectibixLower = lumykrasVectibixSurvival.map((val) => Math.max(0, val - 0.05 - Math.random() * 0.03))
    const lumykrasVectibixUpper = lumykrasVectibixSurvival.map((val) => Math.min(1, val + 0.05 + Math.random() * 0.03))

    const krazatiErbituxLower = krazatiErbituxSurvival.map((val) => Math.max(0, val - 0.05 - Math.random() * 0.03))
    const krazatiErbituxUpper = krazatiErbituxSurvival.map((val) => Math.min(1, val + 0.05 + Math.random() * 0.03))

    // Patients at risk data - modified to only show up to 12 months
    const riskMonths = [0, 3, 6, 9, 12]

    const lumykrasVectibixRisk = [318, 290, 240, 190, 150]

    const krazatiErbituxRisk = [317, 293, 243, 198, 160]

    // Main survival curve chart
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      const ctx = chartRef.current.getContext("2d")

      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: months,
            datasets: [
              // Confidence interval for Lumykras+Vectibix (lower bound)
              {
                label: "Lumykras+Vectibix CI Lower",
                data: lumykrasVectibixLower,
                borderColor: "transparent",
                backgroundColor: "rgba(89, 13, 229, 0.2)", // Purple with transparency
                fill: "+1", // Fill to the next dataset
                stepped: "before",
                tension: 0,
                pointRadius: 0,
                order: 4, // Draw order (higher numbers are drawn first)
              },
              // Main Lumykras+Vectibix line
              {
                label: "Lumykras+Vectibix",
                data: lumykrasVectibixSurvival,
                borderColor: "#590DE5", // Purple color as requested
                backgroundColor: "transparent", // No fill
                fill: false,
                stepped: "before",
                tension: 0,
                borderWidth: 2,
                pointRadius: 0,
                order: 2,
              },
              // Confidence interval for Lumykras+Vectibix (upper bound)
              {
                label: "Lumykras+Vectibix CI Upper",
                data: lumykrasVectibixUpper,
                borderColor: "transparent",
                backgroundColor: "rgba(89, 13, 229, 0.2)", // Purple with transparency
                fill: "-1", // Fill to the previous dataset
                stepped: "before",
                tension: 0,
                pointRadius: 0,
                order: 3,
              },
              // Confidence interval for Krazati+Erbitux (lower bound)
              {
                label: "Krazati+Erbitux CI Lower",
                data: krazatiErbituxLower,
                borderColor: "transparent",
                backgroundColor: "rgba(0, 102, 255, 0.2)", // Blue with transparency
                fill: "+1", // Fill to the next dataset
                stepped: "before",
                tension: 0,
                pointRadius: 0,
                order: 7,
              },
              // Main Krazati+Erbitux line
              {
                label: "Krazati+Erbitux",
                data: krazatiErbituxSurvival,
                borderColor: "rgb(0, 102, 255)", // Blue
                backgroundColor: "transparent", // No fill
                fill: false,
                stepped: "before",
                tension: 0,
                borderWidth: 2,
                pointRadius: 0,
                order: 5,
              },
              // Confidence interval for Krazati+Erbitux (upper bound)
              {
                label: "Krazati+Erbitux CI Upper",
                data: krazatiErbituxUpper,
                borderColor: "transparent",
                backgroundColor: "rgba(0, 102, 255, 0.2)", // Blue with transparency
                fill: "-1", // Fill to the previous dataset
                stepped: "before",
                tension: 0,
                pointRadius: 0,
                order: 6,
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
                  text: "Time (months)",
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
                ticks: {
                  callback: (value) => value,
                  maxRotation: 0,
                  autoSkip: true,
                  autoSkipPadding: 20,
                },
                min: 0,
                max: 12, // Changed to 12 months
              },
              y: {
                title: {
                  display: true,
                  text: "Survival Probability",
                  font: {
                    size: 14,
                    weight: "bold",
                  },
                },
                min: 0,
                max: 1,
                grid: {
                  display: true,
                  color: "rgba(200, 200, 200, 0.3)",
                },
                ticks: {
                  callback: (value) => typeof value === "number" ? value.toFixed(1) : value,
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
                    // Only show the main lines in the legend, not the confidence intervals
                    return !item.text.includes("CI")
                  },
                },
              },
              tooltip: {
                callbacks: {
                  label: (context) => {
                    // Only show tooltips for the main lines, not the confidence intervals
                    if (context.dataset.label && context.dataset.label.includes("CI")) {
                      return undefined
                    }
                    const label = context.dataset.label || ""
                    const value = context.parsed.y
                    return `${label}: ${(value * 100).toFixed(1)}%`
                  },
                },
                filter: (tooltipItem) => {
                  // Only show tooltips for the main lines, not the confidence intervals
                  return !!tooltipItem.dataset.label && !tooltipItem.dataset.label.includes("CI")
                },
              },
              title: {
                display: true,
                text: "Overall Survival (OS)",
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

    // Patients at risk chart
    if (riskChartRef.current) {
      if (riskChartInstance.current) {
        riskChartInstance.current.destroy()
      }

      const riskCtx = riskChartRef.current.getContext("2d")

      if (riskCtx) {
        riskChartInstance.current = new Chart(riskCtx, {
          type: "line",
          data: {
            labels: riskMonths, // Using the modified month values: [0, 3, 6, 9, 12]
            datasets: [
              {
                label: "Lumykras+Vectibix",
                data: lumykrasVectibixRisk,
                borderColor: "#590DE5", // Purple color as requested
                backgroundColor: "#590DE5", // Purple color as requested
                pointRadius: 4,
                pointStyle: "circle",
                stepped: "before", // Step line for risk chart
                tension: 0,
                borderWidth: 2,
              },
              {
                label: "Krazati+Erbitux",
                data: krazatiErbituxRisk,
                borderColor: "rgb(0, 102, 255)", // Blue
                backgroundColor: "rgb(0, 102, 255)", // Blue
                pointRadius: 4,
                pointStyle: "circle",
                stepped: "before", // Step line for risk chart
                tension: 0,
                borderWidth: 2,
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
                  text: "Time (months)",
                  font: {
                    size: 14,
                    weight: "bold",
                  },
                },
                grid: {
                  display: true,
                  color: "rgba(200, 200, 200, 0.3)",
                },
                // Explicitly set the ticks to match the month values
                ticks: {
                  callback: (value, index) => {
                    // Return the actual month value
                    return riskMonths[index]
                  },
                },
                // Don't use min/max here as we're using explicit labels
              },
              y: {
                title: {
                  display: true,
                  text: "Number at risk",
                  font: {
                    size: 14,
                    weight: "bold",
                  },
                },
                min: 0,
                max: 350,
                grid: {
                  display: true,
                  color: "rgba(200, 200, 200, 0.3)",
                },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                callbacks: {
                  label: (context) => {
                    const label = context.dataset.label || ""
                    const value = context.parsed.y
                    return `${label}: ${value} patients`
                  },
                  title: (tooltipItems) => {
                    // Show the actual month value in the tooltip title
                    const index = tooltipItems[0].dataIndex
                    return `Month ${riskMonths[index]}`
                  },
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
      if (riskChartInstance.current) {
        riskChartInstance.current.destroy()
      }
    }
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="h-[400px] mb-1">
        <canvas ref={chartRef}></canvas>
      </div>
      <div className="h-[150px] mb-4">
        <canvas ref={riskChartRef}></canvas>
      </div>

      {/* Patients at Risk Table - Updated to show 3-month intervals up to 12 months */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr>
              <th className="text-left p-2 border-b">Months</th>
              <th className="text-center p-2 border-b">0</th>
              <th className="text-center p-2 border-b">3</th>
              <th className="text-center p-2 border-b">6</th>
              <th className="text-center p-2 border-b">9</th>
              <th className="text-center p-2 border-b">12</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-left p-2 border-b font-medium">Lumykras+Vectibix</td>
              <td className="text-center p-2 border-b">318</td>
              <td className="text-center p-2 border-b">290</td>
              <td className="text-center p-2 border-b">240</td>
              <td className="text-center p-2 border-b">190</td>
              <td className="text-center p-2 border-b">150</td>
            </tr>
            <tr>
              <td className="text-left p-2 font-medium">Krazati+Erbitux</td>
              <td className="text-center p-2">317</td>
              <td className="text-center p-2">293</td>
              <td className="text-center p-2">243</td>
              <td className="text-center p-2">198</td>
              <td className="text-center p-2">160</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
