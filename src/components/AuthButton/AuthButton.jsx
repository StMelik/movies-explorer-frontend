import { useHistory, Link } from "react-router-dom";
import './AuthButton.css';

function AuthButton() {
  const currentPath = useHistory().location.pathname
  const isSignIn = currentPath === '/signin'
  const link = isSignIn ? '/signup' : '/signin'
  const textButton = isSignIn ? 'Войти' : 'Зарегистрироваться'

  const question = (
    <div className="auth__question">
      <p className="auth__question-text">
        {isSignIn ? 'Ещё не зарегистрированы?' : 'Уже зарегистрированы?'}
      </p>
      <Link className="auth__question-link" to={link}>
        {isSignIn ? 'Регистрация' : 'Войти'}
      </Link>
    </div>
  )

  return (
    <>
      <button type="submit" className='form__submit-button'>{textButton}</button>
      {question}
    </>
  );
}

export default AuthButton;
