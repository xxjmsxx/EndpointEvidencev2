import { useEffect } from 'react';

export function useReportGenerationFlow({
  mode,
  startReportGeneration,
  reportGenerationComplete,
  messages,
  setMessages,
  setReportGenerationComplete,
}) {

  useEffect(() => {
    if (mode !== 'rwe report generation') return;


    if (startReportGeneration) {
      setMessages((prevMessages) => {
        const hasReportGeneration = prevMessages.some((msg) => msg.id === 'report-generation-loading');
        if (hasReportGeneration) return prevMessages;

        console.log("🟢 Report generation loading message appended");

        return [
          ...prevMessages,
          {
            id: `report-generation-${Date.now()}`,
            role: 'system',
            name: 'report-generation-loading',
            content: 'Initiating the generation of the report',
          }
        ];
      });
    }
  }, [startReportGeneration, mode, setMessages]);

  useEffect(() => {
    if (mode !== 'rwe report generation') return;


    if (reportGenerationComplete) {
      const hasAlreadyBeenAppended = messages.some((msg) => msg.name === 'report-complete');
      if (!hasAlreadyBeenAppended) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: `report-complete-${Date.now()}`,
            role: 'system',
            name: 'report-complete',
            content: 'Report generation is complete. You can now download it or view the results in the canvas.'
          }
        ]);

        console.log("✅ Report complete message appended");

        setReportGenerationComplete(false);
      }
    }
  }, [reportGenerationComplete, messages, mode, setMessages, setReportGenerationComplete]);
}
