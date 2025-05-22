import type { TypeClassificationSchema } from "@/types/classificationSchema";
import type {User} from "@/types/User"

export function buildReportPayload(
  picotState: TypeClassificationSchema,
  fullQuestion: string,
  user: User) {

  return {
    schemaVersion: "1.0",
    generalInformation: {
      userId: user.userId,
      fullName: user.fullName,
      specialty: "Oncology",
      organization: "Abbvie",
      requestId: "xxx",
      mode: "rwe report",
      dateRequest: new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      studyDesign: "Cohort analysis",
    },
    studyRequest: {
      fullQuestion: fullQuestion,
      picot: { ...picotState.extracted },
    },
  };
}
