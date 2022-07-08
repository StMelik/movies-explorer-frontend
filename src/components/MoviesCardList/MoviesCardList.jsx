import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader'

function MoviesCardList({ films, isLoading, message, handleClickLikeButton }) {
  return (
    <>
      {message
        ? <p className='movies__alert'>{message}</p>
        : <ul className="movies-list">
          {isLoading
            ? <Preloader />
            : films?.map(film => {
              return <MoviesCard
                film={film}
                key={film.id || film.movieId}
                handleClickLikeButton={handleClickLikeButton}
              />
            })
          }
        </ul>
      }
    </>
  );
}

export default MoviesCardList;
