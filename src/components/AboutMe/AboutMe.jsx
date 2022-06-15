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
            <p className="about-me__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
              и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
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
