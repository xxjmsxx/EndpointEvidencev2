import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

export default function ReportGraphs({ demographics }) {
  const genderChartRef = useRef(null);
  const ageChartRef = useRef(null);

  useEffect(() => {
    if (genderChartRef.current && ageChartRef.current) {
      // Destroy previous instances
      Chart.getChart(genderChartRef.current)?.destroy();
      Chart.getChart(ageChartRef.current)?.destroy();

      // Gender Chart
      new Chart(genderChartRef.current, {
        type: 'doughnut',
        data: {
          labels: ['Male', 'Female'],
          datasets: [
            {
              label: 'Gender Distribution',
              data: [demographics.gender.male, demographics.gender.female],
              backgroundColor: ['#4a00b4', '#c7b8dc'],
              borderWidth: 10,
            },
          ],
        },
        options: {
          cutout: '70%',
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
            },
            title: {
              display: false,
            },
          },
        },
      });

      // Age Chart
      new Chart(ageChartRef.current, {
        type: 'bar',
        data: {
          labels: Object.keys(demographics.ageAtTreatmentStart).filter((key) => key !== 'unit'),
          datasets: [
            {
              label: 'Age at Treatment Start',
              data: Object.entries(demographics.ageAtTreatmentStart)
                .filter(([key]) => key !== 'unit')
                .map(([, value]) => value),
              backgroundColor: '#4a00b4',
              barThickness: 10,
            },
          ],
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: {
                display: false,
              },
              ticks: {
                callback: (value) => `${value}%`,
              },
            },
            y: {
              grid: {
                display: false,
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return `${context.raw}%`;
                },
              },
            },
            title: {
              display: false,
            },
          },
        },
      });
    }
  }, [demographics]);

  return (
    <div className="flex flex-row w-full mt-4 gap-3">
      <div className="flex flex-col items-start gap-5 w-[49%] p-2 bg-white shadow-[0_0_10px_rgba(0,0,0,0.1)]">
        <h3 className="ml-4 mt-5 text-md text-gray-800 tracking-widest">
          <span className="font-bold">Gender </span>| Demographics
        </h3>
        <div className="w-full flex flex-row justify-center relative p-4 h-[300px]">
          <canvas ref={genderChartRef}></canvas>
        </div>
      </div>

      <div className="flex flex-col items-start gap-5 w-[49%] p-2 bg-white shadow-[0_0_10px_rgba(0,0,0,0.1)]">
        <h3 className="ml-4 mt-5 text-md text-gray-800 tracking-widest">
          <span className="font-bold">Age at Treatment </span>| Demographics
        </h3>
        <div className="w-full flex flex-row justify-center relative p-4 h-[300px]">
          <canvas ref={ageChartRef}></canvas>
        </div>
      </div>
    </div>
  );
}
