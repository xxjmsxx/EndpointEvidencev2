"use client";

import { useState, useEffect } from "react";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";

//Icons
import { ChevronDown, ChevronUp, FileQuestion, LoaderCircle, Circle, CircleCheck, Dot, X, Cpu} from "lucide-react";
import Loader from '@/components/UI AI/Loader';

// Radix
import * as Menubar from '@radix-ui/react-menubar'

// Types
import { Step } from "@/types/step";
import { Plus } from "@/types/plus";
// For fake demo: components rendered inside EndpointMonitor
import { components } from '@/components/DemoPharma/commponentLoader';

// ================================
import { fakeSteps } from "@/lib/comparativeAnalysis/monitorSteps";

// Empty state when no data is available
function EmptyState() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center text-center text-zinc-500">
      <FileQuestion className="w-10 h-10 mb-4" strokeWidth={1.0} />
      <p className="text-sm font-medium">Nothing to show yet</p>
      <p className="text-xs text-zinc-400">Ask anything scientific</p>
    </div>
  );
}

function taskBar(
    showSteps: boolean,
    setShowSteps: React.Dispatch<React.SetStateAction<boolean>>,
    currentStatus: string,
    currentTitle: string,
    currentStep: number,
    setCurrentStep: (step: number) => void,
    handleCloseSteps: (index: number) => void,
    toolCall: string,
    loadingStatus: Record<string, boolean>,
  ) {

      const getStatusIcon = (stepTitle: string): "done" | "loading" | "idle" => {
        if (
          toolCall &&
          stepTitle.trim().toLowerCase() === toolCall.trim().toLowerCase()
        ) {
          if (loadingStatus[toolCall] === true) return "done";
          return "loading";
        }

        if (loadingStatus[stepTitle]) return "done";

        return "idle";
      };

      const renderStatusIcon = (status: "done" | "loading" | "idle") => {
        switch (status) {
          case "done":
            return <CircleCheck className="w-4 h-4 text-zinc-900" />;
          case "loading":
            return <LoaderCircle className="w-4 h-4 text-zinc-900 animate-spin" />;
          default:
            return <Circle className="w-4 h-4 text-zinc-400" />;
        }
      };

  return (
    <>
      <div
        onClick={() => setShowSteps((prev) => !prev)}
        className={`border border-zinc-300 cursor-pointer relative bg-zinc-50 hover:bg-zinc-100 transition-all rounded-lg px-3 py-2 shadow-sm mt-10`}>
        <div className="flex justify-between items-center">
          {/* Left: status + title */}
          <div className="text-sm font-light flex items-center gap-2 text-black">
            <span>{renderStatusIcon(getStatusIcon(currentTitle))}</span>
            <span>{toolCall ? currentTitle : "Waiting for a research question..."}</span>
          </div>

          {/* Right: progress + toggle */}
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <span>
              {toolCall ? `${currentStep + 1}/${fakeSteps.length}` : ""}
            </span>
            <button
              onClick={() => setShowSteps((prev) => !prev)}
              className="text-zinc-600 hover:text-zinc-900 cursor-pointer"
            >
              {showSteps ? <ChevronUp className="w-4 h-4" strokeWidth={1.5} /> : <ChevronDown className="w-4 h-4" strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showSteps && (
            <motion.div
              key="step-dropdown"
              initial={{ opacity: 0, y: -4, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="border border-zinc-300 absolute top-full left-0 right-0 z-10 mt-2 bg-white rounded-lg shadow-md max-h-60 overflow-auto">
                {fakeSteps.map((step, index) => (
                  <div
                    key={step.stepNumber}
                    onClick={(e) => {
                      const status = getStatusIcon(step.title);
                      if (status === "idle") return;
                      e.stopPropagation();
                      handleCloseSteps(index);
                    }}
                    className={`px-3 py-2 cursor-pointer transition text-sm font-light
                      ${
                        getStatusIcon(step.title) === "idle"
                        ? "pointer-events-none opacity-50 select-none"
                        : "cursor-pointer"}
                      ${
                        index === currentStep
                          ? "bg-zinc-100 text-zinc-900 font-normal"
                          : "hover:bg-zinc-50 text-zinc-600"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2 items-start">
                        <span className="text-zinc-400">{step.stepNumber}.</span>
                        <span>{step.title}</span>
                      </div>
                      <span
                        className={`text-sm`}
                      >
                        {renderStatusIcon(getStatusIcon(step.title))}
                      </span>
                    </div>
                  </div>
                ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export function TabNavigation({
  activeTab,
  current,
  setActiveTab,
}: {
  activeTab: string
  current: Step
  setActiveTab: (tab: string) => void
}) {
  return (
    <Menubar.Root className="flex h-10 items-center rounded-md border border-zinc-200 bg-white px-1 text-sm shadow-sm mt-4 overflow-x-auto no-scrollbar">
      {current.tabOptions.map((tab: string) => (
        <Menubar.Menu key={tab}>
          <Menubar.Trigger
            onClick={() => setActiveTab(tab)}
            className={`
              cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm transition-colors
              focus:outline-none focus:bg-accent focus:text-accent-foreground
              disabled:opacity-50 disabled:pointer-events-none
              data-[state=open]:bg-zinc-100 data-[state=open]:text-black
              ${activeTab === tab ? 'bg-zinc-100 text-black font-normal' : 'text-zinc-600 hover:bg-zinc-50 font-light'}
            `}
            data-state={activeTab === tab ? 'open' : undefined}
          >
            {tab}
          </Menubar.Trigger>
        </Menubar.Menu>
      ))}
    </Menubar.Root>

  )
}

function contentManager(
  toolCall: string,
  tabComponentMap: Record<string, React.ReactNode>,
  activeTab: string,
  loadingComplete: boolean,
  current: Step,
  setActiveTab: (tab: string) => void) {

  if (toolCall && tabComponentMap[activeTab] && loadingComplete) {
    return (
      <>
      <div className="flex flex-col h-full gap-4 p-1">
        {/* Tab navigation */}
        <TabNavigation activeTab={activeTab} current={current} setActiveTab={setActiveTab}/>
        {/* {tabNavigation(activeTab, current, setActiveTab)} */}

        {/* Content */}
        <div className="border border-zinc-300 bg-zinc-50 h-[70vh] overflow-y-auto rounded-lg p-10 mb-4 -mt-1 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
          {tabComponentMap[activeTab]}
        </div>
      </div>
      </>
    )
  }

  if (toolCall && tabComponentMap[activeTab]) {
    return (
      // TODO: add a loading spinner here


      <div className="flex flex-col h-full gap-4 p-1">
        <div className="border border-zinc-300 bg-gray-50 h-[75vh] overflow-y-auto rounded-lg p-10 mb-4 mt-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
          <div className="w-full h-full flex items-center justify-center">
            <Loader />
          </div>
        </div>
      </div>

    )
  }

  else {
    return(
      <>
      <div className="flex flex-col h-full gap-4 p-1">
        <div className="border border-zinc-300 bg-gray-50 h-[75vh] overflow-y-auto rounded-lg p-10 mb-4 mt-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
          <EmptyState />
        </div>
      </div>
      </>
    )
  }

}

export default function EndpointMonitor({
    canvasOpen,
    setCanvasOpen,
    plus,
    currentStep,
    setCurrentStep,
    toolCall,
    loadingStatus,
  }:
  {
    canvasOpen: boolean,
    setCanvasOpen: (open: boolean) => void,
    plus: Plus,
    currentStep: number,
    setCurrentStep: (step: number) => void,
    toolCall: string,
    loadingStatus: Record<string, boolean>,
    setLoadingStatus: (status: Record<string, boolean>) => void
  }) {

  // If the plus is not found, set the plus to default: lung-cancer
  let componentSetter = 'lung-cancer';
  if (components[plus as keyof typeof components]) {
    componentSetter = plus;
  }

  const {
    Todo,
    StudyProtocol,
    TreatmentDistributionChart,
    AgeDistributionGraph,
    GenderDistributionChart,
    ComorbidityCount,
    ComorbidityDistribution,
    CohortGeographyInitial,
    CohortGeographyFinal,
    CohortSizeChart,
    BalanceImprovementChart,
    PatientCharacteristicsTable,
    PropensityScoreDistribution,
    KMChart,
    PFSChart,
    ForestPlot,
    AdverseEvents,
    FakeReport,
  } = components[componentSetter as keyof typeof components];


  const tabComponentMap: Record<string, React.ReactNode> = {
    "todo.md": <Todo toolCall={toolCall} loadingStatus={loadingStatus}/>,
    "study_protocol.md": <StudyProtocol />,
    "Treatment": <TreatmentDistributionChart />,
    "Age": <AgeDistributionGraph />,
    "Gender": <GenderDistributionChart />,
    "Comorbidity Count": <ComorbidityDistribution />,
    "Comorbidity Distribution": <ComorbidityCount />,
    "Initial Cohort": <CohortGeographyInitial />,
    "Final Cohort": <CohortGeographyFinal />,
    "Matched Size": <CohortSizeChart />,
    "Mean Differences": <BalanceImprovementChart />,
    "Characteristics table": <PatientCharacteristicsTable />,
    "Propensity Score Distribution": <PropensityScoreDistribution />,
    "Overall Survival (OS)": <KMChart />,
    "Progression-Free Survival (PFS)": <PFSChart />,
    "Forest Plot": <ForestPlot />,
    "Adverse Events": <AdverseEvents />,
    "Report": <FakeReport />,
  };

  const [showSteps, setShowSteps] = useState(false);
  const [activeTab, setActiveTab] = useState(
    fakeSteps[0].tabOptions?.[0] ?? ""
  );

  const current = {
    ...fakeSteps[currentStep],
    status: fakeSteps[currentStep].status as Step["status"],
  };

  useEffect(() => {
    const { tabOptions } = fakeSteps[currentStep];
    setActiveTab(tabOptions?.[0] ?? "");
  }, [currentStep]);

  const handleCloseSteps = (index: number) => {
    setShowSteps(false);
    setCurrentStep(index);
  }

  return (
    <div className="overflow-auto px-4 h-full z-50 bg-white shadow-[0_0_10px_rgba(0,0,0,0.1)]">
      <div className="flex flex-col px-2 ">
        <div className="flex flex-row justify-between items-start py-4 gap-4 h-16">
          <button
            type="button"
            className={'cursor-pointer flex items-center h-[90%] gap-2 px-3 py-1 border text-sm font-extralight text-black rounded-lg bg-zinc-50 hover:bg-zinc-100 border-zinc-300 transition shadow-sm'}
          >
            <Cpu strokeWidth={1.0} className="h-4 w-4" />
              Endpoint Monitor
            <div className="flex items-center text-green-700">
              <Dot className="size-4"/>
              Connected
            </div>
          </button>

          <div className="flex flex-row justify-between items-center gap-4">
            <SignedIn>
              <UserButton afterSignOutUrl="/sign-in"/>
            </SignedIn>

            <button onClick={() => setCanvasOpen(!canvasOpen)} className="rounded-md p-1 hover:bg-zinc-200 cursor-pointer">
              <X className="h-5 w-6 text-zinc-600" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Task bar */}
        {taskBar(showSteps, setShowSteps, current.status, current.title, currentStep, setCurrentStep, handleCloseSteps, toolCall, loadingStatus)}
        {contentManager(toolCall,tabComponentMap, activeTab, loadingStatus[toolCall] ?? false, current, setActiveTab)}

      </div>
    </div>
  );
}
