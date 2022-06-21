import './MoviesCard.css';

import photoCard from '../../images/film.jpg'

function MoviesCard() {
  const isFavofiteFilm = true

  return (
    <li className="card-film">
      <img
        className="card-film__image"
        src={photoCard}
        alt="Фильм"
      />
      <div className="card-film__description">
        <div className="card-film__row">
          <p className="card-film__name">33 слова о дизайне</p>
          <button
            className={
              isFavofiteFilm
                ? "card-film__like-button card-film__like-button_active"
                : "card-film__like-button"
            }
            type="button"
          ></button>
        </div>
        <p className="card-film__duration">1ч 47м</p>
      </div>
    </li >
  );
}

export default MoviesCard;
