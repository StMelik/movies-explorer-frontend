import { useState } from "react";

export function useCardCount(countFilm, startCountFilm) {
    // Кол-во загружаемых фильмов
    const [countFilms, setCountFilms] = useState(countFilm)
    // Кол-во первоночально отоброжаемых фильмов
    const [startCountFilms, setStartCountFilms] = useState(startCountFilm)

    function setParamsCountFilms(mode) {
        const deviceWidth = document.documentElement.clientWidth
        const threeCardWidth = 1007
        const twoCardWidth = 677
        const isUpdate = mode === 'all'

        const middleDevice = deviceWidth <= threeCardWidth && deviceWidth > twoCardWidth
        const smallDevice = deviceWidth <= twoCardWidth && deviceWidth >= 320

        if (middleDevice) {
            setCountFilms(2)
            isUpdate && setStartCountFilms(8)
        } else if (smallDevice) {
            setCountFilms(2)
            isUpdate && setStartCountFilms(5)
        } else {
            setCountFilms(3)
            isUpdate && setStartCountFilms(12)
        }
    }

    return { countFilms, startCountFilms, setParamsCountFilms };
}