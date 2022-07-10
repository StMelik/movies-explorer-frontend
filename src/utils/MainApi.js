export default class MainApi {
    constructor(options) {
        this._baseUrl = options.baseUrl
        this._headers = options.headers
    }

    _fetch(path, method, body, token) {
        const url = this._baseUrl + path
        return fetch(url, {
            method,
            headers: {
                ...this._headers,
                authorization: token ? `Bearer ${token}` : ''
            },
            body
        })
            .then(res => {
                return res.ok
                    ? res.json()
                    : Promise.reject(`Ошибка: ${res.status}`)
            })
    }

    signup(user) {
        const body = JSON.stringify(user)
        return this._fetch('/signup', 'POST', body)
    }

    signin(user) {
        const body = JSON.stringify(user)
        return this._fetch('/signin', 'POST', body)
    }

    updateUserInfo(user, token) {
        const body = JSON.stringify(user)
        return this._fetch('/users/me', 'PATCH', body, token)
    }

    getUserInfo(token) {
        return this._fetch('/users/me', 'GET', null, token)
    }

    fetchLikeFilms(token) {
        return this._fetch('/movies', 'GET', null, token)
    }

    addLikeFilm(film, token) {
        const body = JSON.stringify(film)
        return this._fetch('/movies', 'POST', body, token)
    }

    deleteLikeFilm(filmId, token) {
        return this._fetch(`/movies/${filmId}`, 'DELETE', null, token)
    }
}