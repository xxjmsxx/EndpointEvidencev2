export default function PatientCharacteristicsTable() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="bg-[rgb(0,102,255)] text-white p-2 border border-white font-semibold text-left">
                Characteristic
              </th>
              <th className="bg-[rgb(0,102,255)] text-white p-2 border border-white font-semibold text-left">
                Lumykras+Vectibix
              </th>
              <th className="bg-[rgb(0,102,255)] text-white p-2 border border-white font-semibold text-left">
                Krazati+Erbitux
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-[rgb(220,220,220)]">
              <td className="p-2 border border-white">Avg. Age (SD)</td>
              <td className="p-2 border border-white">64.2 (9.3)</td>
              <td className="p-2 border border-white">62.8 (8.7)</td>
            </tr>
            <tr className="bg-white">
              <td className="p-2 border border-[rgb(220,220,220)]">Gender: Female</td>
              <td className="p-2 border border-[rgb(220,220,220)]">142 (44.7%)</td>
              <td className="p-2 border border-[rgb(220,220,220)]">139 (43.8%)</td>
            </tr>
            <tr className="bg-[rgb(220,220,220)]">
              <td className="p-2 border border-white">Gender: Male</td>
              <td className="p-2 border border-white">176 (55.3%)</td>
              <td className="p-2 border border-white">178 (56.2%)</td>
            </tr>
            <tr className="bg-white">
              <td className="p-2 border border-[rgb(220,220,220)]">ECOG Score: 0</td>
              <td className="p-2 border border-[rgb(220,220,220)]">138 (43.4%)</td>
              <td className="p-2 border border-[rgb(220,220,220)]">141 (44.5%)</td>
            </tr>
            <tr className="bg-[rgb(220,220,220)]">
              <td className="p-2 border border-white">ECOG Score: 1</td>
              <td className="p-2 border border-white">152 (47.8%)</td>
              <td className="p-2 border border-white">149 (47.0%)</td>
            </tr>
            <tr className="bg-white">
              <td className="p-2 border border-[rgb(220,220,220)]">ECOG Score: 2</td>
              <td className="p-2 border border-[rgb(220,220,220)]">28 (8.8%)</td>
              <td className="p-2 border border-[rgb(220,220,220)]">27 (8.5%)</td>
            </tr>
            <tr className="bg-[rgb(220,220,220)]">
              <td className="p-2 border border-white">Primary Tumor: Left-sided</td>
              <td className="p-2 border border-white">203 (63.8%)</td>
              <td className="p-2 border border-white">198 (62.5%)</td>
            </tr>
            <tr className="bg-white">
              <td className="p-2 border border-[rgb(220,220,220)]">Primary Tumor: Right-sided</td>
              <td className="p-2 border border-[rgb(220,220,220)]">115 (36.2%)</td>
              <td className="p-2 border border-[rgb(220,220,220)]">119 (37.5%)</td>
            </tr>
            <tr className="bg-[rgb(220,220,220)]">
              <td className="p-2 border border-white">Prior anti-EGFR: Yes</td>
              <td className="p-2 border border-white">89 (28.0%)</td>
              <td className="p-2 border border-white">92 (29.0%)</td>
            </tr>
            <tr className="bg-white">
              <td className="p-2 border border-[rgb(220,220,220)]">Hypertension n (%)</td>
              <td className="p-2 border border-[rgb(220,220,220)]">124 (39.0%)</td>
              <td className="p-2 border border-[rgb(220,220,220)]">121 (38.2%)</td>
            </tr>
            <tr className="bg-[rgb(220,220,220)]">
              <td className="p-2 border border-white">Diabetes n (%)</td>
              <td className="p-2 border border-white">72 (22.6%)</td>
              <td className="p-2 border border-white">69 (21.8%)</td>
            </tr>
            <tr className="bg-white">
              <td className="p-2 border border-[rgb(220,220,220)]">Liver-only n (%)</td>
              <td className="p-2 border border-[rgb(220,220,220)]">103 (32.39%)</td>
              <td className="p-2 border border-[rgb(220,220,220)]">99 (31.23%)</td>
            </tr>
            <tr className="bg-[rgb(220,220,220)]">
              <td className="p-2 border border-white">Lung-only n (%)</td>
              <td className="p-2 border border-white">56 (17.61%)</td>
              <td className="p-2 border border-white">58 (18.30%)</td>
            </tr>
            <tr className="bg-white">
              <td className="p-2 border border-[rgb(220,220,220)]">Multi-organ n (%)</td>
              <td className="p-2 border border-[rgb(220,220,220)]">159 (50.00%)</td>
              <td className="p-2 border border-[rgb(220,220,220)]">160 (50.47%)</td>
            </tr>
            <tr className="bg-[rgb(220,220,220)]">
              <td className="p-2 border border-white">Prior Lines: 1</td>
              <td className="p-2 border border-white">189 (59.4%)</td>
              <td className="p-2 border border-white">192 (60.6%)</td>
            </tr>
            <tr className="bg-white">
              <td className="p-2 border border-[rgb(220,220,220)]">Prior Lines: 2</td>
              <td className="p-2 border border-[rgb(220,220,220)]">93 (29.2%)</td>
              <td className="p-2 border border-[rgb(220,220,220)]">90 (28.4%)</td>
            </tr>
            <tr className="bg-[rgb(220,220,220)]">
              <td className="p-2 border border-white">Prior Lines: ≥3</td>
              <td className="p-2 border border-white">36 (11.3%)</td>
              <td className="p-2 border border-white">35 (11.0%)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
