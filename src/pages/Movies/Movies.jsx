import { useState } from 'react';
import './Movies.css';
import SearchForm from '../../components/SearchForm/SearchForm';

function Movies() {
  const [isShort, setIsShort] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  const searchFilms = (evt) => {
    evt.preventDefault()
    console.log(isShort, searchQuery);
  }

  return (
    <div className="movies-page">
      <SearchForm
        isShort={isShort}
        searchQuery={searchQuery}
        setIsShort={setIsShort}
        setSearchQuery={setSearchQuery}
        searchFilms={searchFilms}
      />
      Movies
    </div>
  );
}

export default Movies;
