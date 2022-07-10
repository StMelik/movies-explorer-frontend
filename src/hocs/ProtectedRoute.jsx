import { Redirect, Route } from "react-router-dom";

import Preloader from "../components/Preloader/Preloader";

import { PAGES } from '../utils/constants'

function ProtectedRoute({ isLoggedIn, isPreloader, component: Component, ...props }) {
    return (
        <Route>
            {isPreloader
                ? <Preloader />
                : isLoggedIn
                    ? <Component {...props} />
                    : <Redirect to={PAGES.MAIN} />}
        </Route>
    )
}

export default ProtectedRoute;