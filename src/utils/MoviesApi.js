export default class MoviesApi {
    constructor(options) {
        this._baseUrl = options.baseUrl
        this._headers = options.headers
    }

    getFilms() {
        return fetch(this._baseUrl, {
            method: 'GET',
            headers: this._headers,
        })
            .then(res => {
                return res.ok
                    ? res.json()
                    : Promise.reject(`Ошибка: ${res.status}`)
            })
    }
}