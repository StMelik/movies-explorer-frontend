const shortDuration = 40

export const filterFilms = (films, { film: searchQuery, short: isShort }) => {
    return films.filter(film => {
        const isShortFilm = film.duration <= shortDuration
        const filmName = film.nameRU.toLowerCase()
        const search = searchQuery.toLowerCase()

        return isShort
            ? filmName.includes(search) && isShortFilm
            : filmName.includes(search)
    })
} 