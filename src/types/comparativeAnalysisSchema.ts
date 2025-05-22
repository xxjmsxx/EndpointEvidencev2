// types/comparativeAnalysisSchema.ts
import { z } from 'zod';
import { picotSchema } from '@/types/classificationSchema';

export const stageEnum = z.enum([
  'init', 'clarifyEndpoints', 'clarifyChemo', 'clarifyOutcome',
  'confirmPicot', 'design', 'cohort', 'match', 'analyse', 'report', 'done'
]);

export const comparativeSchema = z.object({
  stage: stageEnum.default('init'),
  picot: picotSchema,
  endpoints: z.array(z.enum(['OS','PFS','ORR','QoL'])).optional(),
  chemoRegimen: z.string().nullable(),  // null ⇒ no preference
  confirmed: z.boolean().optional(),
  analysisPlan: z.any().optional(),     // JSON blob
  cohortStats: z.any().optional(),      // JSON blob
  matchStats: z.any().optional(),
  results: z.any().optional(),
  reportUrl: z.string().optional(),
});
export type CmpState = z.infer<typeof comparativeSchema>;
