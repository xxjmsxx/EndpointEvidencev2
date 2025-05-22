"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export default function AdverseEventSeverityByTypeChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      const ctx = chartRef.current.getContext("2d")

      if (ctx) {
        // Data from the provided image - approximate percentages based on the visualization
        const adverseEvents = [
          "Anemia",
          "Constipation",
          "Cough",
          "Decreased appetite",
          "Diarrhea",
          "Fatigue",
          "Nausea",
          "Neutropenia",
          "Rash",
          "Vomiting",
        ]

        // Approximate percentages for each grade (1-4) for each adverse event
        // Format: [Grade 1, Grade 2, Grade 3, Grade 4]
        const severityData = [
          [30, 40, 25, 5], // Anemia
          [70, 25, 5, 0], // Constipation
          [75, 20, 5, 0], // Cough
          [65, 30, 5, 0], // Decreased appetite
          [50, 30, 15, 5], // Diarrhea
          [45, 35, 15, 5], // Fatigue
          [60, 30, 10, 0], // Nausea
          [20, 30, 30, 20], // Neutropenia
          [70, 20, 10, 0], // Rash
          [65, 20, 15, 0], // Vomiting
        ]

        // Different shades of blue for the grades
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
                text: "Adverse Event Severity by Type - Keytruda + Chemotherapy",
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
