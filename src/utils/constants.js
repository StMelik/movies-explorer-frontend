const INPUTS = {
    NAME: 'name',
    EMAIL: 'email',
    PASSWORD: 'password',
}

const PATTERNS = {
    NAME: '([A-Za-zа-яёА-ЯЁ]| |-)*'
}

const MESSAGES = {
    NOT_FOUND: 'Ничего не найдено',
    ERROR: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
}

const PAGES = {
    MOVIES: '/movies',
    SAVED_MOVIES: '/saved-movies',
    PROFILE: '/profile',
    SIGNIN: '/signin',
    SIGNUP: '/signup',
    MAIN: '/',
}

const CARD_COUNT = {
    SMALL_DEVICE: {
        ADD: 2,
        START: 5
    },
    MIDDLE_DEVICE: {
        ADD: 2,
        START: 8
    },
    BIG_DEVICE: {
        ADD: 3,
        START: 12
    },
}

const CARD_BRAKEPOINT = {
    TWO: 1000,
    ONE: 700
}

const BASE_URL = 'https://api.nomoreparties.co'

const SHORT_DURATION = 40

export { INPUTS, PATTERNS, MESSAGES, PAGES, BASE_URL, CARD_COUNT, CARD_BRAKEPOINT, SHORT_DURATION }