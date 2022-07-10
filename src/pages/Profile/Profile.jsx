import { useEffect, useState } from "react";

import './Profile.css';

import Alert from "../../components/Alert/Alert";
import HeaderLayout from "../../layouts/HeaderLayout/HeaderLayout";

import { useFormWithValidation } from '../../hooks/useFormWithValidation'

function Profile({ handleUpdateUser, currentUser, handleSignOut, setIsShowMenu }) {
  const [showAlert, setShowAlert] = useState(false)
  const [messageAlert, setMessageAlert] = useState('')

  const startValues = {
    name: currentUser.name,
    email: currentUser.email
  }

  const { values, isValid, handleChange, setIsValid } = useFormWithValidation(startValues)

  // Проверить что данные изменились от первоначальных
  useEffect(() => {
    const isChangeName = values.name !== currentUser.name
    const isChangeEmail = values.email !== currentUser.email

    isChangeName || isChangeEmail
      ? setIsValid(true)
      : setIsValid(false)
  }, [values])

  function clickUpdateButton() {
    handleUpdateUser(values)
      .then(() => {
        setMessageAlert('Данные профиля успешно обновлены!')
        setIsValid(false)
      })
      .catch(() => {
        setMessageAlert('Не удалось обновить данные профиля!')
      })
      .finally(() => {
        setShowAlert(true)
        setTimeout(() => {
          setShowAlert(false)
        }, 3000)
      })
  }

  function clickSignOutButton() {
    handleSignOut()
  }

  return (
    <HeaderLayout
      setIsShowMenu={setIsShowMenu}
    >
      <div className="profile">
        <div className="container profile__container">
          <div className="profile__wrapper">
            <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
            <form className="profile__form">
              <label className='profile__label'>
                <p className="profile__text">Имя</p>
                <input
                  className="profile__input"
                  type="text"
                  value={values.name}
                  name="name"
                  onInput={handleChange}
                  required
                  placeholder="Ваше имя"
                />
              </label>
              <label className='profile__label'>
                <p className="profile__text">E-mail</p>
                <input
                  className="profile__input"
                  type="email"
                  value={values.email}
                  name="email"
                  onInput={handleChange}
                  required
                  placeholder="Ваш E-mail"
                />
              </label>
            </form>
            <div className="profile__buttons">
              <button
                className={
                  isValid
                    ? 'profile__button'
                    : 'profile__button profile__button_disabled'
                }
                type="button"
                onClick={clickUpdateButton}
                disabled={!isValid}
              >Редактировать</button>
              <button
                className='profile__button profile__button_color_pink'
                type="button"
                onClick={clickSignOutButton}
              >Выйти из аккаунта</button>
            </div>
          </div>
        </div>
        <Alert
          showAlert={showAlert}
          messageAlert={messageAlert}
        />
      </div>
    </HeaderLayout>
  );
}

export default Profile;
