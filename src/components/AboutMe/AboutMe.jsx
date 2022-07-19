import './AboutMe.css';
import Portfolio from '../Portfolio/Portfolio'
import photo from '../../images/photo.jpg'

function AboutMe() {
  return (
    <section className="about-me" id='about-me'>
      <div className="container about-me__container">
        <h3 className="title about-me__title">Студент</h3>
        <div className="about-me__wrapper">
          <div className="about-me__description">
            <p className="about-me__name">Станислав</p>
            <p className="about-me__specialization">Фронтенд-разработчик, 24 года</p>
            <p className="about-me__text">Почти как год я занимаюсь веб-разработкой. Закончил курс "Веб-разработчик" от Яндекс.Практикум. Сейчас дополнительно изучаю Vue и пишу небольшие пет-проекты. Планирую развиваться как Frontend разработчик.
            </p>
            <ul className="about-me__links">
              <li><a className="about-me__link" href="https://stmelik.ru" target="_blank">Мой сайт</a></li>
              <li><a className="about-me__link" href="https://github.com/StMelik" target="_blank">Github</a></li>
            </ul>
          </div>
          <img className="about-me__photo" src={photo} alt="Моё фото" />
        </div>
        <Portfolio />
      </div>
    </section>
  );
}

export default AboutMe;
