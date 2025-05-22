import React from "react";

export default function ComparativeEffectivenessReport() {
  return (
    <div className="py-5 px-6 rounded-xl border border-zinc-200 bg-white shadow-sm space-y-5 text-zinc-800">

      <h1 className="text-2xl font-semibold">Comparative Effectiveness of Keytruda + Chemotherapy vs. Keytruda + Trodelvy</h1>
      <section>
        <h2 className="text-xl font-medium mb-2">Study Overview</h2>
        <p className="text-sm leading-relaxed">
          This real-world evidence (RWE) study compared the effectiveness of Keytruda (pembrolizumab) + chemotherapy versus Keytruda + Trodelvy (sacituzumab govitecan) in patients with metastatic non-small cell lung cancer (NSCLC) with high PD-L1 expression (≥50%) and high Trop-2 expression.
        </p>
      </section>
      <hr className="border-zinc-200" />
      <section>
        <h2 className="text-xl font-medium mb-2">Key Findings</h2>
        <p className="text-sm leading-relaxed mb-4">
        This real-world evidence (RWE) study compared the effectiveness of Keytruda (pembrolizumab) + chemotherapy versus Keytruda + Trodelvy (sacituzumab govitecan) in patients with metastatic non-small cell lung cancer (NSCLC) with high PD-L1 expression (≥50%) and high Trop-2 expression.
        </p>
        <h3 className="text-sm font-semibold">Overall Survival (OS)</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Median OS: 17.3 months for Keytruda+Chemotherapy vs. 21.9 months for Keytruda+Trodelvy</li>
          <li>Log-rank test p-value: p=0.1768</li>
          <li>The difference in OS was not statistically significant</li>
        </ul>

        <h3 className="text-sm font-semibold mt-4">Progression-Free Survival (PFS)</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Median PFS: 3.9 months for Keytruda+Chemotherapy vs. 5.3 months for Keytruda+Trodelvy</li>
          <li>Log-rank test p-value: 0.0861</li>
          <li>The difference in PFS was not statistically significant</li>
        </ul>

        <h3 className="text-sm font-semibold mt-4">Safety</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Grade ≥3 adverse events: 15.0% for Keytruda+Chemotherapy vs. 25.3% for Keytruda+Trodelvy</li>
          <li>Fisher exact test p-value: 0.0499</li>
          <li>Serious adverse events were significantly more frequent in the Keytruda+Trodelvy group</li>
        </ul>
      </section>

      <hr className="border-zinc-200" />

      <section>
        <h2 className="text-xl font-medium mb-2">Conclusions</h2>
        <p className="text-sm leading-relaxed">
          This real-world evidence study found no statistically significant differences between Keytruda+Trodelvy and Keytruda+Chemotherapy across the evaluated efficacy endpoints. Numerical differences favored the Keytruda+Trodelvy group, but these did not reach statistical significance. A statistically significant difference in safety outcomes was observed, with a higher incidence of Grade ≥3 adverse events in the Keytruda+Trodelvy group.
        </p>
        <p className="text-sm leading-relaxed">
          The limited sample size in the Trodelvy group may have reduced statistical power. Larger, prospective studies are warranted to validate these findings.
        </p>
      </section>

      <hr className="border-zinc-200" />

      <section>
        <h2 className="text-xl font-medium mb-2">Clinical Implications</h2>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Small sample size, especially for the Trodelvy group, limits power</li>
          <li>Non-randomized treatment assignment may introduce bias</li>
          <li>Residual confounding may remain</li>
          <li>Findings may not generalize to all NSCLC patients with high PD-L1 and Trop-2</li>
        </ul>
      </section>

      <hr className="border-zinc-200" />

      <section>
        <h2 className="text-xl font-medium mb-2">PICOT Framework</h2>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li><strong>Population:</strong> Adults with metastatic NSCLC, high PD-L1 and Trop-2</li>
          <li><strong>Intervention:</strong> Keytruda + Trodelvy</li>
          <li><strong>Comparison:</strong> Keytruda + platinum-based chemotherapy</li>
          <li><strong>Outcomes:</strong> OS (primary), PFS (secondary), safety (exploratory)</li>
          <li><strong>Time:</strong> Minimum 24-month follow-up</li>
        </ul>
      </section>

      <hr className="border-zinc-200" />

      <section>
        <h2 className="text-xl font-medium mb-2">Data Sources</h2>
        <p className="text-sm leading-relaxed">This study utilized a federated data approach to access and analyze patient data across multiple healthcare systems while maintaining strict data privacy and security standards. Patient-level data remained within each source institution, with only aggregated and de-identified results shared for analysis.</p>
        <p className="text-sm leading-relaxed">Data were sourced from eight European countries participating in the federated network, each contributing a portion of the final study population. These countries included both academic and community-based healthcare settings, representing diverse real-world clinical practices and patient demographics.</p>
        <table className="min-w-full text-sm mt-4 border border-zinc-300 rounded-md overflow-hidden">
          <thead>
            <tr className="bg-zinc-100 text-zinc-700 uppercase text-xs">
              <th className="px-4 py-2 text-left font-medium border-b border-zinc-300">Country</th>
              <th className="px-4 py-2 text-right font-medium border-b border-zinc-300">Before PSM</th>
              <th className="px-4 py-2 text-right font-medium border-b border-zinc-300">After PSM</th>
            </tr>
          </thead>
          <tbody className="text-zinc-800">
            {[
              { country: "Spain", before: 562, after: 138 },
              { country: "Germany", before: 519, after: 126 },
              { country: "Italy", before: 375, after: 93 },
              { country: "France", before: 201, after: 47 },
              { country: "Netherlands", before: 154, after: 38 },
              { country: "Sweden", before: 146, after: 33 },
              { country: "Hungary", before: 99, after: 23 },
              { country: "Norway", before: 86, after: 22 },
              { country: "Total", before: 2142, after: 520, total: true },
            ].map((row, i) => (
              <tr key={i} className={row.total ? "bg-zinc-50 font-semibold" : i % 2 === 0 ? "bg-white" : "bg-zinc-50"}>
                <td className="px-4 py-2 border-b border-zinc-200">{row.country}</td>
                <td className="px-4 py-2 text-right border-b border-zinc-200">{row.before}</td>
                <td className="px-4 py-2 text-right border-b border-zinc-200">{row.after}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </section>

      <hr className="border-zinc-200" />

      <section>
        <h2 className="text-xl font-medium mb-2">Outcome Measures</h2>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li><strong>Primary Endpoints:</strong> Overall Survival (OS) and Progression-Free Survival (PFS)</li>
          <li><strong>Secondary Endpoints:</strong> Progression-Free Survival (PFS)</li>
          <li><strong>Exploratory Endpoint:</strong> Safety - Incidence of serious adverse events (Grade ≥3)</li>
        </ul>
      </section>

      <hr className="border-zinc-200" />

      <section>
        <h2 className="text-xl font-medium mb-2">Statistical Analysis</h2>
        <p className="text-sm leading-relaxed">The study was designed to retain a minimum of 200 patients per treatment group after propensity score matching (PSM), to ensure sufficient power for detecting clinically meaningful differences in outcomes. Kaplan-Meier survival curves and Cox proportional hazards models were used to evaluate OS and PFS. Propensity score matching was done using 1:1 nearest-neighbor matching with a caliper of 0.2 standard deviations. Balance was assessed using standardized mean differences (SMD).</p>
      </section>

      <hr className="border-zinc-200" />

      <section>
        <h2 className="text-xl font-medium mb-2">Safety Outcomes</h2>
        <p className="text-sm leading-relaxed">Grade ≥3 AEs were significantly more frequent in the Keytruda+Trodelvy group. AE comparisons were assessed via Fisher’s exact test. Cumulative incidence plots and logistic regression were used to evaluate risk and predictors of toxicity.</p>
      </section>

      <hr className="border-zinc-200" />

      <section>
        <h2 className="text-xl font-medium mb-2">Subgroup Analysis</h2>
        <p className="text-sm leading-relaxed">Subgroup analyses explored OS across ECOG status, PD-L1 range, histology, sex, and age. No subgroup showed statistically significant interaction, but trends favored the Trodelvy group in ECOG 0–1, PD-L1 ≥50–75%, and adenocarcinoma.</p>
      </section>

      <hr className="border-zinc-200" />

      <section>
        <h2 className="text-xl font-medium mb-2">Interpretation</h2>
        <p className="text-sm leading-relaxed">While not statistically significant, survival trends favored Keytruda+Trodelvy. However, the increase in adverse events should be weighed carefully in clinical decision-making, especially in patients with borderline fitness.</p>
      </section>
    </div>
  );
}
