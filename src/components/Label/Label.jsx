import './Label.css';

function Label({ text, value, setValue, type = 'text' }) {
  const isPassword = type === 'password'
  const getPlaceholder = (text) => {
    const lowerText = text.toLowerCase()
    return text === 'Имя' ? `Вашe ${lowerText}` : `Ваш ${lowerText}`
  }

  return (
    <label className="label">
      <p className="label__text">{text}</p>
      <input
        className="label__input"
        type={type}
        value={value}
        onChange={e => setValue(e.target.value)}
        autoComplete={isPassword ? 'off' : undefined}
        placeholder={getPlaceholder(text)}
        required
      />
    </label>
  );
}

export default Label;
