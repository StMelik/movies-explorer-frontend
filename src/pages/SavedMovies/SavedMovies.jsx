import { useState } from 'react';
import './SavedMovies.css';
import SearchForm from '../../components/SearchForm/SearchForm';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';

function SavedMovies() {
  const [isShort, setIsShort] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  const searchFilms = (evt) => {
    evt.preventDefault()
    console.log(isShort, searchQuery);
  }

  return (
    <div className="saved">
      <div className="container movies__container">
        <SearchForm
          isShort={isShort}
          searchQuery={searchQuery}
          setIsShort={setIsShort}
          setSearchQuery={setSearchQuery}
          searchFilms={searchFilms}
        />
        <MoviesCardList />
      </div>
    </div>
  );
}

export default SavedMovies;
