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
                Keytruda+Chemotherapy
              </th>
              <th className="bg-[rgb(0,102,255)] text-white p-2 border border-white font-semibold text-left">
                Keytruda+Trodelvy
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-[rgb(220,220,220)]">
              <td className="p-2 border border-white">Avg. Age (SD)</td>
              <td className="p-2 border border-white">66.8 (8.0)</td>
              <td className="p-2 border border-white">63.9 (8.2)</td>
            </tr>
            <tr className="bg-white">
              <td className="p-2 border border-[rgb(220,220,220)]">Gender: Female</td>
              <td className="p-2 border border-[rgb(220,220,220)]">117 (45.0%)</td>
              <td className="p-2 border border-[rgb(220,220,220)]">115 (44.2%)</td>
            </tr>
            <tr className="bg-[rgb(220,220,220)]">
              <td className="p-2 border border-white">Gender: Male</td>
              <td className="p-2 border border-white">143 (55.0%)</td>
              <td className="p-2 border border-white">145 (55.8%)</td>
            </tr>
            <tr className="bg-white">
              <td className="p-2 border border-[rgb(220,220,220)]">ECOG Score: 0</td>
              <td className="p-2 border border-[rgb(220,220,220)]">116 (44.6%)</td>
              <td className="p-2 border border-[rgb(220,220,220)]">118 (45.4%)</td>
            </tr>
            <tr className="bg-[rgb(220,220,220)]">
              <td className="p-2 border border-white">ECOG Score: 1</td>
              <td className="p-2 border border-white">120 (46.2%)</td>
              <td className="p-2 border border-white">120 (46.2%)</td>
            </tr>
            <tr className="bg-white">
              <td className="p-2 border border-[rgb(220,220,220)]">ECOG Score: 2</td>
              <td className="p-2 border border-[rgb(220,220,220)]">24 (9.2%)</td>
              <td className="p-2 border border-[rgb(220,220,220)]">22 (8.5%)</td>
            </tr>
            <tr className="bg-[rgb(220,220,220)]">
              <td className="p-2 border border-white">Smoking Status: Current</td>
              <td className="p-2 border border-white">48 (18.5%)</td>
              <td className="p-2 border border-white">57 (21.9%)</td>
            </tr>
            <tr className="bg-white">
              <td className="p-2 border border-[rgb(220,220,220)]">Smoking Status: Former</td>
              <td className="p-2 border border-[rgb(220,220,220)]">139 (53.5%)</td>
              <td className="p-2 border border-[rgb(220,220,220)]">137 (52.7%)</td>
            </tr>
            <tr className="bg-[rgb(220,220,220)]">
              <td className="p-2 border border-white">Smoking Status: Never</td>
              <td className="p-2 border border-white">73 (28.1%)</td>
              <td className="p-2 border border-white">66 (25.4%)</td>
            </tr>
            <tr className="bg-white">
              <td className="p-2 border border-[rgb(220,220,220)]">Hypertension n (%)</td>
              <td className="p-2 border border-[rgb(220,220,220)]">103 (39.6%)</td>
              <td className="p-2 border border-[rgb(220,220,220)]">101 (38.8%)</td>
            </tr>
            <tr className="bg-[rgb(220,220,220)]">
              <td className="p-2 border border-white">Diabetes n (%)</td>
              <td className="p-2 border border-white">61 (23.5%)</td>
              <td className="p-2 border border-white">56 (21.5%)</td>
            </tr>
            <tr className="bg-white">
              <td className="p-2 border border-[rgb(220,220,220)]">COPD n (%)</td>
              <td className="p-2 border border-[rgb(220,220,220)]">79 (30.4%)</td>
              <td className="p-2 border border-[rgb(220,220,220)]">68 (26.2%)</td>
            </tr>
            <tr className="bg-[rgb(220,220,220)]">
              <td className="p-2 border border-white">Heart Disease n (%)</td>
              <td className="p-2 border border-white">40 (15.4%)</td>
              <td className="p-2 border border-white">29 (11.2%)</td>
            </tr>
            <tr className="bg-white">
              <td className="p-2 border border-[rgb(220,220,220)]">Prior Lines: 0</td>
              <td className="p-2 border border-[rgb(220,220,220)]">219 (84.2%)</td>
              <td className="p-2 border border-[rgb(220,220,220)]">208 (80.0%)</td>
            </tr>
            <tr className="bg-[rgb(220,220,220)]">
              <td className="p-2 border border-white">Prior Lines: 1</td>
              <td className="p-2 border border-white">25 (9.6%)</td>
              <td className="p-2 border border-white">37 (14.2%)</td>
            </tr>
            <tr className="bg-white">
              <td className="p-2 border border-[rgb(220,220,220)]">Prior Lines: 2</td>
              <td className="p-2 border border-[rgb(220,220,220)]">16 (6.2%)</td>
              <td className="p-2 border border-[rgb(220,220,220)]">15 (5.8%)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
