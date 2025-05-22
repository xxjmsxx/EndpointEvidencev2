"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

// ────────────────────────────────────────────────────────────────────────────
//  Forest-plot data (Progression-Free Survival)
// ────────────────────────────────────────────────────────────────────────────
const forestPlotData = [
  { subgroup: "Overall", hr: 0.78, lowerCI: 0.65, upperCI: 0.93, pValue: 0.005 },
  { subgroup: "Age < 65", hr: 0.81, lowerCI: 0.64, upperCI: 1.02, pValue: 0.072 },
  { subgroup: "Age ≥ 65", hr: 0.75, lowerCI: 0.58, upperCI: 0.97, pValue: 0.031 },
  { subgroup: "Male", hr: 0.80, lowerCI: 0.63, upperCI: 1.01, pValue: 0.061 },
  { subgroup: "Female", hr: 0.76, lowerCI: 0.58, upperCI: 0.99, pValue: 0.042 },
  { subgroup: "ECOG 0", hr: 0.72, lowerCI: 0.55, upperCI: 0.94, pValue: 0.016 },
  { subgroup: "ECOG 1-2", hr: 0.83, lowerCI: 0.65, upperCI: 1.06, pValue: 0.132 },
  { subgroup: "Prior lines: 1", hr: 0.75, lowerCI: 0.59, upperCI: 0.95, pValue: 0.018 },
  { subgroup: "Prior lines: ≥2", hr: 0.82, lowerCI: 0.63, upperCI: 1.07, pValue: 0.147 },
  { subgroup: "Left-sided tumor", hr: 0.71, lowerCI: 0.56, upperCI: 0.90, pValue: 0.005 },
  { subgroup: "Right-sided tumor", hr: 0.89, lowerCI: 0.67, upperCI: 1.18, pValue: 0.412 },
  { subgroup: "Prior anti-EGFR: Yes", hr: 0.85, lowerCI: 0.62, upperCI: 1.17, pValue: 0.321 },
  { subgroup: "Prior anti-EGFR: No", hr: 0.74, lowerCI: 0.60, upperCI: 0.92, pValue: 0.007 },
  { subgroup: "Baseline CEA: High", hr: 0.83, lowerCI: 0.67, upperCI: 1.03, pValue: 0.089 },
  { subgroup: "Baseline CEA: Low", hr: 0.69, lowerCI: 0.52, upperCI: 0.91, pValue: 0.009 },
]

export default function ForestPlot() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // clean up any prior instance
    if (chartInstance.current) chartInstance.current.destroy()

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Display from bottom-to-top as customary in forest plots
    const reversed = [...forestPlotData].reverse()

    // data helpers
    const labels       = reversed.map(d => d.subgroup)
    const hrValues     = reversed.map(d => d.hr)
    const lowerCI      = reversed.map(d => d.lowerCI)
    const upperCI      = reversed.map(d => d.upperCI)
    const pValuesTxt   = reversed.map(d => `p=${d.pValue.toFixed(4)}`)
    const hrWithCiTxt  = reversed.map(d => `${d.hr.toFixed(2)} (${d.lowerCI.toFixed(2)}-${d.upperCI.toFixed(2)})`)

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Hazard Ratio",
            data: hrValues,
            backgroundColor: "rgb(0, 102, 255)",
            borderColor:     "rgb(0, 102, 255)",
            borderWidth: 2,
            barThickness: 2,
            maxBarThickness: 2,
            pointStyle: "circle",
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            min: 0,
            max: 2.0,
            ticks: { stepSize: 0.5 },
            grid:  { color: "rgba(200,200,200,0.3)" },
            title: {
              display: true,
              text: "Hazard Ratio (95% CI)",
              font: { size: 14, weight: "bold" },
              padding: { top: 10 },
            },
          },
          y: { grid: { display: false } },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (c) => {
                const i = c.dataIndex
                const d = reversed[i]
                return [
                  `HR: ${d.hr.toFixed(2)} (${d.lowerCI.toFixed(2)}-${d.upperCI.toFixed(2)})`,
                  `p-value: ${d.pValue.toFixed(4)}`,
                ]
              },
            },
          },
          title: {
            display: true,
            text: "Subgroup Analysis of Progression-Free Survival",
            font: { size: 18, weight: "bold" },
            padding: { bottom: 30 },
          },
          // ░░ No “datalabels” plugin — we’ll draw our own labels below ░░
        },
      },
    })

    // ───────────────────────────────────────────────────────────────
    //  Custom draw: reference line, CI bars, HR & p-value labels
    // ───────────────────────────────────────────────────────────────
    const originalDraw = chartInstance.current.draw
    chartInstance.current.draw = function (...args) {
      originalDraw.apply(this, args)

      const chart = this as Chart
      const ctx    = chart.ctx
      const meta   = chart.getDatasetMeta(0)
      const xScale = chart.scales.x
      const yScale = chart.scales.y

      // Reference line (HR = 1.0)
      const refX = xScale.getPixelForValue(1.0)
      ctx.save()
      ctx.strokeStyle = "rgba(0,0,0,0.5)"
      ctx.setLineDash([5, 5])
      ctx.beginPath()
      ctx.moveTo(refX, yScale.top)
      ctx.lineTo(refX, yScale.bottom)
      ctx.stroke()
      ctx.restore()

      // CI error bars
      ctx.save()
      ctx.strokeStyle = "rgb(0, 102, 255)"
      ctx.lineWidth = 2
      meta.data.forEach((bar, i) => {
        const y = bar.y
        const xLeft  = xScale.getPixelForValue(lowerCI[i])
        const xRight = xScale.getPixelForValue(upperCI[i])

        // horizontal line
        ctx.beginPath()
        ctx.moveTo(xLeft, y)
        ctx.lineTo(xRight, y)
        ctx.stroke()

        // caps
        ctx.beginPath()
        ctx.moveTo(xLeft,  y - 5)
        ctx.lineTo(xLeft,  y + 5)
        ctx.moveTo(xRight, y - 5)
        ctx.lineTo(xRight, y + 5)
        ctx.stroke()
      })
      ctx.restore()

      // HR (95 % CI) and p-value text
      ctx.save()
      ctx.textAlign = "right"
      ctx.textBaseline = "middle"
      ctx.font = "11px Arial"
      meta.data.forEach((bar, i) => {
        const y = bar.y
        const rightEdge = xScale.getPixelForValue(2.0)
        ctx.fillText(hrWithCiTxt[i], rightEdge - 100, y)
        ctx.fillText(pValuesTxt[i],  rightEdge - 10,  y)
      })
      ctx.restore()
    }

    return () => {
      chartInstance.current?.destroy()
    }
  }, [])

  // ────────────────────────────────────────────────────────────────────────────
  //  JSX
  // ────────────────────────────────────────────────────────────────────────────
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="h-[650px]">
        <canvas ref={chartRef}></canvas>
      </div>

      <div className="mt-4 flex justify-between text-sm text-gray-600">
        <div>Favors&nbsp;Krazati + Erbitux</div>
        <div>Favors&nbsp;Lumykras + Vectibix</div>
      </div>
    </div>
  )
}
