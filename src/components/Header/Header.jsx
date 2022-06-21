import { useHistory, Link } from "react-router-dom";
import './Header.css';
import Logo from '../Logo/Logo'
import Navigation from "../Navigation/Navigation";
import ProfileButton from "../ProfileButton/ProfileButton";
import { useState } from "react";

function Header() {
  const currentPath = useHistory().location.pathname
  const isMainPage = currentPath === '/'
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const buttons = isLoggedIn ? (
    <ProfileButton />
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
          {isLoggedIn && <div className="header__menu-button"></div>}
        </div>
      </div>
    </header >
  );
}

export default Header;
