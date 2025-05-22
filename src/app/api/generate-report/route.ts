// TODO: We need to change the position of this folder outside of Api folder

import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { NextResponse } from "next/server";
import { classificationSchema } from "@/utils/reportSchema";

interface ReportRequestPayload {
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
}

export async function POST(req: Request) {
  try {
    const payload: ReportRequestPayload = await req.json();
    const { generalInformation, studyRequest, schemaVersion } = payload;

    const { object: fakeStudyResult } = await generateObject({
      model: openai("gpt-4o"),
      system: `You are a clinical researcher specializing in ${generalInformation.specialty} tasked with completing a structured medical report using Real-world clinical data.
      Generate a plausible studyResult object given the study request.`,
      prompt: `
        Use this metadata to generate the studyResult section:

        General Information:
        ${JSON.stringify(generalInformation, null, 2)}

        Study Request:
        ${JSON.stringify(studyRequest, null, 2)}

        Return only the "studyResult" part following the schema.
      `,
      schema: classificationSchema,
    });

    const fullReport = {
      schemaVersion,
      generalInformation,
      studyRequest,
      studyResult: fakeStudyResult.studyResult,
    };

    console.log("🧪 Final Report:", fullReport);
    return NextResponse.json({ report: fullReport });

  } catch (error) {
    console.error("❌ Report generation error:", error);

    return NextResponse.json(
      {
        error: "Failed to generate report",
        details: error instanceof Error ? error.message : "Invalid response format"
      },
      {
        status: 500
      }
    );
  }

}
