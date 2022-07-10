import { useEffect, useState } from 'react';

import './SearchForm.css';

import ErrorText from "../../components/ErrorText/ErrorText";

import { useFormWithValidation } from '../../hooks/useFormWithValidation'

function SearchForm({ searchFilms, searchQueryLocal }) {
  const startValue = { film: '', short: false }

  const { values, isValid, handleChange, setValues, setIsValid } = useFormWithValidation(startValue)
  // Состояние ошибки поиска 
  const [isSearchError, setIsSearchError] = useState(false)

  useEffect(() => {
    const searchQuery = searchQueryLocal.load()

    setValues(searchQuery)
    if (searchQuery) setIsValid(true)
  }, [])

  // Поиск фильмов при изменении состояния чекбокса
  function onChangeCheckbox(evt) {
    const newValues = { ...values, short: evt.target.checked }

    handleChange(evt)
    searchFilms(newValues)
    searchQueryLocal.save(newValues)
  }

  function handleSubmitForm(evt) {
    evt.preventDefault()
    searchQueryLocal.save(values)

    if (!isValid) {
      setIsSearchError(true)
    } else {
      setIsSearchError(false)
      searchFilms(values)
    }
  }

  return (
    <section className="search">
      <form className="search__form from-search" onSubmit={handleSubmitForm} noValidate>
        <input
          className="from-search__input"
          type="text"
          name='film'
          placeholder='Фильм'
          value={values.film}
          onInput={handleChange}
          required
        />
        <button className="from-search__button" type="submit"></button>
        <label className="from-search__label" >
          <input
            className="from-search__checkbox"
            type="checkbox"
            name='short'
            checked={values.short}
            onChange={onChangeCheckbox}
          />
          <div className="from-search__custom-checkbox">
            <div className="from-search__custom-mark"></div>
          </div>
          <p className="form-search__label-text">Короткометражки</p>
        </label>
      </form>
      {isSearchError && <ErrorText type='search'>Нужно ввести ключевое слово</ErrorText>}
    </section>
  );
}

export default SearchForm;
