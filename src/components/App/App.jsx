import { Route, Switch } from "react-router-dom";

import './App.css';
import Header from '../Header/Header'
import Movies from '../../pages/Movies/Movies'
import Profile from '../../pages/Profile/Profile'
import Register from '../../pages/Register/Register'
import Login from '../../pages/Login/Login'
import SavedMovies from '../../pages/SavedMovies/SavedMovies'
import Main from '../../pages/Main/Main'
import NotFound from '../../pages/404/NotFound'

function App() {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route path='/movies' exact>
          <Movies />
        </Route>

        <Route path='/saved-movies' exact>
          <SavedMovies />
        </Route>

        <Route path='/profile' exact>
          <Profile />
        </Route>

        <Route path='/signin' exact>
          <Login />
        </Route>

        <Route path='/signup' exact>
          <Register />
        </Route>

        <Route path='/' exact>
          <Main />
        </Route>

        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
