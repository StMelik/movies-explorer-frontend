import { useHistory } from 'react-router-dom'

import './NotFound.css';

function Login() {
  const history = useHistory()

  // исправляет высоту на мобилке
  const h = window.innerHeight + 'px'

  function handleClick() {
    history.goBack();
  }

  return (
    <div className="page-404" style={{ height: h }}>
      <div className="page-404__text">
        <p className="page-404__title">404</p>
        <p className="page-404__subtitle">Страница не найдена</p>
      </div>
      <button
        className="page-404__back-button"
        onClick={handleClick}
        type="button"
      >Назад</button>
    </div>
  );
}

export default Login;
