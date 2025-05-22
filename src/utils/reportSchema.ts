import { z } from "zod";

const keyFindingSchema = z.object({
  value: z.number().nullable().optional(),
  description: z.string(),
});

const FindingsSchema = z
  .object({
    progressionFreeSurvival: keyFindingSchema.optional(),
    overallSurvival: keyFindingSchema.optional(),
    objectiveResponseRate: keyFindingSchema.optional(),
    adverseEvents: keyFindingSchema.optional(),
  })
  .catchall(keyFindingSchema); // allow LLM to generate extra key findings

export const classificationSchema = z.object({
  studyResult: z.object({
    abstract: z.string(),
    sampleSize: z.number(),
    demographics: z.object({
      gender: z.object({
        unit: z.string(),
        male: z.number(),
        female: z.number(),
      }),
      ageAtTreatmentStart: z.object({
        unit: z.string(),
        "40-49": z.number(),
        "50-59": z.number(),
        "60-69": z.number(),
        "70-79": z.number(),
        "80-89": z.number(),
        ">90": z.number(),
      }),
    }),
    summary: z.object({
      dataSources: z.string(),
      patientCohort: z.string(),
      treatmentGroups: z.string(),
      keyFindings: FindingsSchema,
    }),
    conclusion: z.string(),
  }),
});
