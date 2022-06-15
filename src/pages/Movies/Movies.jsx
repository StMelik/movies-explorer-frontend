import { useState } from 'react';
import './Movies.css';
import SearchForm from '../../components/SearchForm/SearchForm';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';

function Movies() {
  const [isShort, setIsShort] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  const searchFilms = (evt) => {
    evt.preventDefault()
    console.log(isShort, searchQuery);
  }

  return (
    <div className="movies">
      <div className="container">
        <SearchForm
          isShort={isShort}
          searchQuery={searchQuery}
          setIsShort={setIsShort}
          setSearchQuery={setSearchQuery}
          searchFilms={searchFilms}
        />
        <MoviesCardList />
        <button className="movies__more-button">Ещё</button>
      </div>
    </div>
  );
}

export default Movies;
