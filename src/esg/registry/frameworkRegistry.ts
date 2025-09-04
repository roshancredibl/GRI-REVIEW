import { FrameworkKey, FrameworkConfig, RawRow } from '../models/questionnaire.types';

export const frameworkRegistry: Record<FrameworkKey, FrameworkConfig> = {
  GRI: {
    normalizeRow: (row: RawRow): RawRow => {
      // GRI-specific normalization if needed
      return row;
    },
    inputClassMap: {
      'single_row_single_input_single_answer': 'TextAreaInput',
      'single_row_multi_input_single_answer': 'MultiFieldInput',
      'single_row_multi_input_multi_answer': 'MultiRowInput',
      'multiple_row_single_input_single_answer_vertical': 'VerticalInput',
      'predicator_question_answer': 'ConditionalInput',
      'derived': 'DerivedInput',
    },
  },
  SASB: {
    // Future framework support
  },
  CDP: {
    // Future framework support
  },
};

export function getFrameworkConfig(framework: FrameworkKey): FrameworkConfig {
  return frameworkRegistry[framework] || {};
}

export function normalizeRowForFramework(row: RawRow, framework: FrameworkKey): RawRow {
  const config = getFrameworkConfig(framework);
  return config.normalizeRow ? config.normalizeRow(row) : row;
}

export function getInputComponentForClass(questionClass: string, framework: FrameworkKey): string {
  const config = getFrameworkConfig(framework);
  return config.inputClassMap?.[questionClass] || 'DefaultInput';
}
