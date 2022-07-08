import './Main.css';

import Promo from '../../components/Promo/Promo'
import NavTab from '../../components/NavTab/NavTab'
import AboutProject from '../../components/AboutProject/AboutProject'
import Techs from '../../components/Techs/Techs'
import AboutMe from '../../components/AboutMe/AboutMe'
import HeaderAndFooterLayout from '../../layouts/HeaderAndFooterLayout/HeaderAndFooterLayout';

function Main({ setIsShowMenu }) {
  return (
    <HeaderAndFooterLayout
      setIsShowMenu={setIsShowMenu}
    >
      <Promo />
      <NavTab />
      <AboutProject />
      <Techs />
      <AboutMe />
    </HeaderAndFooterLayout>
  );
}

export default Main;
