import { useFormWithValidation } from '../../hooks/useFormWithValidation'

import './Register.css';

import Label from "../../components/Label/Label";
import AuthButton from "../../components/AuthButton/AuthButton";
import ErrorText from "../../components/ErrorText/ErrorText";
import AuthLayout from '../../layouts/AuthLayout/AuthLayout';

import { VALIDATION_CONFIGS } from '../../utils/constants'

function Register({ handleRegister }) {
  const { values, errors, isValid, handleChange } = useFormWithValidation({ name: '', email: '', password: '' }, VALIDATION_CONFIGS.USER_DATA)

  function handleSubmitForm(evt) {
    evt.preventDefault()
    handleRegister(values)
  }

  return (
    <AuthLayout>
      <form className="form form-register" onSubmit={handleSubmitForm} name='register' noValidate>
        <Label
          text='Имя'
          name='name'
          onInput={handleChange}
          isValid={!errors.name}
          value={values.name}
        />
        {errors.name && <ErrorText type='auth'>{errors.name}</ErrorText>}
        <Label
          text='E-mail'
          name='email'
          type='email'
          onInput={handleChange}
          isValid={!errors.email}
          value={values.email}
        />
        {errors.email && <ErrorText type='auth'>{errors.email}</ErrorText>}
        <Label
          text='Пароль'
          name='password'
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
    </AuthLayout>
  );
}

export default Register;
