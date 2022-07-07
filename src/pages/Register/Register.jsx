import { useFormWithValidation } from '../../hooks/useFormWithValidation'

import './Register.css';

import Label from "../../components/Label/Label";
import AuthButton from "../../components/AuthButton/AuthButton";
import ErrorText from "../../components/ErrorText/ErrorText";

function Register({ handleRegister }) {
  const { values, errors, isValid, handleChange } = useFormWithValidation()

  const patternName = '([A-Za-zа-яёА-ЯЁ]| |-)*'

  function handleSubmitForm(evt) {
    evt.preventDefault()
    handleRegister(values)
  }

  return (
    <form className="form form-register" onSubmit={handleSubmitForm} name='register' noValidate>
      <Label
        text='Имя'
        name="name"
        onInput={handleChange}
        isValid={!errors.name}
        value={values.name}
        pattern={patternName}
        title='Имя может состоять из букв, пробелов и -'
      />
      {errors.name && <ErrorText type='auth'>{errors.name}</ErrorText>}
      <Label
        text='E-mail'
        name="email"
        type='email'
        onInput={handleChange}
        isValid={!errors.email}
        value={values.email}
      />
      {errors.email && <ErrorText type='auth'>{errors.email}</ErrorText>}
      <Label
        text='Пароль'
        name="password"
        type='password'
        onInput={handleChange}
        isValid={!errors.password}
        value={values.password}
      />
      {errors.password && <ErrorText type='auth'>{errors.password}</ErrorText>}
      <AuthButton
        isDisabled={!isValid}
      />
    </form>
  );
}

export default Register;
