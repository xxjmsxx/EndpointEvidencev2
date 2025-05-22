import React from "react";

export default function StudyFramework() {
  return (
    <div className="py-5 px-6 rounded-xl border border-zinc-200 bg-white shadow-sm space-y-5 text-zinc-800">
      <h1 className="text-2xl font-semibold">Study Protocol</h1>

      <section>
        <h2 className="text-xl font-medium mb-2">Study Title</h2>
        <p className="text-sm leading-relaxed bg-zinc-50 px-3 py-2">
          Comparative Effectiveness of Sotorasib (Lumykras®) + Panitumumab (Vectibix®) versus Adagrasib (Krazati®) + Cetuximab (Erbitux®) in Metastatic Colorectal Cancer Patients with KRAS G12C Mutations: A Retrospective Real-World Evidence Study
        </p>
      </section>

      <hr className="border-zinc-200" />

      <section>
        <h2 className="text-xl font-medium mb-2">Study Design</h2>
        <p className="text-sm leading-relaxed">
          This is a <em>retrospective, observational cohort study</em> leveraging federated real-world data. <strong>Propensity-score matching</strong> will be used to balance baseline characteristics between the two treatment groups and mitigate selection bias inherent in non-randomized analyses.
        </p>
      </section>

      <hr className="border-zinc-200" />

      <section>
        <h2 className="text-xl font-medium mb-2">Data Sources</h2>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Electronic Health Records (EHRs) from participating oncology centers</li>
          <li>Molecular diagnostics databases for KRAS G12C mutation status</li>
          <li>Pharmacy dispensing records to verify treatment initiation and dosing</li>
          <li>Laboratory systems capturing CEA levels and other baseline labs</li>
        </ul>
      </section>

      <hr className="border-zinc-200" />

      <section>
        <h2 className="text-xl font-medium mb-2">Study Population</h2>
        <h3 className="text-sm font-semibold">Inclusion Criteria:</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Age ≥ 18 years</li>
          <li>Histologically or cytologically confirmed metastatic colorectal cancer</li>
          <li>Documented KRAS G12C mutation</li>
          <li>Received ≥ 1 prior systemic therapy for metastatic disease</li>
          <li>Initiation of Lumykras + Vectibix or Krazati + Erbitux between January 2022 and December 2024</li>
          <li>Available follow-up through at least 12 months or until death</li>
        </ul>
        <h3 className="text-sm font-semibold mt-4">Exclusion Criteria:</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Concurrent enrollment in an interventional clinical trial</li>
          <li>Prior exposure to any KRAS G12C inhibitor before cohort entry</li>
          <li>Active second primary malignancy (except non-melanoma skin cancer)</li>
          <li>Missing data on key prognostic factors (ECOG, metastatic-site category, baseline CEA)</li>
        </ul>
      </section>

      <hr className="border-zinc-200" />

      <section>
        <h2 className="text-xl font-medium mb-2">Treatment Cohorts</h2>
        <h3 className="text-sm font-semibold">Intervention Cohort:</h3>
        <p className="text-sm leading-relaxed">
          Sotorasib (Lumykras®) 960&nbsp;mg orally once daily + Panitumumab (Vectibix®) 6&nbsp;mg/kg IV every 2&nbsp;weeks
        </p>
        <h3 className="text-sm font-semibold mt-4">Comparison Cohort:</h3>
        <p className="text-sm leading-relaxed">
          Adagrasib (Krazati®) 600&nbsp;mg orally twice daily + Cetuximab (Erbitux®) 400&nbsp;mg/m² IV loading, then 250&nbsp;mg/m² weekly
        </p>
      </section>

      <hr className="border-zinc-200" />

      <section>
        <h2 className="text-xl font-medium mb-2">Outcome Measures</h2>
        <h3 className="text-sm font-semibold">Primary Outcome:</h3>
        <p className="text-sm">Progression-Free Survival (PFS), defined per RECIST v1.1 from treatment start to radiographic progression or death, with all patients censored at 12&nbsp;months</p>
        <h3 className="text-sm font-semibold mt-4">Key Secondary Outcome:</h3>
        <p className="text-sm">Restricted Mean Survival Time for Overall Survival up to 12&nbsp;months (RMST@12)</p>
        <h3 className="text-sm font-semibold mt-4">Exploratory Outcomes:</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Incidence and grade of treatment-related adverse events (CTCAE v5.0)</li>
        </ul>
      </section>

      <hr className="border-zinc-200" />

      <section>
        <h2 className="text-xl font-medium mb-2">Statistical Analysis Plan</h2>
        <h3 className="text-sm font-semibold">Sample Size Considerations:</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Target minimum of 200 patients per treatment group after matching</li>
          <li>Power calculation based on detecting a hazard ratio of 0.78 for PFS with 80% power and a two-sided alpha of 0.05</li>
        </ul>
        <h3 className="text-sm font-semibold mt-4">Propensity Score Matching:</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Covariates: age, sex, ECOG, prior lines, metastatic-site category (liver-only, lung-only, multi-organ), baseline CEA, prior anti-EGFR use</li>
          <li>1:1 nearest-neighbor matching with caliper = 0.2 SD of the logit</li>
          <li>Balance assessed by standardized mean differences (&lt; 0.10)</li>
        </ul>
        <h3 className="text-sm font-semibold mt-4">Effectiveness Analysis:</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>PFS: Kaplan–Meier estimation; log-rank test; Cox proportional-hazards model to estimate hazard ratio (HR, 95% CI)</li>
          <li>Subgroup treatment effects by baseline CEA level (high ≥ 20 ng/mL vs. low), prior anti-EGFR exposure (yes vs. no), primary tumor sidedness (left vs. right), number of prior therapy lines (1 vs. ≥ 2), ECOG performance status (0–1 vs. ≥ 2), age group (&lt; 65 vs. ≥ 65), and gender</li>
          <li>OS via RMST@12: area under each KM curve up to 12&nbsp;months; compare ΔRMST with robust variance</li>
        </ul>
        <h3 className="text-sm font-semibold mt-4">Safety Analysis:</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Summarize Grade ≥ 3 adverse events by treatment arm; compare via χ² or Fisher’s exact test</li>
          <li>Time to first Grade ≥ 3 event using cumulative incidence functions</li>
        </ul>
        <h3 className="text-sm font-semibold mt-4">Subgroup &amp; Sensitivity Analyses:</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Interaction terms for treatment × subgroup in Cox/RMST models</li>
          <li>Inverse-probability-of-treatment weighting as an alternative to matching</li>
        </ul>
      </section>

      <hr className="border-zinc-200" />

      <section>
        <h2 className="text-xl font-medium mb-2">Data Management and Quality Control</h2>
        <h3 className="text-sm font-semibold">Data Extraction:</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Standardized, centrally validated query scripts deployed across federated data partners</li>
          <li>Validation of extracted data using reliability engine</li>
        </ul>
        <h3 className="text-sm font-semibold mt-4">Missing Data Handling:</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Multiple imputation for variables with &lt;20% missing data</li>
          <li>Complete case analysis and sensitivity analyses for variables with &gt;20% missing data</li>
        </ul>
        <h3 className="text-sm font-semibold mt-4">Quality Control:</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Data validation checks for implausible values</li>
          <li>Consistency checks across related variables</li>
          <li>Temporal sequence verification for treatment and outcomes</li>
        </ul>
      </section>

      <hr className="border-zinc-200" />

      <section>
        <h2 className="text-xl font-medium mb-2">Ethical Considerations</h2>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>IRB approval or exemption determination</li>
          <li>Aggregate reporting only; no patient identifiers shared</li>
          <li>Compliance with relevant regulations (HIPAA, GDPR as applicable)</li>
        </ul>
      </section>

      <hr className="border-zinc-200" />

      <section>
        <h2 className="text-xl font-medium mb-2">Limitations and Considerations</h2>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Potential for residual confounding despite propensity score matching</li>
          <li>Variability in outcome assessment in real-world setting</li>
          <li>Potential for immortal time bias and guarantee-time bias</li>
          <li>Heterogeneity in treatment patterns and dose modifications</li>
          <li>Missing data on important confounders</li>
          <li>Variability in biomarker testing methodologies across institutions</li>
        </ul>
      </section>
    </div>
  );
}
