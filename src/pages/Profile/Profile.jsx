import { useState } from "react";
import './Profile.css';

function Profile() {
  const [name, setName] = useState('Виталий')
  const [email, setEmail] = useState('pochta@yandex.ru')

  return (
    <div className="profile">
      <div className="container profile__container">
        <div className="profile__wrapper">
          <h1 className="profile__title">Привет, Виталий!</h1>
          <form className="profile__form">
            <label className='profile__label'>
              <p className="profile__text">Имя</p>
              <input
                className="profile__input"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </label>
            <label className='profile__label'>
              <p className="profile__text">E-mail</p>
              <input
                className="profile__input"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </label>
          </form>
          <div className="profile__buttons">
            <button className='profile__button'>Редактировать</button>
            <button className='profile__button profile__button_color_pink'>Выйти из аккаунта</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
