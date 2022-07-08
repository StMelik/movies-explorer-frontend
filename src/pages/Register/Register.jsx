import { useFormWithValidation } from '../../hooks/useFormWithValidation'

import './Register.css';

import Label from "../../components/Label/Label";
import AuthButton from "../../components/AuthButton/AuthButton";
import ErrorText from "../../components/ErrorText/ErrorText";
import AuthLayout from '../../layouts/AuthLayout/AuthLayout';

import { INPUTS, PATTERNS } from '../../utils/constants'

function Register({ handleRegister }) {
  const { values, errors, isValid, handleChange } = useFormWithValidation({ name: '', email: '', password: '' })

  function handleSubmitForm(evt) {
    evt.preventDefault()
    handleRegister(values)
  }

  return (
    <AuthLayout>
      <form className="form form-register" onSubmit={handleSubmitForm} name='register' noValidate>
        <Label
          text='Имя'
          name={INPUTS.NAME}
          onInput={handleChange}
          isValid={!errors[INPUTS.NAME]}
          value={values[INPUTS.NAME]}
          pattern={PATTERNS.NAME}
          title='Имя может состоять из букв, пробелов и -'
        />
        {errors[INPUTS.NAME] && <ErrorText type='auth'>{errors[INPUTS.NAME]}</ErrorText>}
        <Label
          text='E-mail'
          name={INPUTS.EMAIL}
          type={INPUTS.EMAIL}
          onInput={handleChange}
          isValid={!errors[INPUTS.EMAIL]}
          value={values[INPUTS.EMAIL]}
        />
        {errors[INPUTS.EMAIL] && <ErrorText type='auth'>{errors[INPUTS.EMAIL]}</ErrorText>}
        <Label
          text='Пароль'
          name={INPUTS.PASSWORD}
          type={INPUTS.PASSWORD}
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

export default Register;
