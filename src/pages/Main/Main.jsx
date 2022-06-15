import './Main.css';
import Promo from '../../components/Promo/Promo'
import NavTab from '../../components/NavTab/NavTab'
import AboutProject from '../../components/AboutProject/AboutProject'
import Techs from '../../components/Techs/Techs'
import AboutMe from '../../components/AboutMe/AboutMe'
import Footer from '../../components/Footer/Footer'

function Main() {
  return (
    <div className="main-page">
      <Promo />
      <NavTab />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Footer />
    </div>
  );
}

export default Main;
