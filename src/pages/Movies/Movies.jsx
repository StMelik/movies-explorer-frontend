import { useEffect, useState } from 'react';

import './Movies.css';

import SearchForm from '../../components/SearchForm/SearchForm';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import HeaderAndFooterLayout from '../../layouts/HeaderAndFooterLayout/HeaderAndFooterLayout';

import LoacalStorage from '../../utils/LocalStorage';
import { filterFilms } from '../../utils/filterFilms'
import { formatLikedFilms, setLike } from '../../utils/likes'
import { MESSAGES } from '../../utils/constants'
import { useCardCount } from '../../hooks/useCardCount'

function Movies({ getAllFilms, getLikeFilms, handleClickLikeButton, setIsShowMenu }) {
  const [allFilms, setAllFilms] = useState(null)
  const [values, setValues] = useState(null)

  // Отфильтрованные фильмы
  const [films, setFilms] = useState(null)
  // Отображаемые фильмы
  const [viewFilms, setViewFilms] = useState(null)
  // Сотояние прелодера
  const [isLoading, setIsLoading] = useState(false)
  // Сообщение об ошибке или что фильмы не найдены
  const [message, setMessage] = useState(null)

  const { countFilms, startCountFilms, setParamsCountFilms } = useCardCount(3, 12)

  // Локальное хранилище
  const filmsLocal = new LoacalStorage('films')

  // Установить количество загружаемых фильмов
  useEffect(() => {
    setFilms(filmsLocal.load())

    setParamsCountFilms('all')
    window.addEventListener('resize', setParamsCountFilms)
    return () => {
      window.removeEventListener('resize', setParamsCountFilms)
    }
  }, [])

  // Получить все фильмы и лайкнутые фильмы
  useEffect(() => {
    const isNotAllFilms = !allFilms?.all.length

    if (isNotAllFilms && isLoading) {
      Promise.all([getAllFilms(), getLikeFilms()])
        .then(([all, likes]) => {
          setAllFilms({
            all,
            likes: formatLikedFilms(likes)
          })
        })
        .catch(() => {
          setMessage(MESSAGES.ERROR)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [values])

  // Получить отфильтрованные фильмы
  useEffect(() => {
    if (values && allFilms) {
      const filtredFilms = filterFilms(allFilms.all, values)
      const isNotFiltredFilms = !filtredFilms.length
      if (isNotFiltredFilms) setMessage(MESSAGES.NOT_FOUND)

      const filmsWithLike = setLike(filtredFilms, allFilms.likes)
      filmsLocal.save(filmsWithLike)
      setFilms(filmsWithLike)
    }
  }, [allFilms, values])


  useEffect(() => {
    if (films) {
      setViewFilms([...films.slice(0, startCountFilms)])
      setMessage('')
    }
    if (!films?.length) setMessage(MESSAGES.NOT_FOUND)
  }, [films, startCountFilms])

  // Показать еще фильмы
  function showMoreFilms() {
    const startIndex = viewFilms.length
    const endIndex = startIndex + countFilms

    setViewFilms([...viewFilms, ...films.slice(startIndex, endIndex)])
  }

  // Поиск фильмов
  function searchFilms(values) {
    setValues(values)
    if (!allFilms) setIsLoading(true)
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
          {films && films?.length > 3 && films?.length !== viewFilms?.length && <button
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
