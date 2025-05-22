import { z } from "zod";

export const picotSchema = z.object({
  population: z
    .string()
    .describe("patient or population of interest for the study (e.g., age, gender, geography, condition)"),
  intervention: z
    .string()
    .describe("treatment, diagnostic test, or exposure being considered for the study"),
  control: z
    .string()
    .describe("group / treatment to compare the intervention to for the study (e.g., placebo)"),
  outcome: z
    .string()
    .describe("The desired outcome or effect measured for the study? (e.g., reduced mortality)"),
  timeframe: z
    .string()
    .describe("Over what period is the outcome measured (e.g., 6 months, 5 years)"),
});

export const classificationSchema = z.object({
  missingFields: z.array(
    z.enum(["population", "intervention", "control", "outcome", "timeframe"])
  ),
  extracted: z.object({
    population: z.string().optional().describe("patient or population of interest for the study (e.g., age, gender, geography, condition)"),
    intervention: z.string().optional().describe("treatment, diagnostic test, or exposure being considered for the study"),
    control: z.string().optional().describe("group / treatment to compare the intervention to for the study (e.g., placebo)"),
    outcome: z.string().optional().describe("The desired outcome or effect measured for the study? (e.g., reduced mortality)"),
    timeframe: z.string().optional().describe("Over what period is the outcome measured (e.g., 6 months, 5 years)")
  })
});

export type TypeClassificationSchema = z.infer<typeof classificationSchema>;
