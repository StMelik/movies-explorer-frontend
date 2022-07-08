import { useState, useEffect } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";

import './App.css';

import Movies from '../../pages/Movies/Movies'
import Profile from '../../pages/Profile/Profile'
import Register from '../../pages/Register/Register'
import Login from '../../pages/Login/Login'
import SavedMovies from '../../pages/SavedMovies/SavedMovies'
import Main from '../../pages/Main/Main'
import NotFound from '../../pages/404/NotFound'
import Menu from "../Menu/Menu";

import ProtectedRoute from "../../hocs/ProtectedRoute";
import { AppStateContext } from '../../contexts/AppStateContext'
import MainApi from "../../utils/MainApi";
import MoviesApi from '../../utils/MoviesApi'
import { optionsMainApi, optionsMoviesApi } from '../../utils/optionsApi'
import LocalStorage from "../../utils/LocalStorage";

function App() {
  // Состояние меню
  const [isShowMenu, setIsShowMenu] = useState(false)
  // Данные текущего пользоволетя
  const [currentUser, setCurrentUser] = useState({})
  // Токен
  const [token, setToken] = useState('')
  // Лоадер кнопки Войти/Зарегестрироваться
  const [loaderButton, setLoaderButton] = useState(false)
  // Состояние входа в профиль
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  // Состояние ответа сервера
  const [isFetchError, setIsFetchError] = useState(false)

  const [isPreloader, setIsPreloader] = useState(true)

  // const [allFilms, setAllFilms] = useState([])

  const history = useHistory()
  const location = useLocation()

  const mainApi = new MainApi(optionsMainApi)
  const moviesApi = new MoviesApi(optionsMoviesApi)
  const jwtLocal = new LocalStorage('jwt')

  useEffect(() => {
    document.body.style.overflow = isShowMenu ? 'hidden' : ''
  }, [isShowMenu])

  useEffect(() => {
    setIsFetchError(false)
    setIsShowMenu(false)
  }, [location])

  useEffect(() => {
    handleLoginToken()
  }, [])

  // Получить все фильмы
  function getAllFilms() {
    return moviesApi.getFilms()
  }

  // Регистрация
  function handleRegister({ name, email, password }) {
    setLoaderButton(true)
    setIsFetchError(false)
    mainApi.signup({ name, email, password })
      .then(() => {
        handleLogin({ email, password })
      })
      .catch(() => {
        setIsFetchError(true)
      })
      .finally(() => {
        setLoaderButton(false)
      })
  }

  // Авторизация
  function handleLogin(user) {
    setLoaderButton(true)
    setIsFetchError(false)
    mainApi.signin(user)
      .then(res => {
        const token = res.token
        setToken(token)
        setIsLoggedIn(true)
        jwtLocal.save(token)
        getUserInfo(token)
        history.push('/movies')
      })
      .catch(() => {
        setIsFetchError(true)
      })
      .finally(() => {
        setLoaderButton(false)
      })
  }

  // Получить данные пользовотеля
  function getUserInfo(token) {
    mainApi.getUserInfo(token)
      .then(user => {
        if (!isLoggedIn) setIsLoggedIn(true)
        setCurrentUser(user)
      })
      .finally(() => {
        setIsPreloader(false)
      })
  }

  // Обновить данные пользовотеля
  function handleUpdateUser(user) {
    return mainApi.updateUserInfo(user, token)
      .then(newData => {
        setCurrentUser(newData)
      })
  }

  // Выйти из профиля
  function handleSignOut() {
    setIsLoggedIn(false)
    setToken('')
    setCurrentUser({})
    jwtLocal.delete()
    history.push('/')
  }

  // Вход по токену
  function handleLoginToken() {
    const token = jwtLocal.load()
    if (token) {
      setToken(token)
      getUserInfo(token)
    } else {
      setIsPreloader(false)
    }
  }

  // Управление лайком
  function handleClickLikeButton(filmId, film) {
    return filmId
      ? mainApi.deleteLikeFilm(filmId, token)
      : mainApi.addLikeFilm(film, token)
  }

  // Получить лайкнутые фильмы
  function getLikeFilms() {
    return mainApi.getLikeFilms(token)
  }

  return (
    <>
      <AppStateContext.Provider value={{ loaderButton, isLoggedIn, currentUser, isFetchError }}>
        <Switch>
          <ProtectedRoute
            path='/movies'
            exact
            isLoggedIn={isLoggedIn}
            getAllFilms={getAllFilms}
            handleClickLikeButton={handleClickLikeButton}
            getLikeFilms={getLikeFilms}
            setIsShowMenu={setIsShowMenu}
            component={Movies}
            isPreloader={isPreloader}
          />

          <ProtectedRoute
            path='/saved-movies'
            exact
            isLoggedIn={isLoggedIn}
            handleClickLikeButton={handleClickLikeButton}
            getLikeFilms={getLikeFilms}
            setIsShowMenu={setIsShowMenu}
            component={SavedMovies}
            isPreloader={isPreloader}
          />

          <ProtectedRoute
            path='/profile'
            exact
            isLoggedIn={isLoggedIn}
            handleUpdateUser={handleUpdateUser}
            handleSignOut={handleSignOut}
            currentUser={currentUser}
            setIsShowMenu={setIsShowMenu}
            component={Profile}
            isPreloader={isPreloader}
          />

          <Route path='/signin' exact>
            <Login handleLogin={handleLogin} />
          </Route>

          <Route path='/signup' exact>
            <Register handleRegister={handleRegister} />
          </Route>

          <Route path='/' exact>
            <Main setIsShowMenu={setIsShowMenu} />
          </Route>

          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>

        <Menu
          isShowMenu={isShowMenu}
          setIsShowMenu={setIsShowMenu}
        />
      </AppStateContext.Provider>
    </>
  );
}

export default App;
