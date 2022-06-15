import './Main.css';
import AboutProject from '../../components/AboutProject/AboutProject'
import Techs from '../../components/Techs/Techs'
import AboutMe from '../../components/AboutMe/AboutMe'

function Main() {
  return (
    <div className="main-page">
      Main
      <AboutProject />
      <Techs />
      <AboutMe />
    </div>
  );
}

export default Main;
