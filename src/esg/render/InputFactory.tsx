import React from 'react';
import { QuestionInputField } from '../models/questionnaire.types';

interface InputFieldProps {
  field: QuestionInputField;
  value?: any;
  onChange?: (fieldName: string, value: any) => void;
  disabled?: boolean;
}

// Basic input components
const TextInput: React.FC<InputFieldProps> = ({ field, value, onChange, disabled }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(field.field, e.target.value);
  };

  return (
    <div className="form-group">
      {field.label && <label htmlFor={field.field} className="form-label">{field.label}</label>}
      <input
        id={field.field}
        type="text"
        className="form-input"
        value={value || ''}
        onChange={handleChange}
        disabled={disabled}
        placeholder={field.props?.placeholder as string}
        required={field.props?.required as boolean}
        aria-describedby={field.label ? `${field.field}-description` : undefined}
      />
      {field.label && (
        <div id={`${field.field}-description`} className="sr-only">
          {field.label}
        </div>
      )}
    </div>
  );
};

const TextAreaInput: React.FC<InputFieldProps> = ({ field, value, onChange, disabled }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(field.field, e.target.value);
  };

  return (
    <div className="form-group">
      {field.label && <label htmlFor={field.field} className="form-label">{field.label}</label>}
      <textarea
        id={field.field}
        className="form-input"
        value={value || ''}
        onChange={handleChange}
        disabled={disabled}
        placeholder={field.props?.placeholder as string}
        required={field.props?.required as boolean}
        rows={field.props?.rows as number || 2}
        cols={field.props?.columns as number}
        aria-describedby={field.label ? `${field.field}-description` : undefined}
      />
      {field.label && (
        <div id={`${field.field}-description`} className="sr-only">
          {field.label}
        </div>
      )}
    </div>
  );
};

const NumberInput: React.FC<InputFieldProps> = ({ field, value, onChange, disabled }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = e.target.value === '' ? '' : Number(e.target.value);
    onChange?.(field.field, numValue);
  };

  return (
    <div className="form-group">
      {field.label && <label htmlFor={field.field} className="form-label">{field.label}</label>}
      <input
        id={field.field}
        type="number"
        className="form-input"
        value={value || ''}
        onChange={handleChange}
        disabled={disabled}
        placeholder={field.props?.placeholder as string}
        required={field.props?.required as boolean}
        min={field.props?.min as number}
        max={field.props?.max as number}
        step={field.props?.step as number}
        aria-describedby={field.label ? `${field.field}-description` : undefined}
      />
      {field.label && (
        <div id={`${field.field}-description`} className="sr-only">
          {field.label}
        </div>
      )}
    </div>
  );
};

const SelectInput: React.FC<InputFieldProps> = ({ field, value, onChange, disabled }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(field.field, e.target.value);
  };

  const options = field.props?.options as (string | {value: string, label: string})[] || [];

  return (
    <div className="form-group">
      {field.label && <label htmlFor={field.field} className="form-label">{field.label}</label>}
      <select
        id={field.field}
        className="form-select"
        value={value || ''}
        onChange={handleChange}
        disabled={disabled}
        required={field.props?.required as boolean}
        aria-describedby={field.label ? `${field.field}-description` : undefined}
      >
        <option value="">{field.props?.placeholder as string || 'Select an option'}</option>
        {options.map((option, index) => {
          const optionValue = typeof option === 'string' ? option : option.value;
          const optionLabel = typeof option === 'string' ? option : option.label;
          return (
            <option key={index} value={optionValue}>
              {optionLabel}
            </option>
          );
        })}
      </select>
      {field.label && (
        <div id={`${field.field}-description`} className="sr-only">
          {field.label}
        </div>
      )}
    </div>
  );
};

const DateInput: React.FC<InputFieldProps> = ({ field, value, onChange, disabled }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(field.field, e.target.value);
  };

  return (
    <div className="form-group">
      {field.label && <label htmlFor={field.field} className="form-label">{field.label}</label>}
      <input
        id={field.field}
        type="date"
        className="form-input"
        value={value || ''}
        onChange={handleChange}
        disabled={disabled}
        required={field.props?.required as boolean}
        aria-describedby={field.label ? `${field.field}-description` : undefined}
      />
      {field.label && (
        <div id={`${field.field}-description`} className="sr-only">
          {field.label}
        </div>
      )}
    </div>
  );
};

const RadioInput: React.FC<InputFieldProps> = ({ field, value, onChange, disabled }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(field.field, e.target.value);
  };

  const options = field.props?.options as (string | {value: string, label: string})[] || [];

  return (
    <div className="form-group">
      {field.label && <fieldset>
        <legend className="form-label">{field.label}</legend>
        <div className="radio-group">
          {options.map((option, index) => {
            const optionValue = typeof option === 'string' ? option : option.value;
            const optionLabel = typeof option === 'string' ? option : option.label;
            return (
              <label key={index} className="radio-label">
                <input
                  type="radio"
                  name={field.field}
                  value={optionValue}
                  checked={value === optionValue}
                  onChange={handleChange}
                  disabled={disabled}
                  required={field.props?.required as boolean}
                />
                <span>{optionLabel}</span>
              </label>
            );
          })}
        </div>
      </fieldset>}
    </div>
  );
};

