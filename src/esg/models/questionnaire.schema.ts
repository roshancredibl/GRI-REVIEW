import { z } from 'zod';

// Helper to normalize boolean values
const normalizeBoolean = (value: unknown): boolean => {
  if (value === 1 || value === '1' || value === true) return true;
  if (value === 0 || value === '0' || value === false || value === '' || value === undefined) return false;
  return Boolean(value);
};

// Helper to normalize numeric values
const normalizeNumber = (value: unknown): number => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
};

export const QuestionInputFieldSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    type: z.string(),
    label: z.string(),
    field: z.string(),
    props: z.record(z.string(), z.unknown()).optional(),
    calculate: z.object({
      operation: z.string(),
      fields: z.array(z.string()),
    }).optional(),
    compare_field: z.string().optional(),
    comparison_operation: z.string().optional(),
    compare_value: z.string().optional(),
    render_class: z.string().optional(),
    schema: z.object({
      inputs: z.array(QuestionInputFieldSchema),
    }).optional(),
  })
);

export const QuestionInputSchemaSchema = z.object({
  inputs: z.array(QuestionInputFieldSchema),
  metadata: z.record(z.string(), z.unknown()).optional(),
  layout: z.string().optional(),
});

export const RawRowSchema = z.object({
  card_sequence: z.number().or(z.string()).transform(normalizeNumber),
  card_standards: z.string(),
  card_title: z.string(),
  esg_type: z.string(),
  is_card_active: z.number().or(z.string()).or(z.boolean()).transform(normalizeBoolean),
  is_enabled_for_facility: z.number().or(z.string()).or(z.boolean()).optional().transform((v: any) => v ? normalizeBoolean(v) : undefined),
  monthly: z.number().or(z.string()).or(z.boolean()).optional().transform((v: any) => v ? normalizeBoolean(v) : undefined),
  question_class: z.string(),
  question_description: z.string().optional(),
  question_external_id: z.string(),
  question_schema: z.unknown().transform((val: any) => {
    try {
      if (typeof val === 'string') {
        return JSON.parse(val);
      }
      return val;
    } catch {
      return val;
    }
  }),
  question_sequence: z.number().or(z.string()).transform(normalizeNumber),
  question_title: z.string(),
  questionnaire_section_description: z.string().optional(),
  questionnaire_section_external_id: z.string(),
  questionnaire_section_sequence: z.number().or(z.string()).transform(normalizeNumber),
  questionnaire_section_title: z.string(),
  report_type: z.string(),
  subsections: z.string().optional(),
});

export const QuestionSchema = z.object({
  externalId: z.string(),
  title: z.string(),
  description: z.string().optional(),
  class: z.string(),
  schema: QuestionInputSchemaSchema,
  sequence: z.number(),
  monthly: z.boolean().optional(),
});

export const CardSchema = z.object({
  sequence: z.number(),
  standards: z.string(),
  title: z.string(),
  isActive: z.boolean(),
  isEnabledForFacility: z.boolean().optional(),
  questions: z.array(QuestionSchema),
});

export const SectionSchema = z.object({
  externalId: z.string(),
  title: z.string(),
  description: z.string().optional(),
  sequence: z.number(),
  cards: z.array(CardSchema),
});

export const QuestionnaireSchema = z.object({
  reportType: z.string(),
  sections: z.array(SectionSchema),
});

export const ParseResultSchema = z.object({
  questionnaire: QuestionnaireSchema,
  errors: z.array(z.object({
    rowIndex: z.number(),
    questionExternalId: z.string().optional(),
    reason: z.string(),
    originalRow: RawRowSchema.optional(),
  })),
});

// Export validated types
export type ValidatedRawRow = z.infer<typeof RawRowSchema>;
export type ValidatedQuestionInputSchema = z.infer<typeof QuestionInputSchemaSchema>;
export type ValidatedQuestion = z.infer<typeof QuestionSchema>;
export type ValidatedCard = z.infer<typeof CardSchema>;
export type ValidatedSection = z.infer<typeof SectionSchema>;
export type ValidatedQuestionnaire = z.infer<typeof QuestionnaireSchema>;
