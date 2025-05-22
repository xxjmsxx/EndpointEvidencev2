import React from "react";

export default function StudyFramework() {
  return (
    <div className="py-5 px-6 rounded-xl border border-zinc-200 bg-white shadow-sm space-y-5 text-zinc-800">
      <h1 className="text-2xl font-semibold">Study Protocol</h1>

      <section>
        <h2 className="text-xl font-medium mb-2">Study Title</h2>
        <p className="text-sm leading-relaxed bg-zinc-50 px-3 py-2">
          Comparative Effectiveness of Pembrolizumab (Keytruda) plus
          Sacituzumab Govitecan (Trodelvy) versus Pembrolizumab plus Standard
          Chemotherapy in Metastatic NSCLC Patients with High PD-L1 and
          Trop-2 Expression: A Real-World Evidence Study
        </p>
      </section>

      <hr className="border-zinc-200" />

      <section>
        <h2 className="text-xl font-medium mb-2">Study Design</h2>
        <p className="text-sm leading-relaxed">
          This is a <em>retrospective, observational cohort study</em> using federated
          real-world data sources. The study will employ <strong>propensity score matching</strong> to balance baseline
          characteristics between treatment groups and minimize selection bias
          inherent in non-randomized treatment assignments.
        </p>
      </section>

      <hr className="border-zinc-200" />

      <section>
        <h2 className="text-xl font-medium mb-2">Data Sources</h2>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Electronic Health Records (EHRs) from participating healthcare systems</li>
          <li>Claims databases with longitudinal patient data</li>
          <li>Cancer registries with detailed tumor characteristics</li>
          <li>Biomarker testing databases with PD-L1 and Trop-2 expression data</li>
          <li>Pharmacy dispensing records for treatment verification</li>
        </ul>
      </section>

      <hr className="border-zinc-200" />

      <section>
        <h2 className="text-xl font-medium mb-2">Study Population</h2>
        <h3 className="text-sm font-semibold">Inclusion Criteria:</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Adults ≥18 years of age</li>
          <li>Histologically or cytologically confirmed metastatic NSCLC</li>
          <li>High PD-L1 expression (Tumor Proportion Score ≥50%)</li>
          <li>High Trop-2 expression (confirmed by immunohistochemistry)</li>
          <li>Received either Keytruda + Trodelvy or Keytruda + standard chemotherapy as first-line or second-line therapy</li>
          <li>Treatment initiated between January 2020 and December 2023</li>
          <li>Minimum of 6 months follow-up data available</li>
        </ul>
        <h3 className="text-sm font-semibold mt-4">Exclusion Criteria:</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Prior immunotherapy treatment</li>
          <li>Concurrent enrollment in interventional clinical trials</li>
          <li>Active autoimmune disease requiring systemic treatment</li>
          <li>Presence of EGFR mutations, ALK or ROS1 rearrangements, or other driver mutations with approved targeted therapies</li>
          <li>Inadequate organ function at baseline</li>
          <li>Missing baseline data on key prognostic factors</li>
        </ul>
      </section>

      <hr className="border-zinc-200" />

      <section>
        <h2 className="text-xl font-medium mb-2">Treatment Cohorts</h2>
        <h3 className="text-sm font-semibold">Intervention Cohort:</h3>
        <p className="text-sm leading-relaxed">
          Patients who received Keytruda (pembrolizumab, 200mg IV every 3 weeks) in combination with Trodelvy (sacituzumab govitecan, 10mg/kg IV on days 1 and 8 of 21-day cycles)
        </p>
        <h3 className="text-sm font-semibold mt-4">Comparison Cohort:</h3>
        <p className="text-sm leading-relaxed">
          Patients who received Keytruda (pembrolizumab, 200mg IV every 3 weeks) in combination with platinum-based chemotherapy (carboplatin or cisplatin plus pemetrexed for non-squamous or paclitaxel for squamous histology, administered per standard dosing schedules)
        </p>
      </section>

      <hr className="border-zinc-200" />

      <section>
        <h2 className="text-xl font-medium mb-2">Outcome Measures</h2>
        <h3 className="text-sm font-semibold">Primary Outcome:</h3>
        <p className="text-sm">Overall Survival (OS): Time from treatment initiation to death from any cause</p>
        <h3 className="text-sm font-semibold mt-4">Secondary Outcomes:</h3>
        <p className="text-sm">Progression-Free Survival (PFS): Time from treatment initiation to disease progression (per RECIST v1.1 criteria) or death from any cause</p>
        <h3 className="text-sm font-semibold mt-4">Exploratory Outcomes:</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Treatment-related adverse events (graded per CTCAE v5.0)</li>
          <li>Quality of life measures (when available)</li>
        </ul>
      </section>

      <hr className="border-zinc-200" />

      <section>
        <h2 className="text-xl font-medium mb-2">Statistical Analysis Plan</h2>
        <h3 className="text-sm font-semibold">Sample Size Considerations:</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Target minimum of 200 patients per treatment group after matching</li>
          <li>Power calculation based on detecting a hazard ratio of 0.75 for OS with 80% power and two-sided alpha of 0.05</li>
        </ul>
        <h3 className="text-sm font-semibold mt-4">Propensity Score Matching:</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Demographics: age, sex, race/ethnicity</li>
          <li>Clinical: ECOG performance status, smoking history, comorbidities</li>
          <li>Disease characteristics: histology, stage, sites of metastases</li>
          <li>Laboratory values: baseline organ function tests</li>
          <li>Prior treatments: surgery, radiation, systemic therapies</li>
          <li>PD-L1 expression level (as continuous variable)</li>
          <li>Trop-2 expression level (as continuous variable)</li>
        </ul>
        <p className="text-sm mt-2">1:1 matching using nearest neighbor method with caliper width of 0.2 standard deviations</p>
        <p className="text-sm">Assessment of balance using standardized mean differences (&lt;0.1 considered adequate)</p>
        <h3 className="text-sm font-semibold mt-4">Effectiveness Analysis:</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Time-to-event outcomes (OS, PFS) analyzed using Kaplan-Meier method and Cox proportional hazards models</li>
          <li>Subgroup analyses by age, sex, histology, and line of therapy</li>
          <li>Sensitivity analyses using different matching algorithms and inverse probability of treatment weighting</li>
        </ul>
        <h3 className="text-sm font-semibold mt-4">Safety Analysis:</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Descriptive statistics for adverse events by treatment group</li>
          <li>Time to adverse event onset using cumulative incidence functions</li>
          <li>Multivariate models to identify predictors of severe toxicity</li>
        </ul>
      </section>

      <hr className="border-zinc-200" />

      <section>
        <h2 className="text-xl font-medium mb-2">Data Management and Quality Control</h2>
        <h3 className="text-sm font-semibold">Data Extraction:</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Standardized query definitions across federated data sources</li>
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
          <li>Data de-identification and privacy protection</li>
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
