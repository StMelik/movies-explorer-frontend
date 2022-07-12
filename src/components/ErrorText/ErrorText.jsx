import './ErrorText.css';

function ErrorText({ children, type }) {
  return (
    <p className={`error-text error-text_${type}`}>{children}</p>
  );
}

export default ErrorText;
