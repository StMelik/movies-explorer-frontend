import './Login.css';

import Label from "../../components/Label/Label";
import AuthButton from "../../components/AuthButton/AuthButton";
import ErrorText from "../../components/ErrorText/ErrorText";
import AuthLayout from '../../layouts/AuthLayout/AuthLayout';

import { useFormWithValidation } from '../../hooks/useFormWithValidation'

function Login({ handleLogin }) {
  const { values, errors, isValid, handleChange, resetForm } = useFormWithValidation()

  function handleSubmitForm(evt) {
    evt.preventDefault()
    handleLogin(values)
  }

  return (
    <AuthLayout>
      <form className="form form-login" onSubmit={handleSubmitForm} name='login'>
        <Label
          text='E-mail'
          type='email'
          name='email'
          onInput={handleChange}
          isValid={!errors.email}
          value={values.email}
        />
        {errors.email && <ErrorText type='auth'>{errors.email}</ErrorText>}
        <Label
          text='Пароль'
          type='password'
          name="password"
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

export default Login;
