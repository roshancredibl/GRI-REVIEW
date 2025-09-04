export type Currency = 'INR' | 'USD' | string;

export interface RawRow {
  card_sequence: number | string;
  card_standards: string;
  card_title: string;
  esg_type: string;
  is_card_active: 0 | 1 | '' | boolean;
  is_enabled_for_facility?: 0 | 1 | '' | boolean;
  monthly?: 0 | 1 | '' | boolean;
  question_class: string;
  question_description?: string;
  question_external_id: string;
  question_schema: unknown; // will be parsed/validated
  question_sequence: number | string;
  question_title: string;
  questionnaire_section_description?: string;
  questionnaire_section_external_id: string;
  questionnaire_section_sequence: number | string;
  questionnaire_section_title: string;
  report_type: string; // e.g., "GRI"
  subsections?: string;
}

export interface QuestionInputField {
  type: 'number' | 'text' | 'textarea' | 'select' | 'date' | 'checkbox' | 'radio' | 'derived' | 'conditional' | string;
  label: string;
  field: string;
  props?: Record<string, unknown>;
  calculate?: {
    operation: string;
    fields: string[];
  };
  // For conditional fields
  compare_field?: string;
  comparison_operation?: string;
  compare_value?: string;
  render_class?: string;
  schema?: {
    inputs: QuestionInputField[];
  };
}

export interface QuestionInputSchema {
  inputs: QuestionInputField[];
  metadata?: Record<string, unknown>;
  layout?: 'vertical' | 'horizontal' | string;
}

export interface Question {
  externalId: string;
  title: string;
  description?: string;
  class: string;
  schema: QuestionInputSchema;
  sequence: number;
  monthly?: boolean;
}

export interface Card {
  sequence: number;
  standards: string;
  title: string;
  isActive: boolean;
  isEnabledForFacility?: boolean;
  questions: Question[];
}

export interface Section {
  externalId: string;
  title: string;
  description?: string;
  sequence: number;
  cards: Card[];
}

export interface Questionnaire {
  reportType: string; // "GRI"
  sections: Section[];
}

export type FrameworkKey = 'GRI' | 'SASB' | 'CDP' | string;

export interface FrameworkConfig {
  normalizeRow?: (row: RawRow) => RawRow;
  inputClassMap?: Record<string, string>;
}

export interface ParseError {
  rowIndex: number;
  questionExternalId?: string;
  reason: string;
  originalRow?: RawRow;
}

export interface ParseResult {
  questionnaire: Questionnaire;
  errors: ParseError[];
}
