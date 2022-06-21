import './NavTab.css';

function NavTab() {
  return (
    <nav className="project-nav">
      <div className="container project-nav__contain">
        <ul className="project-nav__list">
          <li><a className="project-nav__link" href="#project">О проекте</a></li>
          <li><a className="project-nav__link" href="#techs">Технологии</a></li>
          <li><a className="project-nav__link" href="#about-me">Студент</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default NavTab;
