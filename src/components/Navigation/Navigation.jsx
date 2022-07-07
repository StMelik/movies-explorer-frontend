import { NavLink } from "react-router-dom";

import './Navigation.css';

function Navigation() {
  return (
    <nav className="header__nav nav">
      <ul className="nav__list">
        <li><NavLink
          className="nav__link"
          activeClassName="nav__link_active"
          to="/movies"
        >Фильмы</NavLink></li>
        <li><NavLink
          className="nav__link"
          activeClassName="nav__link_active"
          to="/saved-movies"
        >Сохранённые фильмы</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navigation;
