import './SearchForm.css';

function SearchForm({ isShort, setIsShort, searchQuery, setSearchQuery, searchFilms }) {
  return (
    <section className="search">
      <form className="search__form from-search" onSubmit={searchFilms}>
        <input
          className="from-search__input"
          type="text"
          placeholder='Фильм'
          value={searchQuery}
          onInput={e => setSearchQuery(e.target.value)}
        />
        <button className="from-search__button"></button>
        <label className="from-search__label" >
          <input
            className="from-search__checkbox"
            type="checkbox"
            checked={isShort}
            onChange={() => setIsShort(!isShort)}
          />
          <div className="from-search__custom-checkbox">
            <div className="from-search__custom-mark"></div>
          </div>
          <p className="form-search__label-text">Короткометражки</p>
        </label>
      </form>
    </section>
  );
}

export default SearchForm;
