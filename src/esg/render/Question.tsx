import React, { useState, useCallback } from 'react';
import { Question as QuestionType } from '../models/questionnaire.types';
import InputFactory from './InputFactory';
import InfoIcon from '../../components/InfoIcon';

interface QuestionProps {
  question: QuestionType;
  disabled?: boolean;
  onAnswerChange?: (questionId: string, answers: Record<string, any>) => void;
  initialAnswers?: Record<string, any>;
  onGuidanceOpen?: (text: string) => void;
}

const Question: React.FC<QuestionProps> = ({
  question,
  disabled = false,
  onAnswerChange,
  initialAnswers = {},
  onGuidanceOpen
}) => {
  const [answers, setAnswers] = useState<Record<string, any>>(initialAnswers);
  const [multiRowData, setMultiRowData] = useState<Array<Record<string, any>>>([{}]);

  const handleFieldChange = useCallback((fieldName: string, value: any) => {
    const newAnswers = { ...answers, [fieldName]: value };
    setAnswers(newAnswers);
    onAnswerChange?.(question.externalId, newAnswers);
  }, [answers, question.externalId, onAnswerChange]);

  const handleMultiRowChange = useCallback((rowIndex: number, fieldName: string, value: any) => {
    const newMultiRowData = [...multiRowData];
    newMultiRowData[rowIndex] = { ...newMultiRowData[rowIndex], [fieldName]: value };
    setMultiRowData(newMultiRowData);
    
    // Convert multi-row data to flat answers format
    const flatAnswers = { ...answers };
    newMultiRowData.forEach((row, index) => {
      Object.entries(row).forEach(([field, val]) => {
        flatAnswers[`${field}_row_${index}`] = val;
      });
    });
    
    setAnswers(flatAnswers);
    onAnswerChange?.(question.externalId, flatAnswers);
  }, [multiRowData, answers, question.externalId, onAnswerChange]);

  const addNewRow = () => {
    setMultiRowData([...multiRowData, {}]);
  };

  const removeRow = (rowIndex: number) => {
    if (multiRowData.length > 1) {
      const newMultiRowData = multiRowData.filter((_, index) => index !== rowIndex);
      setMultiRowData(newMultiRowData);
    }
  };

  const renderInputs = () => {
    const { inputs, layout } = question.schema;
    const questionClass = question.class;

    switch (questionClass) {
      case 'single_row_single_input_single_answer':
        return (
          <div className="form-row single-input">
            {inputs.map((input, index) => (
              <InputFactory
                key={`${input.field}-${index}`}
                field={input}
                value={answers[input.field]}
                onChange={handleFieldChange}
                disabled={disabled}
                allValues={answers}
              />
            ))}
          </div>
        );

      case 'single_row_multi_input_multi_answer':
        return (
          <div className="multi-answer-section">
            {multiRowData.map((rowData, rowIndex) => (
              <div key={rowIndex} className="form-row multi-input">
                <div className="form-inputs">
                  {inputs.map((input, inputIndex) => (
                    <InputFactory
                      key={`${input.field}-${rowIndex}-${inputIndex}`}
                      field={input}
                      value={rowData[input.field]}
                      onChange={(fieldName, value) => handleMultiRowChange(rowIndex, fieldName, value)}
                      disabled={disabled}
                      allValues={rowData}
                    />
                  ))}
                </div>
                {multiRowData.length > 1 && (
                  <button 
                    type="button"
                    className="remove-row-btn"
                    onClick={() => removeRow(rowIndex)}
                    disabled={disabled}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        );

      case 'single_row_multi_input_single_answer':
        return (
          <div className="form-row multi-input-single-answer">
            {inputs.map((input, index) => (
              <InputFactory
                key={`${input.field}-${index}`}
                field={input}
                value={answers[input.field]}
                onChange={handleFieldChange}
                disabled={disabled}
                allValues={answers}
              />
            ))}
          </div>
        );

      case 'multiple_row_single_input_single_answer_vertical':
        return (
          <div className="form-layout-vertical">
            {inputs.map((input, index) => (
              <div key={`${input.field}-${index}`} className="form-row-vertical">
                <InputFactory
                  field={input}
                  value={answers[input.field]}
                  onChange={handleFieldChange}
                  disabled={disabled}
                  allValues={answers}
                />
              </div>
            ))}
          </div>
        );

                      case 'predicator_question_answer':
                  return (
                    <div className="predicator-question">
                      {inputs.map((input, index) => (
                        <div key={`${input.field}-${index}`} className="predicator-input">
                          <InputFactory
                            field={input}
                            value={answers[input.field]}
                            onChange={handleFieldChange}
                            disabled={disabled}
                            allValues={answers}
                          />
                        </div>
                      ))}
                    </div>
                  );

                case 'multiple_row_multiple_input_single_answer':
                  return (
                    <div className="multiple-row-table">
                      {Array.isArray(inputs[0]) ? (
                        (inputs as unknown as any[][]).map((row: any[], rowIndex: number) => (
                          <div key={rowIndex} className="table-row">
                            {row.map((input, inputIndex) => (
                              <div key={`${rowIndex}-${inputIndex}`} className="table-cell">
                                <InputFactory
                                  field={input}
                                  value={answers[`${input.field}_${rowIndex}`]}
                                  onChange={(fieldName, value) => handleFieldChange(`${fieldName}_${rowIndex}`, value)}
                                  disabled={disabled}
                                  allValues={answers}
                                />
                              </div>
                            ))}
                          </div>
                        ))
                      ) : (
                        <div className="form-row multi-input-single-answer">
                          {inputs.map((input, index) => (
                            <InputFactory
                              key={`${input.field}-${index}`}
                              field={input}
                              value={answers[input.field]}
                              onChange={handleFieldChange}
                              disabled={disabled}
                              allValues={answers}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  );

      default:
        // Fallback to basic layout
        const layoutClass = layout === 'vertical' ? 'form-layout-vertical' : 'form-layout-horizontal';
        return (
          <div className={`question-inputs ${layoutClass}`}>
            {inputs.map((input, index) => (
              <InputFactory
                key={`${input.field}-${index}`}
                field={input}
                value={answers[input.field]}
                onChange={handleFieldChange}
                disabled={disabled}
                allValues={answers}
              />
            ))}
          </div>
        );
    }
  };

  const shouldShowAddButton = () => {
    return question.class === 'single_row_multi_input_multi_answer';
  };

  return (
    <div className="question-section">
      <div className="question-header">
        <div className="question-number-and-title">
          <span className="question-number">{question.sequence}.</span>
          <div className="question-title">{question.title}</div>
          {question.monthly && (
            <span className="monthly-badge">Monthly</span>
          )}
        </div>
        <div className="question-info">
          {onGuidanceOpen && (
            <InfoIcon 
              title={question.description || "Guidance information for this question"}
              onClick={() => onGuidanceOpen(question.description || "Guidance information for this question")}
            />
          )}
        </div>
      </div>
      
      {question.description && (
        <div 
          className="question-description"
          dangerouslySetInnerHTML={{ __html: question.description }}
        />
      )}
      
      <div className="question-content">
        {renderInputs()}
      </div>
      
      {shouldShowAddButton() && (
        <div className="question-actions">
          <button 
            className="add-btn"
            type="button"
            disabled={disabled}
            onClick={addNewRow}
          >
            +ADD
          </button>
        </div>
      )}
      
      <div className="save-section">
        <button className="attachments-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <span>📎</span>
          <span>Attachments</span>
        </button>
        <button 
          className="save-btn"
          type="button"
          disabled={disabled}
          onClick={() => {
            console.log('Save question:', question.externalId, answers);
          }}
        >
          SAVE
        </button>
      </div>
    </div>
  );
};

export default Question;
