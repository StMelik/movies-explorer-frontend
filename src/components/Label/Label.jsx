import './Label.css';

import { INPUTS } from '../../utils/constants'

function Label({ text, name, type = 'text', onInput, isValid, value, pattern, title }) {
  const isPassword = type === INPUTS.PASSWORD

  function getPlaceholder(text) {
    const lowerText = text.toLowerCase()
    return text === 'Имя' ? `Вашe ${lowerText}` : `Ваш ${lowerText}`
  }

  return (
    <label className="label">
      <p className="label__text">{text}</p>
      <input
        className={
          isValid
            ? 'label__input'
            : 'label__input label__input_error'
        }
        type={type}
        autoComplete={isPassword ? 'off' : undefined}
        placeholder={getPlaceholder(text)}
        required
        name={name}
        onInput={onInput}
        value={value}
        pattern={pattern}
        title={title}
      />
    </label>
  );
}

export default Label;
