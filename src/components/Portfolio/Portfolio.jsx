import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__list">
        <li className="portfolio__item"><a className="portfolio__link" href="https://stmelik.github.io/how-to-learn/" target="_blank">Статичный сайт</a></li>
        <li className="portfolio__item"><a className="portfolio__link" href="https://stmelik.github.io/russian-travel/" target="_blank">Адаптивный сайт</a></li>
        <li className="portfolio__item"><a className="portfolio__link" href="https://stmelik.store/" target="_blank">Одностраничное приложение</a></li>
      </ul>
    </section>
  );
}

export default Portfolio;
