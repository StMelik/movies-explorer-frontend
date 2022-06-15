import { useHistory } from 'react-router-dom'
import './NotFound.css';

function Login() {
  const history = useHistory()

  function handleClick() {
    history.goBack();
  }

  return (
    <div className="page-404">
      <p className="page-404__title">404</p>
      <p className="page-404__subtitle">Страница не найдена</p>
      <button className="page-404__back-button" onClick={handleClick}>Назад</button>
    </div>
  );
}

export default Login;
