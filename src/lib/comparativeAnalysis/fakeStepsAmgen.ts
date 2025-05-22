export const comparativeAnalysisMessagesAmgen = [
  // Rules:
  // 1) If a tool is available, there should not be an auto_continue field, because continuation is triggered after the tool
  // 2) there should not be a timer if there is not a tool_call
  {
    stepNumber: 1,
    content: `I'll help you test the comparative effectiveness of **Lumykras (sotorasib) + Vectibix (panitumumab)** versus **Krazati (adagrasib) + Erbitux (cetuximab)** in adult patients with metastatic colorectal cancer harboring a KRAS G12C mutation who have received prior systemic treatment.

              Let me gather information and design a comparative analysis for this specific patient population.

              ### Clarify user requirements for the comparative effectiveness analysis

              I'd like to confirm a few details about your request to compare those two regimens in KRAS G12C-mutant mCRC after prior therapy:

              **Outcomes:** Are you interested in specific endpoints such as overall survival (OS), progression-free survival (PFS), or safety/quality-of-life measures?`,
  },
  {
    stepNumber: 2,
    content: `Thank you for clarifying. This is a Real-World Evidence (RWE) study comparing Lumykras + Vectibix versus Krazati + Erbitux in previously treated KRAS G12C mCRC patients.

              I'll focus on PFS as the primary endpoint, use Restricted Mean Survival Time (RMST) up to 12 months for OS as the key secondary endpoint, and report treatment-related adverse events as exploratory. I'll create a comprehensive analysis including federated data access, data querying, transformation, analytics, and a full report.

              ## Formulating the research question

              Let's start by formulating our research question in the **PICOT** format, which will provide a clear structure for our RWE study.

              | Component        | Description                                                                                                                                                                                                             |
              | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
              | **Population**   | adult patients with metastatic colorectal cancer (CRC) harboring a KRAS G12C mutation, who have received ≥ 1 prior systemic therapy.                                                                                     |
              | **Intervention** | Sotorasib (Lumykras®) + panitumumab (Vectibix®).                                                                                                                                                                        |
              | **Comparison**   | Adagrasib (Krazati®) + cetuximab (Erbitux®).                                                                                                                                                                            |
              | **Outcomes**     | *Primary:* Progression-Free Survival (PFS) - *Key Secondary:* Restricted Mean Survival Time (RMST) for overall survival (OS) up to 12 months - *Exploratory:*  Incidence and grade of treatment-related adverse events. |
              | **Timeframe**    | 12-month follow-up period from treatment initiation.                                                                                                                                                                     |


              **Refined Research Question:**

              > Among adult patients with metastatic CRC and a KRAS G12C mutation who underwent prior systemic therapy, does treatment with sotorasib + panitumumab versus adagrasib + cetuximab lead to superior progression-free survival over 12 months - and, secondarily, a greater mean survival time through month 12 (RMST@12) - in a retrospective cohort study?

              Please confirm to proceed.`
  },
  {
    stepNumber: 3,
    content: `### PICOT format verified.
              I'll proceed with performing a complete analysis workflow to demonstrate how this study could be conducted. This will include study design, patient cohort definition, statistical methodology, results visualization, and interpretation. I'll work on this right away.

              Moving to designing the RWE study protocol for comparing Lumykras + Vectibix versus Krazati + Erbitux in metastatic KRAS G12C-mutant CRC patients.`,
    tool_used: "Designing the study protocol",
    timer: 3000
  },
  {
    stepNumber: 4,
    content: `
              I'll create the necessary files for the study protocol: \`rwe_study/todo.md\` \`rwe_study/study_protocol.md\` Verify and confirm to proceed.
              `,
    auto_continue: false,
  },
  {
    stepNumber: 5,
    content: `## Patient cohort definition

              Moving to retrieving cohort`,
    tool_used: "Cohort retrieval",
    timer: 6000
  },
  {
    stepNumber: 6,
    role: "system",
    name: "tool-result",
    content: `
              | Filter Step                             | Remaining Patients |
              |-----------------------------------------|--------------------|
              | Starting population                     | 58,743             |
              | After metastatic filter                 | 25,879             |
              | After KRAS G12C mutation filter         | 1,113              |
              | After ≥ 1 prior systemic therapy filter | 1,069              |
              | Final study population                  | 1,069              |

              ---
              `,
    auto_continue: true,
  },
  {
    stepNumber: 7,
    content: `## Classification of exposure status

              Moving to classifying exposure status`,
    tool_used: "Exposure classification",
    timer: 3000
  },
  {
    stepNumber: 8,
    role: "system",
    name: "tool-result",
    content: `
              | Key | Value |
              |-----|-------|
              | Lumykras + Vectibix group | 591 patients |
              | Krazati + Erbitux group     | 478 patients   |

              ---
              `,
    auto_continue: true,
  },
  {
    stepNumber: 9,
    content: `## Propensity score matching

              Moving to propensity score matching`,
    tool_used: "Propensity score matching",
    timer: 3000
  },
  {
    stepNumber: 10,
    role: "system",
    name: "tool-result",
    content: `
              - Identifying potential confounding variables
              - Pre-matching imbalance score: **0.36**
              - Post-matching imbalance score: **0.08**
              - Matched cohort size: **635 patients (318 Intervention arm, 317 Control arm)**

              ---`,
    auto_continue: true,
  },
  {
    stepNumber: 11,
    content: `## Outcome analysis

              Moving to outcome analysis`,
    tool_used: "Outcomes analysis",
    timer: 3000
  },
  {
    stepNumber: 12,
    role: "system",
    name: "tool-result",
    content: `
              **Progression-Free Survival (PFS) - Primary:**
                - Lumykras + Vectibix: median PFS = **5.6 months** (95 % CI: 4.2-6.3)
                - Krazati + Erbitux: median PFS = **6.9 months** (95 % CI: 6.0-7.8)
                - Hazard Ratio: **0.78** (95 % CI: 0.65-0.93)
                - p-value: **0.005**
                > **Interpretation:** Statistically significant longer PFS with the Krazati combination.

              **Overall Survival (OS) - Key Secondary via RMST@12:**
                - Lumykras + Vectibix: RMST@12 = **7.3 months**
                - Krazati + Erbitux: RMST@12 = **8.9 months**
                - ΔRMST = **1.6 months** (95 % CI: 0.8-2.4)
                - p-value: **< 0.001**
                > **Interpretation:** On average, patients on the Krazati regimen lived 1.6 months longer over the first year.


              ---
              `
,
    auto_continue: true,
  },
  {
    stepNumber: 13,
    content: `## Subgroup analysis

              Moving to subgroup analysis`,
    tool_used: "Subgroup analysis",
    timer: 3000
  },
  {
    stepNumber: 14,
    role: "system",
    name: "tool-result",
    content: `
              Treatment effect will be explored by baseline CEA level (high vs. low), prior anti-EGFR exposure (yes vs. no), primary tumor sidedness (left vs. right), number of prior therapy lines (1 vs. ≥2), ECOG performance status (0-1 vs. ≥2), age group (< 65 vs. ≥ 65), and gender.

              ---`,
    auto_continue: true,
  },
  {
    stepNumber: 14,
    content: `## Safety profile comparison

              Moving to safety profile comparison`,
    tool_used: "Safety profile comparison",
    timer: 3000
  },
  {
    stepNumber: 15,
    role: "system",
    name: "tool-result",
    content: `
              Grade 3+ adverse events occurred in:
              - Lumykras + Vectibix: **18.4%** of patients
              - Krazati + Erbitux: **22.1%** of patients
              - p-value: **0.15**

              ---
              `,
    auto_continue: true,
  },
  {
    stepNumber: 16,
    content: `## Finalizing the results and generating the report

              All analysis and tasks completed. Ready to generate the report and present findings to the user with all relevant files as attachments.`,
    tool_used: "Report generation",
    timer: 3000
  },
  {
    stepNumber: 15,
    role: "system",
    name: "tool-result",
    content: `
              I've completed the comprehensive Real-World Evidence (RWE) study comparing Lumykras + Vectibix versus Krazati + Erbitux in adult patients with metastatic KRAS G12C-mutant colorectal cancer who had received prior systemic therapy.
              Here's a summary of what was accomplished:

              ### Summary of Completed Tasks:

              1) Formulated a clear PICOT research question to guide the study
              2) Implemented federated queries to access and harmonize data across multiple hospital sites
              3) Queried and identified the specific patient population of interest (n=1,069)
              4) Performed data transformation and propensity-score matching to balance key confounders (matched cohort: 318 vs. 317)
              5) Calculated key clinical endpoints (PFS, RMST@12 for OS, and safety)
              6) Conducted statistical comparisons with adjustment for confounding
              7) Generated a comprehensive final report with detailed methodology, results, and visualizations

              ---

              ### Key Results:


              **Krazati + Erbitux was associated with significantly longer PFS (median 6.9 vs 5.6 months; HR 0.78, p = 0.005) and greater RMST@12 for OS (8.9 vs 7.3 months; ΔRMST 1.6 months, p < 0.001)**, while rates of Grade ≥ 3 adverse events were not significantly different between the two regimens.

              **Median Progression-Free Survival (Primary):**
              5.6 months for Lumykras + Vectibix
              6.9 months for Krazati + Erbitux


              **Overall Survival (Key Secondary via RMST@12):**
              7.3 months for Lumykras + Vectibix
              8.9 months for Krazati + Erbitux
              ΔRMST = 1.6 months

              **Serious AEs:**
              18.4% for Lumykras + Vectibix
              21.1% for Krazati + Erbitux

              ---

              The comprehensive report includes detailed methodology, results, discussion of implications, and recommendations for clinical practice and future research.
              `,
    auto_continue: true,
  }

]
