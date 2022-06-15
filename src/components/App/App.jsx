import { Route, Switch } from "react-router-dom";

import './App.css';
import Movies from '../../pages/Movies/Movies'
import Profile from '../../pages/Profile/Profile'
import Register from '../../pages/Register/Register'
import Login from '../../pages/Login/Login'
import SavedMovies from '../../pages/SavedMovies/SavedMovies'
import Main from '../../pages/Main/Main'
import NotFound from '../../pages/404/NotFound'
import HeaderLayout from "../../layouts/HeaderLayout/HeaderLayout";
import HeaderAndFooterLayout from "../../layouts/HeaderAndFooterLayout/HeaderAndFooterLayout";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";

function App() {
  return (
    <>
      <Switch>
        <Route path='/movies' exact>
          <HeaderAndFooterLayout>
            <Movies />
          </HeaderAndFooterLayout>
        </Route>

        <Route path='/saved-movies' exact>
          <HeaderAndFooterLayout>
            <SavedMovies />
          </HeaderAndFooterLayout>
        </Route>

        <Route path='/profile' exact>
          <HeaderLayout>
            <Profile />
          </HeaderLayout>
        </Route>

        <Route path='/signin' exact>
          <AuthLayout>
            <Login />
          </AuthLayout>
        </Route>

        <Route path='/signup' exact>
          <AuthLayout>
            <Register />
          </AuthLayout>
        </Route>

        <Route path='/' exact>
          <HeaderAndFooterLayout>
            <Main />
          </HeaderAndFooterLayout>
        </Route>

        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}

export default App;
