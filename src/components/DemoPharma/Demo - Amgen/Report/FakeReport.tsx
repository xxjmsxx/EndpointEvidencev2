import React from "react";

export default function ComparativeEffectivenessReport() {
  const countryRows = [
    { country: "Spain", before: 310, after: 148 },
    { country: "Germany", before: 285, after: 125 },
    { country: "Italy", before: 210, after: 111 },
    { country: "France", before: 155, after: 108 },
    { country: "Netherlands", before: 90, after: 82 },
    { country: "Sweden", before: 70, after: 42 },
    { country: "Hungary", before: 25, after: 14 },
    { country: "Norway", before: 14, after: 5 },
    { country: "Total", before: 1069, after: 520, total: true },
  ];

  return (
    <div className="py-5 px-6 rounded-xl border border-zinc-200 bg-white shadow-sm space-y-5 text-zinc-800">
      <h1 className="text-2xl font-semibold">Comparative Effectiveness of Lumykras + Vectibix vs. Krazati + Erbitux</h1>

      {/* Study Overview */}
      <section>
        <h2 className="text-xl font-medium mb-2">Study Overview</h2>
        <p className="text-sm leading-relaxed">
          This retrospective real-world evidence (RWE) study compared the effectiveness and safety of sotorasib + panitumumab (Lumykras® + Vectibix®) versus adagrasib + cetuximab (Krazati® + Erbitux®) in adult patients with metastatic colorectal cancer harboring a KRAS G12C mutation who had received prior systemic therapy. Propensity-score matching (1:1, caliper 0.2&nbsp;SD) balanced key baseline factors, yielding 318 matched pairs.
        </p>
      </section>

      <hr className="border-zinc-200" />

      {/* Key Findings */}
      <section>
        <h2 className="text-xl font-medium mb-2">Key Findings</h2>
        <ul className="list-disc list-inside text-sm space-y-1 mb-4">
          <li><strong>Progression-Free Survival (PFS):</strong> Median PFS was <strong>5.6&nbsp;months (95% CI&nbsp;4.2–6.3)</strong> with Lumykras+Vectibix vs. <strong>6.9&nbsp;months (95% CI&nbsp;6.0–7.8)</strong> with Krazati+Erbitux (HR&nbsp;0.78, p&nbsp;=&nbsp;0.005).</li>
          <li><strong>Overall Survival (OS) – RMST@12:</strong> RMST@12 was <strong>7.3&nbsp;months</strong> vs. <strong>8.9&nbsp;months</strong> (Δ&nbsp;1.6&nbsp;months; 95% CI&nbsp;0.8–2.4; p&nbsp;&lt;&nbsp;0.001).</li>
          <li><strong>Safety:</strong> Grade ≥&nbsp;3 treatment-related AEs occurred in <strong>18.4%</strong> vs. <strong>22.1%</strong> (p&nbsp;=&nbsp;0.15).</li>
        </ul>

        <h3 className="text-sm font-semibold">Progression-Free Survival (Primary)</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li><strong>Lumykras + Vectibix:</strong> Median PFS&nbsp;=&nbsp;5.6&nbsp;months (95% CI&nbsp;4.2–6.3)</li>
          <li><strong>Krazati + Erbitux:</strong> Median PFS&nbsp;=&nbsp;6.9&nbsp;months (95% CI&nbsp;6.0–7.8)</li>
          <li><strong>Hazard Ratio:</strong> 0.78 (95% CI&nbsp;0.65–0.93), <strong>p&nbsp;=&nbsp;0.005</strong></li>
          <li><em>Interpretation:</em> Statistically significant longer disease control with Krazati+Erbitux.</li>
        </ul>

        <h3 className="text-sm font-semibold mt-4">Overall Survival (Key Secondary via RMST@12)</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li><strong>Lumykras + Vectibix:</strong> RMST@12&nbsp;=&nbsp;7.3&nbsp;months</li>
          <li><strong>Krazati + Erbitux:</strong> RMST@12&nbsp;=&nbsp;8.9&nbsp;months</li>
          <li><strong>ΔRMST:</strong> 1.6&nbsp;months (95% CI&nbsp;0.8–2.4), <strong>p&nbsp;&lt;&nbsp;0.001</strong></li>
          <li><em>Interpretation:</em> On average, patients on Krazati+Erbitux lived 1.6&nbsp;months longer in the first year.</li>
        </ul>

        <h3 className="text-sm font-semibold mt-4">Safety</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li><strong>Grade ≥ 3 AEs:</strong> Lumykras+Vectibix&nbsp;18.4% vs.&nbsp;Krazati+Erbitux&nbsp;22.1% (<strong>p&nbsp;=&nbsp;0.15</strong>)</li>
          <li><em>Interpretation:</em> Numerically higher serious toxicity with Krazati regimen, but not statistically significant.</li>
        </ul>
      </section>

      <hr className="border-zinc-200" />

      {/* Conclusions */}
      <section>
        <h2 className="text-xl font-medium mb-2">Conclusions</h2>
        <p className="text-sm leading-relaxed">
          In this matched RWE cohort, Krazati + Erbitux demonstrated significantly longer PFS and superior 12-month RMST for OS compared with Lumykras + Vectibix, with comparable serious-AE rates. These findings—while hypothesis-generating—support further prospective evaluation.
        </p>
      </section>

      <hr className="border-zinc-200" />

      {/* Clinical Implications */}
      <section>
        <h2 className="text-xl font-medium mb-2">Clinical Implications</h2>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Enhanced efficacy of Krazati+Erbitux may guide sequencing decisions in KRAS G12C‑mutant mCRC.</li>
          <li>Safety profile is similar enough to consider Krazati combinations in fit patients.</li>
          <li>Limitations: retrospective design, residual confounding, and evolving real-world practice patterns warrant validation in controlled trials.</li>
        </ul>
      </section>

      <hr className="border-zinc-200" />

      {/* PICOT Framework */}
      <section>
        <h2 className="text-xl font-medium mb-2">PICOT Framework</h2>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li><strong>Population:</strong> Adults with metastatic CRC, KRAS G12C, ≥ 1 prior therapy</li>
          <li><strong>Intervention:</strong> Sotorasib + panitumumab</li>
          <li><strong>Comparator:</strong> Adagrasib + cetuximab</li>
          <li><strong>Outcomes:</strong> Primary&nbsp;–&nbsp;PFS (RECIST v1.1, 12‑month censor); Key Secondary&nbsp;–&nbsp;RMST@12 for OS; Exploratory&nbsp;–&nbsp;Grade ≥ 3 AEs</li>
          <li><strong>Time:</strong> 12‑month follow-up from treatment start</li>
        </ul>
      </section>

      <hr className="border-zinc-200" />

      {/* Data Sources */}
      <section>
        <h2 className="text-xl font-medium mb-2">Data Sources</h2>
        <p className="text-sm leading-relaxed">This study utilized a federated data approach to access and analyze patient data across multiple healthcare systems while maintaining strict data privacy and security standards. Patient-level data remained within each source institution, with only aggregated and de-identified results shared for analysis.</p>
        <p className="text-sm leading-relaxed mb-4">Data were sourced from eight European countries participating in the federated network, each contributing a portion of the final study population. These countries included both academic and community-based healthcare settings, representing diverse real-world clinical practices and patient demographics.</p>
        <table className="min-w-full text-sm border border-zinc-300 rounded-md overflow-hidden">
          <thead>
            <tr className="bg-zinc-100 text-zinc-700 uppercase text-xs">
              <th className="px-4 py-2 text-left font-medium border-b border-zinc-300">Country</th>
              <th className="px-4 py-2 text-right font-medium border-b border-zinc-300">Before PSM</th>
              <th className="px-4 py-2 text-right font-medium border-b border-zinc-300">After PSM</th>
            </tr>
          </thead>
          <tbody className="text-zinc-800">
            {countryRows.map((row, i) => (
              <tr
                key={i}
                className={
                  row.total
                    ? "bg-zinc-50 font-semibold"
                    : i % 2 === 0
                    ? "bg-white"
                    : "bg-zinc-50"
                }
              >
                <td className="px-4 py-2 border-b border-zinc-200">{row.country}</td>
                <td className="px-4 py-2 text-right border-b border-zinc-200">{row.before}</td>
                <td className="px-4 py-2 text-right border-b border-zinc-200">{row.after}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <hr className="border-zinc-200" />

      {/* Statistical Analysis */}
      <section>
        <h2 className="text-xl font-medium mb-2">Statistical Analysis</h2>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li><strong>Sample Size:</strong> Target ≥ 200 patients per arm after matching to detect HR&nbsp;0.78 for PFS with 80% power at two-sided α&nbsp;=&nbsp;0.05</li>
          <li><strong>Propensity Score Matching:</strong> 1:1 nearest-neighbor matching, caliper&nbsp;=&nbsp;0.2 SD of logit; covariates: age, sex, ECOG, prior lines, metastatic-site category, baseline CEA, prior anti-EGFR</li>
          <li><strong>Effectiveness:</strong> Kaplan–Meier, log-rank test, Cox PH model for PFS; RMST comparison for OS</li>
          <li><strong>Safety:</strong> χ²/Fisher’s exact for AE incidence; cumulative incidence for time to Grade ≥ 3 event</li>
          <li><strong>Subgroup Analyses:</strong> Interaction tests across CEA level, EGFR exposure, tumor sidedness, prior lines, ECOG, age, gender</li>
        </ul>
      </section>

      <hr className="border-zinc-200" />

      {/* Subgroup Analysis */}
      <section>
        <h2 className="text-xl font-medium mb-2">Subgroup Analysis</h2>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Baseline CEA (high vs. low)</li>
          <li>Prior anti-EGFR exposure (yes vs. no)</li>
          <li>Primary tumor sidedness (left vs. right)</li>
          <li>Prior lines of therapy (1 vs. ≥ 2)</li>
          <li>ECOG performance status (0–1 vs. ≥ 2)</li>
          <li>Age (&lt; 65 vs. ≥ 65)</li>
          <li>Gender</li>
        </ul>
        <p className="text-sm leading-relaxed mt-2">
          No statistically significant interactions were observed, though trends favored <strong>Krazati + Erbitux</strong> in left-sided tumors and patients &lt; 65 years.
        </p>
      </section>

      <hr className="border-zinc-200" />

      {/* Interpretation */}
      <section>
        <h2 className="text-xl font-medium mb-2">Interpretation</h2>
        <p className="text-sm leading-relaxed">Over a 12‑month follow‑up, real‑world evidence shows that Krazati + Erbitux delivers superior disease control (median PFS&nbsp;6.9 vs.&nbsp;5.6&nbsp;months; HR&nbsp;0.78, p&nbsp;=&nbsp;0.005) and a meaningful early survival advantage (RMST@12&nbsp;8.9 vs.&nbsp;7.3&nbsp;months; Δ&nbsp;1.6&nbsp;months, p&nbsp;&lt;&nbsp;0.001) compared with Lumykras + Vectibix, all without increasing high‑grade toxicity. These compelling results position Krazati + Erbitux as a leading choice for KRAS G12C‑mutant metastatic CRC and warrant prospective trials with extended follow‑up to confirm the durability of benefit and long‑term safety.</p>
      </section>
    </div>
  );
}
