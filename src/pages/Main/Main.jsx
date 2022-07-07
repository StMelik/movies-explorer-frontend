import './Main.css';

import Promo from '../../components/Promo/Promo'
import NavTab from '../../components/NavTab/NavTab'
import AboutProject from '../../components/AboutProject/AboutProject'
import Techs from '../../components/Techs/Techs'
import AboutMe from '../../components/AboutMe/AboutMe'

function Main() {
  return (
    <>
      <Promo />
      <NavTab />
      <AboutProject />
      <Techs />
      <AboutMe />
    </>
  );
}

export default Main;
