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
    const months = Array.from({ length: 49 }, (_, i) => i)

    const keytrudaChemoSurvival = [
      100, 97.18, 94.36, 91.54, 88.72, 85.9, 83.08, 80.77, 78.46, 76.15, 73.85, 71.54, 69.23, 67.95, 66.67, 65.38, 64.1,
      62.82, 61.54, 59.94, 58.33, 56.73, 55.13, 53.53, 51.92, 50.77, 49.62, 48.46, 47.31, 46.15, 45, 44.04, 43.08,
      42.12, 41.15, 40.19, 39.23, 38.55, 37.87, 37.2, 36.52, 35.84, 35.16, 30.79, 26.41, 22.03, 17.66, 13.28, 8.91,
    ].map((val) => val / 100) // Convert to decimal for chart

    const keytrudaTrodelvySurvival = [
      100, 97.12, 94.23, 91.35, 88.46, 85.58, 82.69, 80.83, 78.97, 77.12, 75.26, 73.4, 71.54, 70.19, 68.85, 67.5, 66.15,
      64.81, 63.46, 62.18, 60.9, 59.62, 58.33, 57.05, 55.77, 54.94, 54.1, 53.27, 52.44, 51.6, 50.77, 49.87, 48.97,
      48.08, 47.18, 46.28, 45.38, 44.72, 44.06, 43.4, 42.73, 42.07, 41.41, 35.54, 29.68, 23.82, 17.95, 12.09, 6.22,
    ].map((val) => val / 100) // Convert to decimal for chart

    // Generate confidence interval data (approximated for demonstration)
    // In a real implementation, these would be calculated statistically
    const keytrudaChemoLower = keytrudaChemoSurvival.map((val) => Math.max(0, val - 0.05 - Math.random() * 0.03))
    const keytrudaChemoUpper = keytrudaChemoSurvival.map((val) => Math.min(1, val + 0.05 + Math.random() * 0.03))

    const keytrudaTrodelvyLower = keytrudaTrodelvySurvival.map((val) => Math.max(0, val - 0.05 - Math.random() * 0.03))
    const keytrudaTrodelvyUpper = keytrudaTrodelvySurvival.map((val) => Math.min(1, val + 0.05 + Math.random() * 0.03))

    // Patients at risk data - explicitly using the month values as labels
    const riskMonths = [0, 6, 12, 18, 24, 30, 36, 42, 48]

    const keytrudaChemoRisk = [260, 240, 167, 127, 99, 76, 57, 27, 0]

    const keytrudaTrodelvy = [260, 243, 198, 148, 119, 82, 52, 27, 9]

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
              // Confidence interval for Keytruda+Chemotherapy (lower bound)
              {
                label: "Keytruda+Chemotherapy CI Lower",
                data: keytrudaChemoLower,
                borderColor: "transparent",
                backgroundColor: "rgba(89, 13, 229, 0.2)", // Purple with transparency
                fill: "+1", // Fill to the next dataset
                stepped: "before",
                tension: 0,
                pointRadius: 0,
                order: 4, // Draw order (higher numbers are drawn first)
              },
              // Main Keytruda+Chemotherapy line
              {
                label: "Keytruda+Chemotherapy",
                data: keytrudaChemoSurvival,
                borderColor: "#590DE5", // Purple color as requested
                backgroundColor: "transparent", // No fill
                fill: false,
                stepped: "before",
                tension: 0,
                borderWidth: 2,
                pointRadius: 0,
                order: 2,
              },
              // Confidence interval for Keytruda+Chemotherapy (upper bound)
              {
                label: "Keytruda+Chemotherapy CI Upper",
                data: keytrudaChemoUpper,
                borderColor: "transparent",
                backgroundColor: "rgba(89, 13, 229, 0.2)", // Purple with transparency
                fill: "-1", // Fill to the previous dataset
                stepped: "before",
                tension: 0,
                pointRadius: 0,
                order: 3,
              },
              // Confidence interval for Keytruda+Trodelvy (lower bound)
              {
                label: "Keytruda+Trodelvy CI Lower",
                data: keytrudaTrodelvyLower,
                borderColor: "transparent",
                backgroundColor: "rgba(0, 102, 255, 0.2)", // Blue with transparency
                fill: "+1", // Fill to the next dataset
                stepped: "before",
                tension: 0,
                pointRadius: 0,
                order: 7,
              },
              // Main Keytruda+Trodelvy line
              {
                label: "Keytruda+Trodelvy",
                data: keytrudaTrodelvySurvival,
                borderColor: "rgb(0, 102, 255)", // Blue
                backgroundColor: "transparent", // No fill
                fill: false,
                stepped: "before",
                tension: 0,
                borderWidth: 2,
                pointRadius: 0,
                order: 5,
              },
              // Confidence interval for Keytruda+Trodelvy (upper bound)
              {
                label: "Keytruda+Trodelvy CI Upper",
                data: keytrudaTrodelvyUpper,
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
                max: 48,
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
                  callback: (value) => Number(value).toFixed(1),
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
                    if (!context.dataset.label || context.dataset.label.includes("CI")) {
                      return undefined
                    }
                    const label = context.dataset.label || ""
                    const value = context.parsed.y
                    return `${label}: ${(value * 100).toFixed(1)}%`
                  },
                },
                filter: (tooltipItem) => {
                  // Only show tooltips for the main lines, not the confidence intervals
                  if (!tooltipItem.dataset.label) return false;
                  return !tooltipItem.dataset.label.includes("CI");
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
            labels: riskMonths, // Using the explicit month values: [0, 6, 12, 18, 24, 30, 36, 42, 48]
            datasets: [
              {
                label: "Keytruda+Chemotherapy",
                data: keytrudaChemoRisk,
                borderColor: "#590DE5", // Purple color as requested
                backgroundColor: "#590DE5", // Purple color as requested
                pointRadius: 4,
                pointStyle: "circle",
                stepped: "before", // Step line for risk chart
                tension: 0,
                borderWidth: 2,
              },
              {
                label: "Keytruda+Trodelvy",
                data: keytrudaTrodelvy,
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
                max: 300,
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

      {/* Patients at Risk Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr>
              <th className="text-left p-2 border-b">Months</th>
              <th className="text-center p-2 border-b">0</th>
              <th className="text-center p-2 border-b">6</th>
              <th className="text-center p-2 border-b">12</th>
              <th className="text-center p-2 border-b">18</th>
              <th className="text-center p-2 border-b">24</th>
              <th className="text-center p-2 border-b">30</th>
              <th className="text-center p-2 border-b">36</th>
              <th className="text-center p-2 border-b">42</th>
              <th className="text-center p-2 border-b">48</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-left p-2 border-b font-medium">Keytruda+Chemotherapy</td>
              <td className="text-center p-2 border-b">260</td>
              <td className="text-center p-2 border-b">240</td>
              <td className="text-center p-2 border-b">167</td>
              <td className="text-center p-2 border-b">127</td>
              <td className="text-center p-2 border-b">99</td>
              <td className="text-center p-2 border-b">76</td>
              <td className="text-center p-2 border-b">57</td>
              <td className="text-center p-2 border-b">27</td>
              <td className="text-center p-2 border-b">0</td>
            </tr>
            <tr>
              <td className="text-left p-2 font-medium">Keytruda+Trodelvy</td>
              <td className="text-center p-2">260</td>
              <td className="text-center p-2">243</td>
              <td className="text-center p-2">198</td>
              <td className="text-center p-2">148</td>
              <td className="text-center p-2">119</td>
              <td className="text-center p-2">82</td>
              <td className="text-center p-2">52</td>
              <td className="text-center p-2">27</td>
              <td className="text-center p-2">9</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
