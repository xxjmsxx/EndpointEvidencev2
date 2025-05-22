import React from 'react'
import AdverseEventsChart from './adverse-events-chart'
import AdverseEventSeverityChart from './adverse-event-severity-chart'
import AdverseEventSeverityByTypeChart from './adverse-event-severity-by-type-chart'
import AdverseEventSeverityByTypeErbituxChart from './adverse-event-severity-by-type-erbitux-chart'

export default function AdverseEvents() {
  return (
    <>
      <AdverseEventsChart />
      <AdverseEventSeverityChart />
      <AdverseEventSeverityByTypeChart />
      <AdverseEventSeverityByTypeErbituxChart />
    </>
  )
}
