'use client'

import { CircleCheck, LoaderCircle, Circle } from 'lucide-react'

interface ChecklistProps {
  toolCall: string
  loadingStatus: Record<string, boolean>
}

const tasks = [
  "Designing the study protocol",
  "Cohort retrieval",
  "Treatment group assignment",
  "Propensity score matching",
  "Outcomes analysis",
  "Subgroup analysis",
  "Safety profile comparison",
  "Report generation"
]

export default function Todo({ toolCall, loadingStatus }: ChecklistProps) {
  const getStatus = (stepTitle: string): "done" | "loading" | "idle" => {
    if (toolCall && stepTitle.trim().toLowerCase() === toolCall.trim().toLowerCase()) {
      return loadingStatus[toolCall] === true ? "done" : "loading"
    }
    if (loadingStatus[stepTitle]) return "done"
    return "idle"
  }

  const renderIcon = (status: string) => {
    switch (status) {
      case "done":
        return <CircleCheck className="w-5 h-5 text-zinc-900" />
      case "loading":
        return <LoaderCircle className="w-5 h-5 text-blue-600 animate-spin" />
      default:
        return <Circle className="w-5 h-5 text-zinc-400" />
    }
  }

  return (
    <div className="rounded-xl border border-zinc-200 bg-white shadow-sm max-h-[70vh] overflow-auto px-6 py-5 space-y-5">
      <h2 className="text-2xl font-semibold text-zinc-900">Study Tasks</h2>
      <ul className="space-y-4">
        {tasks.map((task, index) => {
          const status = getStatus(task)
          const isDone = status === "done"

          return (
            <li
              key={task}
              className={`flex items-center justify-between gap-4 rounded-lg px-2 py-1 ${
                isDone
                  ? " border-2 border-zinc-100 bg-zinc-50 text-zinc-700"
                  : status === "loading"
                  ? "border-blue-100 bg-blue-50 text-blue-800"
                  : "bg-white font-light text-zinc-500"
              }`}
            >
              <div className="flex items-center gap-3 text-base">
                <span className="text-zinc-400">{index + 1}.</span>
                <span className={isDone ? "line-through" : ""}>{task}</span>
              </div>
              <div>{renderIcon(status)}</div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
