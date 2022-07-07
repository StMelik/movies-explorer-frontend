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
import HeaderLayout from "../../layouts/HeaderLayout/HeaderLayout";
import HeaderAndFooterLayout from "../../layouts/HeaderAndFooterLayout/HeaderAndFooterLayout";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
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
        jwtLocal.save(token)
        getUserInfo(token)
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
        setIsLoggedIn(true)
        setCurrentUser(user)
        history.push('/movies')
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
          <Route path='/movies' exact>
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
            >
              <HeaderAndFooterLayout
                setIsShowMenu={setIsShowMenu}
              >
                <Movies
                  getAllFilms={getAllFilms}
                  handleClickLikeButton={handleClickLikeButton}
                  getLikeFilms={getLikeFilms}
                />
              </HeaderAndFooterLayout>
            </ProtectedRoute>
          </Route>

          <Route path='/saved-movies' exact>
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
            >
              <HeaderAndFooterLayout
                setIsShowMenu={setIsShowMenu}
              >
                <SavedMovies
                  handleClickLikeButton={handleClickLikeButton}
                  getLikeFilms={getLikeFilms}
                />
              </HeaderAndFooterLayout>
            </ProtectedRoute>
          </Route>

          <Route path='/profile' exact>
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
            >
              <HeaderLayout
                setIsShowMenu={setIsShowMenu}
              >
                <Profile
                  handleUpdateUser={handleUpdateUser}
                  handleSignOut={handleSignOut}
                  currentUser={currentUser}
                />
              </HeaderLayout>
            </ProtectedRoute>
          </Route>

          <Route path='/signin' exact>
            <AuthLayout>
              <Login
                handleLogin={handleLogin}
              />
            </AuthLayout>
          </Route>

          <Route path='/signup' exact>
            <AuthLayout>
              <Register
                handleRegister={handleRegister}
              />
            </AuthLayout>
          </Route>

          <Route path='/' exact>
            <HeaderAndFooterLayout
              setIsShowMenu={setIsShowMenu}
            >
              <Main />
            </HeaderAndFooterLayout>
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
