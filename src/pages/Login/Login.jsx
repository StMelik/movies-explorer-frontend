import './Login.css';

import Label from "../../components/Label/Label";
import AuthButton from "../../components/AuthButton/AuthButton";
import ErrorText from "../../components/ErrorText/ErrorText";
import AuthLayout from '../../layouts/AuthLayout/AuthLayout';

import { useFormWithValidation } from '../../hooks/useFormWithValidation'
import { INPUTS } from '../../utils/constants'

function Login({ handleLogin }) {
  const { values, errors, isValid, handleChange } = useFormWithValidation({ email: '', password: '' })

  function handleSubmitForm(evt) {
    evt.preventDefault()
    handleLogin(values)
  }

  return (
    <AuthLayout>
      <form className="form form-login" onSubmit={handleSubmitForm} name='login'>
        <Label
          text='E-mail'
          type={INPUTS.EMAIL}
          name={INPUTS.EMAIL}
          onInput={handleChange}
          isValid={!errors[INPUTS.EMAIL]}
          value={values[INPUTS.EMAIL]}
        />
        {errors[INPUTS.EMAIL] && <ErrorText type='auth'>{errors[INPUTS.EMAIL]}</ErrorText>}
        <Label
          text='Пароль'
          type={INPUTS.PASSWORD}
          name={INPUTS.PASSWORD}
          onInput={handleChange}
          isValid={!errors[INPUTS.PASSWORD]}
          value={values[INPUTS.PASSWORD]}
        />
        {errors[INPUTS.PASSWORD] && <ErrorText type='auth'>{errors[INPUTS.PASSWORD]}</ErrorText>}
        <AuthButton
          isDisabled={!isValid}
        />
      </form>
    </AuthLayout>
  );
}

export default Login;
