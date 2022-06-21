import { useHistory } from 'react-router-dom'
import './Logo.css';
import logo from '../../images/logo.svg'

function Logo() {
  const history = useHistory()

  function handleClick() {
    history.push("/");
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
