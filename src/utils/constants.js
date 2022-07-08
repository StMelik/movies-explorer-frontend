const INPUTS = {
    NAME: 'name',
    EMAIL: 'email',
    PASSWORD: 'password'
}

const PATTERNS = {
    NAME: '([A-Za-zа-яёА-ЯЁ]| |-)*'
}

const MESSAGES = {
    NOT_FOUND: 'Ничего не найдено',
    ERROR: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
}

export { INPUTS, PATTERNS, MESSAGES }