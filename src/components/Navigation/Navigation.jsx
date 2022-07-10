import { NavLink } from "react-router-dom";

import './Navigation.css';

import { PAGES } from '../../utils/constants'

function Navigation() {
  return (
    <nav className="header__nav nav">
      <ul className="nav__list">
        <li><NavLink
          className="nav__link"
          activeClassName="nav__link_active"
          to={PAGES.MOVIES}
        >Фильмы</NavLink></li>
        <li><NavLink
          className="nav__link"
          activeClassName="nav__link_active"
          to={PAGES.SAVED_MOVIES}
        >Сохранённые фильмы</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navigation;
