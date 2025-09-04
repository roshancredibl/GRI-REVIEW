import { 
  RawRow, 
  Questionnaire, 
  Section, 
  Card, 
  Question, 
  ParseResult, 
  ParseError,
  QuestionInputSchema,
  FrameworkKey 
} from '../models/questionnaire.types';
import { 
  RawRowSchema, 
  QuestionInputSchemaSchema, 
  ValidatedRawRow 
} from '../models/questionnaire.schema';
import { normalizeRowForFramework } from '../registry/frameworkRegistry';
import { loadJsonFromPath } from './streamingJson';

/**
 * Parse raw rows into normalized questionnaire model
 */
export function parseRowsToModel(rows: RawRow[], framework: FrameworkKey = 'GRI'): ParseResult {
  const errors: ParseError[] = [];
  const validatedRows: ValidatedRawRow[] = [];

  // Validate and normalize rows
  rows.forEach((row, index) => {
    try {
      // Apply framework-specific normalization
      const normalizedRow = normalizeRowForFramework(row, framework);
      
      // Validate with zod schema
      const validatedRow = RawRowSchema.parse(normalizedRow);
      validatedRows.push(validatedRow);
    } catch (error) {
      errors.push({
        rowIndex: index,
        questionExternalId: row.question_external_id,
        reason: error instanceof Error ? error.message : 'Validation failed',
        originalRow: row,
      });
      console.warn(`Row validation failed at index ${index}:`, error);
    }
  });

  // Group rows by sections
  const sectionsMap = new Map<string, ValidatedRawRow[]>();
  
  validatedRows.forEach(row => {
    const sectionId = row.questionnaire_section_external_id;
    if (!sectionsMap.has(sectionId)) {
      sectionsMap.set(sectionId, []);
    }
    sectionsMap.get(sectionId)!.push(row);
  });

  // Build sections
  const sections: Section[] = [];
  
  sectionsMap.forEach((sectionRows, sectionId) => {
    try {
      const section = buildSection(sectionRows, errors);
      if (section) {
        sections.push(section);
      }
    } catch (error) {
      errors.push({
        rowIndex: -1,
        reason: `Failed to build section ${sectionId}: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    }
  });

  // Sort sections by sequence
  sections.sort((a, b) => a.sequence - b.sequence);

  const questionnaire: Questionnaire = {
    reportType: framework,
    sections,
  };

  return { questionnaire, errors };
}

function buildSection(rows: ValidatedRawRow[], errors: ParseError[]): Section | null {
  if (rows.length === 0) return null;

  const firstRow = rows[0];
  
  // Group rows by cards
  const cardsMap = new Map<string, ValidatedRawRow[]>();
  
  rows.forEach(row => {
    const cardKey = `${row.card_sequence}-${row.card_title}`;
    if (!cardsMap.has(cardKey)) {
      cardsMap.set(cardKey, []);
    }
    cardsMap.get(cardKey)!.push(row);
  });

  // Build cards
  const cards: Card[] = [];
  
  cardsMap.forEach((cardRows) => {
    try {
      const card = buildCard(cardRows, errors);
      if (card && card.isActive) {
        cards.push(card);
      }
    } catch (error) {
      errors.push({
        rowIndex: -1,
        reason: `Failed to build card: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    }
  });

  // Sort cards by sequence
  cards.sort((a, b) => a.sequence - b.sequence);

  return {
    externalId: firstRow.questionnaire_section_external_id,
    title: firstRow.questionnaire_section_title,
    description: firstRow.questionnaire_section_description,
    sequence: firstRow.questionnaire_section_sequence,
    cards,
  };
}

function buildCard(rows: ValidatedRawRow[], errors: ParseError[]): Card | null {
  if (rows.length === 0) return null;

  const firstRow = rows[0];
  
  // Build questions
  const questions: Question[] = [];
  
  rows.forEach(row => {
    try {
      const question = buildQuestion(row, errors);
      if (question) {
        questions.push(question);
      }
    } catch (error) {
      errors.push({
        rowIndex: -1,
        questionExternalId: row.question_external_id,
        reason: `Failed to build question: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    }
  });

  // Sort questions by sequence
  questions.sort((a, b) => a.sequence - b.sequence);

  return {
    sequence: firstRow.card_sequence,
    standards: firstRow.card_standards,
    title: firstRow.card_title,
    isActive: firstRow.is_card_active,
    isEnabledForFacility: firstRow.is_enabled_for_facility,
    questions,
  };
}

function buildQuestion(row: ValidatedRawRow, errors: ParseError[]): Question | null {
  try {
    // Parse and validate question schema
    let schema: QuestionInputSchema;
    
    try {
      schema = QuestionInputSchemaSchema.parse(row.question_schema);
    } catch (schemaError) {
      // Fallback for invalid schemas
      console.warn(`Invalid question schema for ${row.question_external_id}:`, schemaError);
      schema = {
        inputs: [{
          type: 'text',
          label: 'Input',
          field: 'value1',
        }],
      };
    }

    return {
      externalId: row.question_external_id,
      title: row.question_title,
      description: row.question_description,
      class: row.question_class,
      schema,
      sequence: row.question_sequence,
      monthly: row.monthly,
    };
  } catch (error) {
    return null;
  }
}

/**
 * Sort sections, cards, and questions by their sequence numbers
 */
export function sortSectionsCardsQuestions(questionnaire: Questionnaire): Questionnaire {
  const sortedSections = questionnaire.sections
    .map(section => ({
      ...section,
      cards: section.cards
        .map(card => ({
          ...card,
          questions: [...card.questions].sort((a, b) => a.sequence - b.sequence),
        }))
        .sort((a, b) => a.sequence - b.sequence),
    }))
    .sort((a, b) => a.sequence - b.sequence);

  return {
    ...questionnaire,
    sections: sortedSections,
  };
}

/**
 * Load questionnaire from JSON file by stem name
 */
export async function loadQuestionnaireFromStem(
  stemName: string,
  framework: FrameworkKey = 'GRI',
  basePath: string = '/public'
): Promise<ParseResult> {
  try {
    const jsonPath = `${basePath}/${stemName}.json`;
    const rawData = await loadJsonFromPath<RawRow[]>(jsonPath);
    
    // Process in chunks for large files
    if (rawData.length > 1000) {
      console.log(`Processing large questionnaire file: ${rawData.length} rows`);
    }
    
    const parseResult = parseRowsToModel(rawData, framework);
    const sortedQuestionnaire = sortSectionsCardsQuestions(parseResult.questionnaire);
    
    return {
      questionnaire: sortedQuestionnaire,
      errors: parseResult.errors,
    };
  } catch (error) {
    throw new Error(`Failed to load questionnaire from ${stemName}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Utility to get questionnaire summary for debugging
 */
export function getQuestionnaireSummary(questionnaire: Questionnaire): {
  totalSections: number;
  totalCards: number;
  totalQuestions: number;
  reportType: string;
} {
  const totalCards = questionnaire.sections.reduce((sum, section) => sum + section.cards.length, 0);
  const totalQuestions = questionnaire.sections.reduce(
    (sum, section) => sum + section.cards.reduce((cardSum, card) => cardSum + card.questions.length, 0),
    0
  );

  return {
    totalSections: questionnaire.sections.length,
    totalCards,
    totalQuestions,
    reportType: questionnaire.reportType,
  };
}
