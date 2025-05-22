
'use client';

import { useEffect, useState, useRef } from 'react';
import {
  CpuChipIcon,
  CheckCircleIcon,
  ClockIcon,
  DocumentTextIcon,
  GlobeAltIcon, // ✅ add this
} from '@heroicons/react/24/outline';


export default function MultiStageLoader({onComplete}) {
  const stagesRef = useRef([
    {
      label: 'Collecting internal patient data',
      icon: CpuChipIcon,
      duration: 4000,
    },
    {
      label: 'Querying external clinical databases',
      icon: GlobeAltIcon,
      duration: 4000,
    },
    {
      label: 'Compiling final report',
      icon: DocumentTextIcon,
      duration: 4000,
    },
  ]);



  const [currentStage, setCurrentStage] = useState(0);
  const [completedStages, setCompletedStages] = useState([]);

  const stages = stagesRef.current;


  useEffect(() => {
    if (currentStage < stages.length) {
      const timeout = setTimeout(() => {
        setCompletedStages((prev) => [...prev, currentStage]);
        setCurrentStage((prev) => prev + 1);
      }, stages[currentStage].duration);
      return () => clearTimeout(timeout);
    }
    console.log("CHECK CURRENTSTAGE:", completedStages)
  }, [currentStage]);

  useEffect(() => {
    if (completedStages.length === stages.length && onComplete) {
      onComplete();
    }
  }, [completedStages, onComplete]);




  return (
    <div className="flex flex-col w-full mt-5 max-w-3xl border border-zinc-300 bg-white rounded-2xl shadow-md py-4 px-6 mx-auto mb-6">
      <div className="flex items-center gap-2 mb-2">
        <div className="rounded-md px-2.5 py-1 bg-blue-100 text-[13px] font-medium">
          Generating report
        </div>
      </div>
      <div className="flex flex-col gap-6 mt-4">
        {stages.map((stage, idx) => {
          const isDone = completedStages.includes(idx);
          const isCurrent = currentStage === idx;

          return (
            <div key={idx} className="flex flex-col">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 text-blue-600">
                  {isDone ? (
                    <CheckCircleIcon className="w-5 h-5 text-green-600" />
                  ) : (
                    <stage.icon className="w-5 h-5" />
                  )}
                </div>
                <span
                  className={`text-sm ${
                    isDone ? 'text-zinc-500' : isCurrent ? 'font-medium' : 'text-zinc-400'
                  }`}
                >
                  {stage.label}
                </span>
              </div>
              <div className="mt-1 h-1.5 w-full bg-zinc-200 rounded overflow-hidden">
                <div
                  className={`h-full transition-all duration-[300ms] ease-linear ${
                    isDone
                      ? 'bg-green-500 w-full'
                      : isCurrent
                      ? 'bg-blue-500 w-[100%]'
                      : 'w-0'
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
