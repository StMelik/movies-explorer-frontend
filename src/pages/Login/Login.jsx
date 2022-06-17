import { useState } from "react";
import './Login.css';
import Label from "../../components/Label/Label";
import AuthButton from "../../components/AuthButton/AuthButton";

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmitForm(evt) {
    evt.preventDefault()
    console.log(email, password);
  }

  return (
    <form className="form form-login" onSubmit={handleSubmitForm} name='login'>
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
      <AuthButton />
    </form>
  );
}

export default Login;
