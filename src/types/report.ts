import { z } from "zod";
import { classificationSchema } from "@/utils/reportSchema"; // your zod schema

export type StudyResult = z.infer<typeof classificationSchema>['studyResult'];

export type Report = {
  schemaVersion: string;
  generalInformation: {
    userId: string;
    fullName: string;
    specialty: string;
    organization: string;
    requestId: string;
    mode: string;
    dateRequest: string;
    studyDesign: string;
  };
  studyRequest: {
    fullQuestion: string;
    picot: {
      population: string;
      intervention: string;
      control: string;
      outcome: string;
      timeframe: string;
    };
  };
  studyResult: StudyResult;
};
