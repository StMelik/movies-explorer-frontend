import { useEffect, useState } from 'react';

import './SavedMovies.css';

import SearchForm from '../../components/SearchForm/SearchForm';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import HeaderAndFooterLayout from '../../layouts/HeaderAndFooterLayout/HeaderAndFooterLayout';

import { filterFilms } from '../../utils/filterFilms'
import { MESSAGES } from '../../utils/constants'

function SavedMovies({ getLikeFilms, handleClickLikeButton, setIsShowMenu }) {
  const [films, setFilms] = useState([])
  const [viewFilms, setViewFilms] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    getFilms()
  }, [])

  useEffect(() => {
    setMessage('')
    if (!films.length) showNotFoundMessage()
  }, [films])

  function setAllFilms(films) {
    setFilms(films)
    setViewFilms(films)
  }

  function getFilms() {
    setIsLoading(true)
    getLikeFilms()
      .then(setAllFilms)
      .catch(() => {
        setMessage(MESSAGES.ERROR)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function searchFilms(values) {
    const filterFilmsList = filterFilms(films, values)
    setMessage('')
    setViewFilms(filterFilmsList)
    if (!filterFilmsList.length) showNotFoundMessage()
  }

  function deleteFilm(filmId) {
    handleClickLikeButton(filmId)
      .then(() => setAllFilms(films.filter(film => film._id !== filmId)))
  }

  function showNotFoundMessage() {
    setMessage(MESSAGES.NOT_FOUND)
    setViewFilms([])
  }

  return (
    <HeaderAndFooterLayout
      setIsShowMenu={setIsShowMenu}
    >
      <div className="saved">
        <div className="container movies__container">
          <SearchForm
            searchFilms={searchFilms}
            type="saved-movies"
          />
          <MoviesCardList
            films={viewFilms}
            isLoading={isLoading}
            message={message}
            handleClickLikeButton={deleteFilm}
          />
        </div>
      </div>
    </HeaderAndFooterLayout>
  );
}

export default SavedMovies;
