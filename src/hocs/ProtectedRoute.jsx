import { Redirect } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, children }) {
    return (
        <>
            {isLoggedIn ? children : <Redirect to='/' />}
        </>
    )
}

export default ProtectedRoute;