'use client';

import React, { useState } from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/24/outline';

// utils
import { buildReportPayload } from "@/utils/buildReportPayload";

export default function PictoTable({ mode, user, fullQuestion, picotFields, picotState, setPicotState, startReportGeneration, setStartReportGeneration, reportData, setReportData}) {
  const isPicotValid = picotFields.every(
    (field) => picotState.extracted[field]?.trim() !== ''
  );

  const [editedFields, setEditedFields] = useState({});

  return (
    <div className="flex flex-col w-full mt-5 max-w-3xl border border-zinc-300 bg-white rounded-2xl shadow-md py-4 px-6 mx-auto mb-6">
      {/* Header section */}
      <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2 mb-1">
        <div className="rounded-md px-2.5 py-1 bg-blue-100 text-[13px] font-medium">
          Study Parameters
        </div>
        <TrashIcon
          className="w-4 h-4 text-gray-400 hover:text-zinc-900 cursor-pointer transition"
          title="Clear all"
        />
      </div>


        <p className="text-[10px] text-gray-500">
          Before submitting your study, please verify or refine the extracted information.
        </p>
      </div>

      {/* Form layout using flex */}
      <form className="mt-6 space-y-6">
        {picotFields.map((field) => (
          <div
            key={field}
            className="flex flex-row items-center gap-4"
          >
            {/* Label */}
            <label className="w-[110px] text-sm font-medium capitalize">
              {field}
            </label>

            {/* Input and indicator */}
            <div className="relative flex-1">
              <input
                type="text"
                value={picotState.extracted[field] || ''}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setPicotState((prev) => ({
                    ...prev,
                    extracted: {
                      ...prev.extracted,
                      [field]: newValue
                    }
                  }));
                  setEditedFields((prev) => ({
                    ...prev,
                    [field]: newValue !== picotState.extracted[field]
                  }));
                }}
                placeholder={`Enter ${field}`}
                className="w-full pr-8 px-2 text-sm rounded border h-[32px] outline-none hover:bg-zinc-50 focus:border-zinc-900 focus:bg-zinc-50 border-gray-300"
              />
              <PencilSquareIcon
                className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                aria-hidden="true"
              />
            </div>

          </div>
        ))}

      { mode === 'rwe report generation' &&
        <button
          type="button"
          className={`cursor-pointer bg-zinc-900 text-white text-[13px] w-[220px] rounded-md py-2 px-4 hover:bg-zinc-700 transition-all ${
            isPicotValid ? '' : 'opacity-50 cursor-not-allowed'
          }`}
          disabled={!isPicotValid}
          onClick={async () => {
            if (isPicotValid) {
              const payload = buildReportPayload(picotState, fullQuestion, user);

              try {
                const res = await fetch("api/generate-report", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    ...payload,
                    generateReport: true,
                  }),
                });

                const data = await res.json();
                setStartReportGeneration(true)
                setReportData(data);
              } catch (err) {
                console.error("❌ Report generation failed:", err);
              }
            }
          }}
        >
          Generate Report
        </button>
      }
      </form>
    </div>
  );
}
