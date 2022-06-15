import { useState } from "react";
import './Login.css';
import Label from "../../components/Label/Label";

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmitForm(evt) {
    evt.preventDefault()
    console.log(email, password);
  }

  return (
    <form className="form" onSubmit={handleSubmitForm} name='login'>
      <Label
        text='E-mail'
        type='email'
        value={email}
        setValue={setEmail}
      />
      <Label
        text='Пароль'
        type='password'
        value={password}
        setValue={setPassword}
      />
      <button className='form__submit-button'>Войти</button>
    </form>
  );
}

export default Login;
