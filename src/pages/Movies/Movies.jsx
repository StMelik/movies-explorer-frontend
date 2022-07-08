import { useEffect, useState } from 'react';

import './Movies.css';

import SearchForm from '../../components/SearchForm/SearchForm';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import HeaderAndFooterLayout from '../../layouts/HeaderAndFooterLayout/HeaderAndFooterLayout';

import LoacalStorage from '../../utils/LocalStorage';
import { filterFilms } from '../../utils/filterFilms'
import { useCardCount } from '../../hooks/useCardCount'

function Movies({ getAllFilms, getLikeFilms, handleClickLikeButton, setIsShowMenu }) {
  // Отфильтрованные фильмы
  const [films, setFilms] = useState([])
  // Отображаемые фильмы
  const [viewFilms, setViewFilms] = useState([])
  // Сотояние прелодера
  const [isLoading, setIsLoading] = useState(false)
  // Сообщение об ошибке или что фильмы не найдены
  const [message, setMessage] = useState('')

  const { countFilms, startCountFilms, setParamsCountFilms } = useCardCount(3, 12)

  // Локальное хранилище
  const filmsLocal = new LoacalStorage('films')

  // Установить количество загружаемых фильмов
  useEffect(() => {
    setFilmsWhitLike(filmsLocal.load())
    setParamsCountFilms('all')
    window.addEventListener('resize', setParamsCountFilms)

    return () => {
      window.removeEventListener('resize', setParamsCountFilms)
    }
  }, [])

  useEffect(() => {
    setViewFilms([...films.slice(0, startCountFilms)])
  }, [films, startCountFilms])

  // Показать еще фильмы
  function showMoreFilms() {
    const startIndex = viewFilms.length
    const endIndex = startIndex + countFilms

    setViewFilms([...viewFilms, ...films.slice(startIndex, endIndex)])
  }

  // Поиск фильмов
  function searchFilms(values) {
    setIsLoading(true)
    setMessage('')

    getAllFilms()
      .then(allFilms => {
        const filterFilmsList = filterFilms(allFilms, values)

        if (!filterFilmsList.length) {
          setMessage('Ничего не найдено')
          setViewFilms([])
        }

        setFilmsWhitLike(filterFilmsList)
        filmsLocal.save(filterFilmsList)
      })
      .catch(() => {
        setMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  // Установить лайки на лайкнутые фильмы
  function setFilmsWhitLike(films) {
    getLikeFilms()
      .then(savedFilms => {
        const likedFilms = savedFilms.map(film => ({
          movieId: film.movieId,
          _id: film._id
        }))

        const filmsWithLike = films.map(film => {
          let isLikedFilm = false
          let _id = ''

          likedFilms.forEach(likedFilm => {
            isLikedFilm = film.id === likedFilm.movieId
            if (isLikedFilm) _id = likedFilm._id
          })

          return { ...film, _id }
        })

        setFilms(filmsWithLike)
      })
  }

  return (
    <HeaderAndFooterLayout
      setIsShowMenu={setIsShowMenu}
    >
      <div className="movies">
        <div className="container movies__container">
          <SearchForm
            searchFilms={searchFilms}
            type='movies'
          />
          <MoviesCardList
            films={viewFilms}
            isLoading={isLoading}
            message={message}
            handleClickLikeButton={handleClickLikeButton}
          />
          {films.length > 3 && films.length !== viewFilms.length && <button
            className="movies__more-button"
            type='button'
            onClick={() => showMoreFilms()}
          >Ещё</button>}

        </div>
      </div >
    </HeaderAndFooterLayout>
  );
}

export default Movies;
