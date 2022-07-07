import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

import './MoviesCard.css';

import { formatDuration } from '../../utils/formatDuration'

function MoviesCard({ film, handleClickLikeButton }) {
  const [filmId, setFilmId] = useState('')

  const currentPath = useHistory().location.pathname
  const isSavedMovies = currentPath === '/saved-movies'

  const baseUrl = 'https://api.nomoreparties.co'
  const imageUrl = film.thumbnail || `${baseUrl}/${film.image.formats.thumbnail.url}`

  useEffect(() => {
    const filmId = film._id
    if (filmId) setFilmId(filmId)
  }, [])

  function clickLikeButton() {
    if (isSavedMovies) {
      handleClickLikeButton(filmId)
    } else {
      const filmData = {
        country: film.country || '-',
        director: film.director,
        duration: film.duration,
        year: film.year,
        description: film.description,
        image: baseUrl + film.image.url,
        trailerLink: film.trailerLink,
        nameRU: film.nameRU,
        nameEN: film.nameEN || '-',
        thumbnail: baseUrl + film.image.formats.thumbnail.url,
        movieId: film.id,
      }

      handleClickLikeButton(filmId, filmData)
        .then(film => {
          setFilmId(filmId ? '' : film._id)
        })
    }
  }

  return (
    <li className="card-film">
      <a className='card-film__trailer-link' href={film.trailerLink} target="_blank">
        <img
          className="card-film__image"
          src={imageUrl}
          alt={film.nameRU}
        />
      </a>

      <div className="card-film__description">
        <div className="card-film__row">
          <p className="card-film__name">{film.nameRU}</p>
          <button
            className={
              filmId
                ? "card-film__like-button card-film__like-button_active"
                : "card-film__like-button"
            }
            type="button"
            onClick={clickLikeButton}
          ></button>
        </div>
        <p className="card-film__duration">{formatDuration(film.duration)}</p>
      </div>
    </li >
  );
}

export default MoviesCard;
