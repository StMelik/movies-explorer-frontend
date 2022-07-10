import { useEffect, useState } from 'react';

import './SavedMovies.css';

import SearchForm from '../../components/SearchForm/SearchForm';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import HeaderAndFooterLayout from '../../layouts/HeaderAndFooterLayout/HeaderAndFooterLayout';

import { filterFilms } from '../../utils/filterFilms'
import { MESSAGES, SHORT_DURATION } from '../../utils/constants'

function SavedMovies({ requestLikeFilms, handleClickLikeButton, setIsShowMenu }) {
  const [likedFilms, setLikedFilms] = useState(null)
  const [displayedFilms, setDisplayedFilms] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getLikeFilms()
  }, [])

  function getLikeFilms() {
    startLoader()
    requestLikeFilms()
      .then(films => {
        setAllFilms(films)
        hideErrorMessage()
      })
      .catch(() => {
        showErrorMessage(MESSAGES.ERROR)
      })
      .finally(() => {
        stopLoader()
      })
  }

  function searchFilms(values) {
    const films = filterFilms(likedFilms, SHORT_DURATION, values)
    setDisplayedFilms(films)

    films?.length ? hideErrorMessage() : showErrorMessage(MESSAGES.NOT_FOUND)
  }

  function handleDeleteFilm(filmId) {
    handleClickLikeButton(filmId)
      .then(() => setAllFilms(likedFilms.filter(film => film._id !== filmId)))
  }

  function setAllFilms(films) {
    setLikedFilms(films)
    setDisplayedFilms(films)
  }

  function startLoader() {
    setIsLoading(true)
  }

  function stopLoader() {
    setIsLoading(false)
  }

  function showErrorMessage(message) {
    setErrorMessage(message)
  }

  function hideErrorMessage() {
    setErrorMessage(null)
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
            films={displayedFilms}
            isLoading={isLoading}
            message={errorMessage}
            handleClickLikeButton={handleDeleteFilm}
          />
        </div>
      </div>
    </HeaderAndFooterLayout>
  );
}

export default SavedMovies;
