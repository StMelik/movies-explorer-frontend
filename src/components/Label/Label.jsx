import './Label.css';

function Label({ text, value, setValue, type = 'text' }) {
  const isPassword = type === 'password'

  return (
    <label className="label">
      <p className="label__text">{text}</p>
      <input
        className="label__input"
        type={type}
        value={value}
        onChange={e => setValue(e.target.value)}
        autoComplete={isPassword ? 'off' : undefined}
      />
    </label>
  );
}

export default Label;
