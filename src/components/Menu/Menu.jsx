import { NavLink } from 'react-router-dom';

import './Menu.css';

import ProfileButton from '../ProfileButton/ProfileButton';

import { PAGES } from '../../utils/constants'

function Menu({ isShowMenu, setIsShowMenu }) {
  return (
    <div className={isShowMenu ? 'menu menu_active' : 'menu'}>
      <div className="menu__wrapper">
        <button
          className="menu__close-button"
          onClick={() => setIsShowMenu(false)}
          type="button"
        ></button>
        <nav className="menu__nav">
          <ul className="menu__nav-list">
            <li>
              <NavLink
                className="menu__nav-link"
                activeClassName="menu__nav-link_active"
                to={PAGES.MAIN}
                exact
              >Главная</NavLink>
            </li>
            <li>
              <NavLink
                className="menu__nav-link"
                activeClassName="menu__nav-link_active"
                to={PAGES.MOVIES}
              >Фильмы</NavLink>
            </li>
            <li>
              <NavLink
                className="menu__nav-link"
                activeClassName="menu__nav-link_active"
                to={PAGES.SAVED_MOVIES}
              >Сохранённые фильмы</NavLink>
            </li>
          </ul>
        </nav>
        <ProfileButton />
      </div>
    </div>
  );
}

export default Menu;
