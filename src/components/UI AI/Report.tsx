'use client'

import { useState, useRef } from 'react'
import { X, FileCheck, Download } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Plus } from '@/types/plus'

// TODO: For demo purposes, the title should be dynamic

export default function Report({plus}:{plus: Plus}) {
  const [open, setOpen] = useState(false)
  const reportRef = useRef(null)

  // TODO: For demo purposes, the title should be dynamic
  const demoTitleGilead = "Comparative Effectiveness of Keytruda Plus Chemotherapy vs. Keytruda Plus Trodelvy"
  const demoTitleAmgen = "Comparative Effectiveness of Lumykras + Vectibix vs. Krazati + Erbitux"

  const demoTitle = {
    oncology: {title: demoTitleGilead, description: "A comparative analysis of the effectiveness of Keytruda plus chemotherapy versus Keytruda plus Trodelvy in patients with PD-L1 high and Trop-2 high metastatic NSCLC"},
    neurology: {title: demoTitleAmgen, description: "A comparative analysis of the effectiveness of Lumykras + Vectibix vs. Krazati + Erbitux in patients with metastatic colorectal cancer harboring a KRAS G12C mutation who had received prior systemic therapy."}
  }

  const demoInformation = demoTitle[plus as keyof typeof demoTitle]

  return (
    <motion.div
      ref={reportRef}
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="flex flex-col gap-5 w-full max-w-3xl rounded-2xl py-4 px-5 mx-auto mb-6"
    >
      {/* Tag */}
      <div className="flex flex-row items-center justify-between gap-2 mb-2">
        <div className="rounded-md px-2.5 py-1 bg-blue-100 text-[13px] font-medium">
          Report ready
        </div>
      </div>

      {/* Header bar */}
      <div
        className="transition-transform duration-100 ease-in-out flex flex-row gap-6 justify-between items-center"
        onClick={() => setOpen(prev => !prev)}
      >
        <div className="bg-zinc-50 hover:scale-101 border border-zinc-200 rounded-md shadow cursor-pointer px-3 py-3 flex flex-row gap-3 items-top">
          {open ? (
            <X
              className="text-zinc-600 h-5 w-5 cursor-pointer transition-transform duration-100 ease-in-out hover:scale-125"
              onClick={(e) => {
                e.stopPropagation()
                setOpen(false)
              }}
            />
          ) : (
            <FileCheck className="h-7 w-7 text-zinc-500" />
          )}
          <div className="  flex flex-col gap-1 text-sm font-medium text-zinc-900">
            <h5 className="text-sm font-bold">{demoInformation.title}</h5>
            <p className="text-xs text-zinc-600">
              {demoInformation.description}
            </p>
          </div>
        </div>
        <div className="cursor-pointer">
          <Download
            className="text-zinc-600 h-4 w-4 transition-transform duration-100 ease-in-out hover:scale-125"
            onClick={(e) => {
              e.stopPropagation()
              console.log('Ready for download')
            }}
          />
          </div>

      </div>
    </motion.div>
  )
}
