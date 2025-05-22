"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export default function AdverseEventSeverityByTypeErbituxChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      const ctx = chartRef.current.getContext("2d")

      if (ctx) {
        // Updated data for the new comparison - Krazati + Erbitux
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

        // Approximate percentages for each grade (1-4) for each adverse event
        // Format: [Grade 1, Grade 2, Grade 3, Grade 4]
        const severityData = [
          [45, 30, 20, 5], // Diarrhea
          [55, 30, 15, 0], // Rash
          [40, 35, 20, 5], // Fatigue
          [60, 30, 10, 0], // Nausea
          [60, 25, 15, 0], // Stomatitis
          [55, 30, 15, 0], // Decreased appetite
          [35, 30, 25, 10], // Anemia
          [60, 25, 15, 0], // Hypomagnesemia
          [50, 30, 20, 0], // Skin reactions
          [55, 30, 15, 0], // Abdominal pain
        ]

        // Different shades of blue for the grades - same as the other chart
        const blueShades = [
          "rgb(0, 60, 143)", // Dark blue for Grade 1
          "rgb(0, 102, 255)", // Medium blue for Grade 2
          "rgb(102, 178, 255)", // Light blue for Grade 3
          "rgb(204, 229, 255)", // Very light blue for Grade 4
        ]

        chartInstance.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: adverseEvents,
            datasets: [
              {
                label: "Grade 1",
                data: severityData.map((data) => data[0]),
                backgroundColor: blueShades[0],
                stack: "Stack 0",
              },
              {
                label: "Grade 2",
                data: severityData.map((data) => data[1]),
                backgroundColor: blueShades[1],
                stack: "Stack 0",
              },
              {
                label: "Grade 3",
                data: severityData.map((data) => data[2]),
                backgroundColor: blueShades[2],
                stack: "Stack 0",
              },
              {
                label: "Grade 4",
                data: severityData.map((data) => data[3]),
                backgroundColor: blueShades[3],
                stack: "Stack 0",
              },
            ],
          },
          options: {
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                stacked: true,
                title: {
                  display: true,
                  text: "Percentage of Events (%)",
                  font: {
                    size: 14,
                    weight: "bold",
                  },
                },
                min: 0,
                max: 100,
                ticks: {
                  callback: (value) => `${value}`,
                },
              },
              y: {
                stacked: true,
                title: {
                  display: true,
                  text: "Adverse Event Type",
                  font: {
                    size: 14,
                    weight: "bold",
                  },
                },
              },
            },
            plugins: {
              legend: {
                position: "bottom",
                align: "center",
                // Removed the title property that contained "Grade"
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
                text: "Adverse Event Severity by Type - Krazati + Erbitux",
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
