import { useContext } from "react";
import { useHistory, Link } from "react-router-dom";

import './AuthButton.css';

import ErrorText from "../../components/ErrorText/ErrorText";

import { AppStateContext } from '../../contexts/AppStateContext'
import { PAGES } from '../../utils/constants'

function AuthButton({ isDisabled }) {
  const { loaderButton, isFetchError } = useContext(AppStateContext)

  const isSignIn = useHistory().location.pathname === PAGES.SIGNIN
  const textButton = isSignIn
    ? loaderButton ? 'Вход...' : 'Войти'
    : loaderButton ? 'Регистрация...' : 'Зарегистрироваться'

  const question = (
    <div className="auth__question">
      <p className="auth__question-text">
        {isSignIn ? 'Ещё не зарегистрированы?' : 'Уже зарегистрированы?'}
      </p>
      <Link className="auth__question-link" to={isSignIn ? PAGES.SIGNUP : PAGES.SIGNIN}>
        {isSignIn ? 'Регистрация' : 'Войти'}
      </Link>
    </div>
  )

  return (
    <>
      <button
        type="submit"
        className={isDisabled
          ? 'form__submit-button form__submit-button_disabled'
          : 'form__submit-button'
        }
        disabled={isDisabled}
      >{textButton}</button>
      {isFetchError && <ErrorText type='auth-button'>Что-то пошло не так...</ErrorText>}
      {question}
    </>
  );
}

export default AuthButton;
