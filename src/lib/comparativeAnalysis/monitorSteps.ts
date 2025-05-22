// For comparative analysis demo, used by EndpointMonitor.tsx

export const fakeSteps = [
  {
    stepNumber: 1,
    title: "Designing the study protocol",
    tabOptions: ["todo.md", "study_protocol.md"],
    status: "In Progress",
  },
  {
    stepNumber: 2,
    title: "Cohort retrieval",
    tabOptions: [
      "Initial Cohort",
      "Final Cohort",
    ],
    status: "In Progress",
  },
  {
    stepNumber: 3,
    title: "Exposure classification",
    tabOptions: [
      "Treatment",
      "Age",
      "Gender",
      "Comorbidity Count",
      "Comorbidity Distribution",
    ],
    status: "Failed",
  },
  {
    stepNumber: 4,
    title: "Propensity score matching",
    tabOptions: [
      "Matched Size",
      "Mean Differences",
      "Characteristics table",
      "Propensity Score Distribution",
    ],
    status: "Waiting",
  },
  {
    stepNumber: 5,
    title: "Outcomes analysis",
    tabOptions: ["Overall Survival (OS)", "Progression-Free Survival (PFS)"],
    status: "Completed",
  },
  {
    stepNumber: 6,
    title: "Subgroup analysis",
    tabOptions: ["Forest Plot"],
    status: "Completed",
  },
  {
    stepNumber: 7,
    title: "Safety profile comparison",
    tabOptions: ["Adverse Events"],
    status: "Completed",
  },
  {
    stepNumber: 8,
    title: "Report generation",
    tabOptions: ["Report"],
    status: "Completed",
  },
];
