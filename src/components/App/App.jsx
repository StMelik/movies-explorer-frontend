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
import Alert from "../Alert/Alert";

import ProtectedRoute from "../../hocs/ProtectedRoute";
import { AppStateContext } from '../../contexts/AppStateContext'
import MainApi from "../../utils/MainApi";
import MoviesApi from '../../utils/MoviesApi'
import { optionsMainApi, optionsMoviesApi } from '../../utils/optionsApi'
import { PAGES, ALERT_MESSAGES } from '../../utils/constants'
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

  const [messageAlert, setMessageAlert] = useState(null)
  const [isActiveAlert, setIsActiveAlert] = useState(false)

  const history = useHistory()
  const location = useLocation()

  const mainApi = new MainApi(optionsMainApi)
  const moviesApi = new MoviesApi(optionsMoviesApi)
  const jwtLocal = new LocalStorage('jwt')
  const filmsLocal = new LocalStorage('films')
  const searchQueryMoviesLocal = new LocalStorage('search-query-movies', { film: '', short: false })
  const searchQuerySavedMoviesLocal = new LocalStorage('search-query-saved-movies', { film: '', short: false })

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

  // Запросить все фильмы
  function requestAllFilms() {
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
        history.push(PAGES.MOVIES)
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
      .catch(() => {
        showAlert(ALERT_MESSAGES.ERROR.GET_USER)
        throw new Error()
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
        showAlert(ALERT_MESSAGES.SUCCESSFULLY.UPDATE_PROFILE)
      })
      .catch(() => {
        showAlert(ALERT_MESSAGES.ERROR.UPDATE_PROFILE)
        throw new Error()
      })
  }

  function clearLocal() {
    jwtLocal.delete()
    filmsLocal.delete()
    searchQueryMoviesLocal.delete()
    searchQuerySavedMoviesLocal.delete()
  }

  // Выйти из профиля
  function handleSignOut() {
    setIsLoggedIn(false)
    setToken('')
    setCurrentUser({})
    clearLocal()
    history.push(PAGES.MAIN)
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
        .catch(() => {
          showAlert(ALERT_MESSAGES.ERROR.DELETE_FILM)
          throw new Error()
        })
      : mainApi.addLikeFilm(film, token)
        .catch(() => {
          showAlert(ALERT_MESSAGES.ERROR.ADD_FILM)
          throw new Error()
        })
  }

  // Запросить лайкнутые фильмы
  function requestLikeFilms() {
    return mainApi.fetchLikeFilms(token)
  }

  function showAlert(message) {
    setMessageAlert(message)
    setIsActiveAlert(true)
    setTimeout(() => {
      setIsActiveAlert(false)
    }, 3000)
  }

  return (
    <>
      <AppStateContext.Provider value={{ loaderButton, isLoggedIn, currentUser, isFetchError }}>
        <Switch>
          <ProtectedRoute
            path={PAGES.MOVIES}
            exact
            isLoggedIn={isLoggedIn}
            requestAllFilms={requestAllFilms}
            handleClickLikeButton={handleClickLikeButton}
            requestLikeFilms={requestLikeFilms}
            setIsShowMenu={setIsShowMenu}
            component={Movies}
            isPreloader={isPreloader}
            filmsLocal={filmsLocal}
            searchQueryMoviesLocal={searchQueryMoviesLocal}
          />

          <ProtectedRoute
            path={PAGES.SAVED_MOVIES}
            exact
            isLoggedIn={isLoggedIn}
            handleClickLikeButton={handleClickLikeButton}
            requestLikeFilms={requestLikeFilms}
            setIsShowMenu={setIsShowMenu}
            component={SavedMovies}
            isPreloader={isPreloader}
            searchQuerySavedMoviesLocal={searchQuerySavedMoviesLocal}
          />

          <ProtectedRoute
            path={PAGES.PROFILE}
            exact
            isLoggedIn={isLoggedIn}
            handleUpdateUser={handleUpdateUser}
            handleSignOut={handleSignOut}
            currentUser={currentUser}
            setIsShowMenu={setIsShowMenu}
            component={Profile}
            isPreloader={isPreloader}
          />

          <ProtectedRoute
            path={PAGES.SIGNIN}
            exact
            isLoggedIn={!isLoggedIn}
            handleLogin={handleLogin}
            component={Login}
            isPreloader={isPreloader}
          />

          <ProtectedRoute
            path={PAGES.SIGNUP}
            exact
            isLoggedIn={!isLoggedIn}
            handleRegister={handleRegister}
            component={Register}
            isPreloader={isPreloader}
          />

          <Route path={PAGES.MAIN} exact>
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
      <Alert
        messageAlert={messageAlert}
        isActiveAlert={isActiveAlert}
      />
    </>
  );
}

export default App;
