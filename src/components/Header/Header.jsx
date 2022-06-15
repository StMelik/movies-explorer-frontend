import { Link } from "react-router-dom";
import './Header.css';
import Logo from '../Logo/Logo'

function Header() {
  return (
    <header className="header">
      <div className="container header__container">
        <div className="header__wrapper">
          <Logo />
          <div className="header__buttons">
            <Link className="header__button" to='/signup'>Регистрация</Link>
            <Link className="header__button header__button_color_green" to='/signin'>Войти</Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
