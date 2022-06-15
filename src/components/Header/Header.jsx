import { useHistory, Link } from "react-router-dom";
import './Header.css';
import Logo from '../Logo/Logo'
import Navigation from "../Navigation/Navigation";

function Header() {
  const currentPath = useHistory().location.pathname
  const isMainPage = currentPath === '/'
  const isLoggedIn = true

  const buttons = isLoggedIn ? (
    <div className="header__profile">
      <Link className="header__profile-button" to='/profile'>Аккаунт</Link>
      <div className="header__profile-photo"></div>
    </div>
  ) : (
    <div className="header__buttons">
      <Link className="header__button" to='/signup'>Регистрация</Link>
      <Link className="header__button header__button_color_green" to='/signin'>Войти</Link>
    </div>
  )

  return (
    <header
      className="header"
      style={{ backgroundColor: isMainPage && '#073042' }}
    >
      <div className="container header__container">
        <div className="header__wrapper">
          <Logo />
          {isLoggedIn && <Navigation />}
          {buttons}
        </div>
      </div>
    </header >
  );
}

export default Header;
