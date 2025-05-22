export const comparativeAnalysisMessages = [
  // Rules:
  // 1) If a tool is available, there should not be an auto_continue field, because continuation is triggered after the tool
  // 2) there should not be a timer if there is not a tool_call
  {
    stepNumber: 1,
    content: `I'll help you test the comparative effectiveness of **Keytruda (pembrolizumab) + chemotherapy** versus **Keytruda + Trodelvy (sacituzumab govitecan)** in patients with metastatic NSCLC (Non-Small Cell Lung Cancer) who are PD-L1 high and Trop-2 high.

              Let me gather information and design a comparative analysis for this specific patient population.

              ### Clarify user requirements for the comparative effectiveness analysis

              I'd like to clarify a few details about your request to test the comparative effectiveness of Keytruda + chemotherapy vs. Keytruda + Trodelvy in metastatic NSCLC patients with high PD-L1 and Trop-2 expression:

              **Outcomes:** Are you interested in specific endpoints such as overall survival (OS), progression-free survival (PFS), or quality of life measures?

              **Comparator group:** Are there specific chemotherapy regimens you'd like to focus on for the Keytruda + chemotherapy arm (e.g., platinum-based doublets, specific agents)?`,
  },
  {
    stepNumber: 2,
    content: `Thank you for clarifying. I understand this is a Real-World Evidence (RWE) study comparing Keytruda + chemotherapy vs. Keytruda + Trodelvy in metastatic NSCLC patients with high PD-L1 and Trop-2 expression.

              I'll focus on both endpoints (OS, PFS) and create a comprehensive analysis including federated data access, data querying, transformation, analytics, and a full report.

              ## Formulating the research question

              Let's start by formulating our research question in the **PICOT** format, which will provide a clear structure for our RWE study.

              | Component        | Description                                                                                                                                                 |
              | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
              | **Population**   | Adult patients with metastatic Non-Small Cell Lung Cancer (NSCLC) who have high PD-L1 expression(≥50%) and high Trop-2 expression                                      |
              | **Intervention** | Treatment with Keytruda (pembrolizumab) in combination with Trodelvy (sacituzumab govitecan).                                                                                                 |
              | **Comparison**   | Treatment with Keytruda (pembrolizumab) in combination with standard chemotherapy (platinum-based doublet therapy).                                                                          |
              | **Outcomes**     | *Primary:* Overall Survival (OS) - *Secondary:* Progression-Free Survival (PFS), ORR - *Exploratory:*  Treatment-related adverse events                                                      |
              | **Timeframe**    | Two-year follow-up period from treatment initiation                                                                                                         |


              **Refined Research Question:**

              > Among adult patients with metastatic non-small cell lung cancer with high PD-L1 expression (≥50%) and high Trop-2 expression, does treatment with pembrolizumab plus sacituzumab govitecan compared to pembrolizumab plus standard platinum-based chemotherapy result in improved overall survival and progression-free survival over a 24-month follow-up period?

              Please confirm to proceed.`
  },
  {
    stepNumber: 3,
    content: `### PICOT format verified.
              I'll proceed with performing a complete analysis workflow to demonstrate how this study could be conducted. This will include study design, patient cohort definition, statistical methodology, results visualization, and interpretation. I'll work on this right away.

              Moving to designing the RWE study protocol for comparing Keytruda combinations in metastatic NSCLC patients`,
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
              | Filter Step              | Remaining Patients |
              |--------------------------|--------------------|
              | Starting population      | 62,300             |
              | After metastatic filter  | 28,450             |
              | After PD-L1 high filter  | 8,535              |
              | After Trop-2 high filter | 2,142              |
              | Final study population   | 2,142              |

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
              | Keytruda + chemotherapy group | 1,876 patients |
              | Keytruda + Trodelvy group     | 260 patients   |

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
              - Pre-matching imbalance score: **0.42**
              - Post-matching imbalance score: **0.08**
              - Matched cohort size: **520 patients (260 in each arm)**

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
              **Overall Survival (OS):**
                - Keytruda + Chemotherapy: Median OS = **17.3 months**
                - Keytruda + Trodelvy: Median OS = **21.9 months**
                - Hazard Ratio: **0.82 (95% CI: 0.61–1.09)**
                - p-value: **0.1768**
                > **Interpretation:** Directional improvement in OS with the Trodelvy combination, but not statistically significant.

              **Progression-Free Survival (PFS):**
                - Keytruda + Chemotherapy: Median PFS = **3.9 months**
                - Keytruda + Trodelvy: Median PFS = **5.3 months**
                - Hazard Ratio: **0.76 (95% CI: 0.55–1.05)**
                - p-value: **0.0861**
                > **Interpretation:** Numerically longer PFS with Trodelvy; trend toward statistical significance.


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
              Treatment effect by histology, biomarker expression, line of therapy, ECOG, gender, age group

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
              - Keytruda + Trodelvy: **25.3%** of patients
              - Keytruda + Chemotherapy: **15.0%** of patients
              - P-value: **0.0499**

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
              I've completed the comprehensive Real-World Evidence (RWE) study comparing Keytruda + chemotherapy vs. Keytruda + Trodelvy in patients with metastatic NSCLC with high PD-L1 and Trop-2 expression.
              Here's a summary of what was accomplished:

              ### Summary of Completed Tasks:

              1) Formulated a clear PICOT research question to guide the study
              2) Implemented federated query to access data across multiple hospital sites
              3) Queried and identified the specific patient population of interest
              4) Performed data transformation and analysis to harmonize data across sites
              5) Calculated key clinical endpoints (OS, PFS, and safety)
              6) Conducted statistical comparisons with adjustment for confounding
              7) Generated a comprehensive final report with all findings

              ---

              ### Key Results:


              **No statistically significant** differences were found between Keytruda+Trodelvy and Keytruda+Chemotherapy across all endpoints

              **Median OS:**
              17.3 months for Keytruda+Chemotherapy
              21.9 months for Keytruda+Trodelvy (p=0.1768)

              **Median PFS:**
              3.9 months for Keytruda+Chemotherapy
              5.3 months for Keytruda+Trodelvy (p=0.0861)

              **Serious AEs:**
              15.0% for Keytruda+Chemotherapy
              25.3% for Keytruda+Trodelvy (p=0.0499)

              ---

              The comprehensive report includes detailed methodology, results, discussion of implications, and recommendations for clinical practice and future research.
              `,
    auto_continue: true,
  }

]