const DerivedInput: React.FC<InputFieldProps & { allValues?: Record<string, any> }> = ({ 
  field, 
  value, 
  disabled = true,
  allValues = {}
}) => {
  // Calculate value based on calculation rules
  const calculateValue = () => {
    if (!field.calculate || !field.calculate.fields) {
      return value || '';
    }

    const { operation, fields } = field.calculate;
    const values = fields.map(fieldName => {
      const val = allValues[fieldName];
      return typeof val === 'number' ? val : (parseFloat(val) || 0);
    });

    switch (operation.toLowerCase()) {
      case 'add':
        return values.reduce((sum, val) => sum + val, 0);
      case 'subtract':
        return values.length > 1 ? values[0] - values.slice(1).reduce((sum, val) => sum + val, 0) : values[0] || 0;
      case 'multiply':
        return values.reduce((product, val) => product * val, 1);
      case 'divide':
        return values.length > 1 && values[1] !== 0 ? values[0] / values[1] : 0;
      case 'percentage':
        return values.length > 1 && values[1] !== 0 ? ((values[0] / values[1]) * 100).toFixed(2) : '0.00';
      default:
        return value || '';
    }
  };

  const calculatedValue = calculateValue();

  return (
    <div className="form-group">
      {field.label && <label htmlFor={field.field} className="form-label">{field.label}</label>}
      <input
        id={field.field}
        type="text"
        className="form-input"
        value={calculatedValue}
        disabled={true}
        readOnly
        aria-describedby={field.label ? `${field.field}-description` : undefined}
      />
      {field.label && (
        <div id={`${field.field}-description`} className="sr-only">
          {field.label} (calculated field)
        </div>
      )}
    </div>
  );
};

const ConditionalInput: React.FC<InputFieldProps & { allValues?: Record<string, any> }> = ({ 
  field, 
  value, 
  onChange, 
  disabled,
  allValues = {} 
}) => {
  // Check if conditional field should be rendered
  const shouldRender = field.compare_field && field.compare_value && field.comparison_operation
    ? allValues[field.compare_field] === field.compare_value
    : true;

  if (!shouldRender) {
    return null;
  }

  // Render nested schema if available
  if (field.schema?.inputs) {
    return (
      <div className="conditional-group">
        {field.schema.inputs.map((nestedField, index) => (
          <InputFactory
            key={`${field.field}-${nestedField.field}-${index}`}
            field={nestedField}
            value={allValues[nestedField.field]}
            onChange={onChange}
            disabled={disabled}
            allValues={allValues}
          />
        ))}
      </div>
    );
  }

  return <TextInput field={field} value={value} onChange={onChange} disabled={disabled} />;
};

const LabelInput: React.FC<InputFieldProps> = ({ field }) => {
  const labelValue = field.props?.value as string || field.label || '';
  
  return (
    <div className="form-group">
      <div className="form-label-static">{labelValue}</div>
    </div>
  );
};

const FallbackInput: React.FC<InputFieldProps> = ({ field, value, onChange, disabled }) => {
  console.warn(`Unknown input type: ${field.type} for field: ${field.field}`);
  
  return (
    <div className="form-group">
      {field.label && <label htmlFor={field.field} className="form-label">{field.label}</label>}
      <input
        id={field.field}
        type="text"
        className="form-input"
        value={value || ''}
        onChange={(e) => onChange?.(field.field, e.target.value)}
        disabled={disabled}
        placeholder={`Unknown type: ${field.type}`}
        aria-describedby={field.label ? `${field.field}-description` : undefined}
      />
      {field.label && (
        <div id={`${field.field}-description`} className="sr-only">
          {field.label}
        </div>
      )}
    </div>
  );
};

// Main InputFactory component
interface InputFactoryProps extends InputFieldProps {
  allValues?: Record<string, any>;
}

const InputFactory: React.FC<InputFactoryProps> = ({ field, value, onChange, disabled, allValues }) => {
  const props = { field, value, onChange, disabled };

  switch (field.type.toLowerCase()) {
    case 'text':
      return <TextInput {...props} />;
    case 'textarea':
      return <TextAreaInput {...props} />;
    case 'number':
      return <NumberInput {...props} />;
    case 'select':
      return <SelectInput {...props} />;
    case 'date':
      return <DateInput {...props} />;
    case 'radio':
      return <RadioInput {...props} />;
    case 'label':
      return <LabelInput {...props} />;
    case 'derived':
      return <DerivedInput {...props} allValues={allValues} />;
    case 'conditional':
      return <ConditionalInput {...props} allValues={allValues} />;
    default:
      return <FallbackInput {...props} />;
  }
};

export default InputFactory;
