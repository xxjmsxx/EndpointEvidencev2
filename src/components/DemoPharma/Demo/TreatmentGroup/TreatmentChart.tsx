"use client";

import { useEffect, useRef } from "react";
import { Chart, registerables,  ArcElement } from "chart.js";

Chart.register(...registerables);

export default function TreatmentDistributionChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing chart instance if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");

      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: "doughnut",
          data: {
            labels: [
              "Keytruda + Trodelvy (n=260)",
              "Keytruda + Chemotherapy (n=1,882)",
            ],
            datasets: [
              {
                data: [12.1, 87.9],
                backgroundColor: ["rgb(0, 102, 255)", "rgb(220, 220, 220)"],
                borderColor: ["rgb(0, 102, 255)", "rgb(220, 220, 220)"],
                borderWidth: 1,
                hoverOffset: 10,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: "80%", // Changed from 85% to 80% to make the donut slightly thicker
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
                  generateLabels: (chart) => {
                    const data = chart.data;
                    if (data.labels && data.datasets.length) {
                      const bgColors = data.datasets[0].backgroundColor as string[];
                      const borderColors = data.datasets[0].borderColor as string[];

                      return data.labels.map((label, i) => {
                        return {
                          text: `${label}`,
                          fillStyle: bgColors[i],
                          strokeStyle: borderColors[i],
                          lineWidth: 1,
                          hidden: false,
                          index: i,
                        };
                      });
                    }
                    return [];
                  },

                },
              },
              tooltip: {
                callbacks: {
                  label: (context) => `${context.label}: ${context.raw}%`,
                },
              },
              title: {
                display: true,
                text: "Treatment distribution in cohort retrieved (N=2,142)",
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
        });

        // Update the custom draw function to place percentages directly in the donut segments
        // Add data labels inside the doughnut
        const originalDraw = chartInstance.current.draw;
        chartInstance.current.draw = function (this: Chart) {
          originalDraw.call(this);

          const ctx = this.ctx;
          const meta = this.getDatasetMeta(0);

          ctx.save();
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";

          meta.data.forEach((element, index) => {
            const arc = element as unknown as ArcElement;
            const data = this.data.datasets[0].data[index] as number;
            const centerX = element.x;
            const centerY = element.y;
            const angle =
              arc.startAngle + (arc.endAngle - arc.startAngle) / 2;

            // Calculate position for the label (in the middle of the donut segment)
            const radius = (arc.innerRadius + arc.outerRadius) / 2;
            const labelX = centerX + Math.cos(angle) * radius;
            const labelY = centerY + Math.sin(angle) * radius;

            // Set text color based on background
            ctx.fillStyle = index === 0 ? "#ffffff" : "#333333";
            ctx.font = data < 20 ? "bold 12px Arial" : "bold 14px Arial"; // Smaller font for smaller segments
            ctx.fillText(`${data}%`, labelX, labelY);
          });

          ctx.restore();
        };
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="h-[400px]">
        {" "}
        {/* Reduced height to make the chart smaller */}
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}
