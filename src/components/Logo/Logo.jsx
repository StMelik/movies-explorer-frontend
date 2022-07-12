import { useHistory } from 'react-router-dom'

import './Logo.css';

import logo from '../../images/logo.svg'

import { PAGES } from '../../utils/constants'

function Logo() {
  const history = useHistory()

  function handleClick() {
    history.push(PAGES.MAIN);
  }

  return (
    <img
      className="logo"
      src={logo}
      alt="Логотип"
      onClick={handleClick}
    />
  );
}

export default Logo;
