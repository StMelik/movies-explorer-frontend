import { useState } from "react";

export function useCardCount(CARD_COUNT) {
    // Кол-во загружаемых фильмов
    const [countAddFilms, setCountAddFilms] = useState(0)
    // Кол-во первоночально отоброжаемых фильмов
    const [startCountFilms, setStartCountFilms] = useState(0)

    function setParamsCountFilms(mode) {
        const deviceWidth = document.documentElement.clientWidth
        const threeCardWidth = 1000
        const twoCardWidth = 700
        const isUpdate = mode === 'all'

        const middleDevice = deviceWidth <= threeCardWidth && deviceWidth > twoCardWidth
        const smallDevice = deviceWidth <= twoCardWidth && deviceWidth >= 320

        if (middleDevice) {
            setCountAddFilms(CARD_COUNT.MIDDLE_DEVICE.ADD)
            isUpdate && setStartCountFilms(CARD_COUNT.MIDDLE_DEVICE.START)
        } else if (smallDevice) {
            setCountAddFilms(CARD_COUNT.SMALL_DEVICE.ADD)
            isUpdate && setStartCountFilms(CARD_COUNT.SMALL_DEVICE.START)
        } else {
            setCountAddFilms(CARD_COUNT.BIG_DEVICE.ADD)
            isUpdate && setStartCountFilms(CARD_COUNT.BIG_DEVICE.START)
        }
    }

    return { countAddFilms, startCountFilms, setParamsCountFilms };
}