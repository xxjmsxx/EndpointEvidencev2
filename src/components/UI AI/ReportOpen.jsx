import React from 'react'
import {useState} from 'react'

import ReportGraphs from "@/components/DemoPharma/ReportGraph"

export default function ReportOpen({reportData}) {
  const menù = [
    { label: "Patient Care", value: 1 },
    { label: "Protocol", value: 2 },
    { label: "Research", value: 3 },
    { label: "Quality", value: 4 },
    { label: "Operations", value: 5 },
    { label: "Population", value: 6 },
  ];

  const HeaderMenù = []

  const [pressed, setPressed] = useState(3)

  const rweReport = reportData.report // do some error handling

  console.log("Here is the best report in the world💊💊💊", reportData)

  const headerStyle = "font-extralight"

  const generalInformation = rweReport.generalInformation
  const summary = rweReport.studyResult.summary
  const studyResults = rweReport.studyResult
  const conclusion = rweReport.studyResult.conclusion

  return (
    <div className="flex flex-col gap-4 w-full mt-2 max-w-3xl bg-white rounded-xl py-3 mx-auto mb-4 text-sm leading-relaxed">

      {/* Header */}
      <div className="flex flex-row px-4 gap-4 w-full bg-zinc-900 py-3 text-white justify-between text-xs">
        <div>
          <h3 className="font-medium text-[0.7rem]">Study Design</h3>
          <p className={headerStyle}>{generalInformation.studyDesign}</p>
        </div>
        <div>
          <h3 className="font-medium text-[0.7rem]">By</h3>
          <p className={headerStyle}>{generalInformation.fullName}</p>
        </div>
        <div>
          <h3 className="font-medium text-[0.7rem]">Specialty</h3>
          <p className={headerStyle}>{generalInformation.specialty}</p>
        </div>
        <div>
          <h3 className="font-medium text-[0.7rem]">Study Date</h3>
          <p className={headerStyle}>{generalInformation.dateRequest}</p>
        </div>
      </div>

      {/* Menu */}
      <div className="flex flex-row gap-2 px-4 items-center">
        {menù.map((m, i) => (
          <div key={i}
            className={`px-3 py-2 text-center text-xs cursor-pointer border font-medium rounded-md w-[18%] transition-all ${pressed === m.value ? "bg-blue-100 border-blue-100" : "border-zinc-300"}`}
            onClick={() => { setPressed(m.value) }}>
            {m.label}
          </div>
        ))}
      </div>

      {/* Abstract */}
      <div className="bg-gray-100 py-3 px-3 mx-4 space-y-2">
        <h4 className="font-semibold text-base">Abstract</h4>
        <p>{studyResults.abstract}</p>
      </div>

      {/* Question */}
      <div className="px-2 mx-4 space-y-2">
        <h4 className="font-semibold text-base">Question</h4>
        <p>{rweReport.studyRequest.fullQuestion}</p>
      </div>

      {/* Summary */}
      <div className="flex flex-col gap-3 px-2 mx-4">
        <h4 className="font-semibold text-base">Summary</h4>
        <div className="space-y-3">
          <div>
            <h5 className="font-bold text-xs">DATA SOURCES</h5>
            <p>{summary.dataSources}</p>
          </div>
          <div>
            <h5 className="font-bold text-xs">PATIENT COHORT</h5>
            <p>{summary.patientCohort}</p>
          </div>
          <div>
            <h5 className="font-bold text-xs">TREATMENT GROUPS</h5>
            <p>{summary.treatmentGroups}</p>
          </div>
          <div>
            <h5 className="font-bold text-xs">KEY FINDINGS</h5>
            {summary?.keyFindings && (
              <div className="space-y-3">
                <ul className="list-disc pl-5 space-y-2">
                  {Object.entries(summary.keyFindings).map(([key, finding]) => (
                    finding && (
                      <li key={key} className="text-sm space-y-1">
                        <div className="font-medium text-xs uppercase">
                          {key.replace(/([A-Z])/g, " $1")}:
                        </div>
                        <div>{finding.description}</div>
                      </li>
                    )
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Conclusion */}
      <div className="px-2 mx-4 space-y-2">
        <h4 className="font-semibold text-base">Conclusion</h4>
        <p>{conclusion}</p>
      </div>

      {/* Demographics */}
      <div className="flex flex-col gap-3 px-2 mx-4">
        <div className="font-semibold text-base bg-gray-100 py-1 px-2">
          Demographics
        </div>
        <ReportGraphs demographics={studyResults.demographics} />
      </div>
    </div>
  )
}
