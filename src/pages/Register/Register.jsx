import { useState } from "react";
import './Register.css';
import Label from "../../components/Label/Label";
import AuthButton from "../../components/AuthButton/AuthButton";

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmitForm(evt) {
    evt.preventDefault()
    console.log(name, email, password);
  }


  return (
    <form className="form form-register" onSubmit={handleSubmitForm} name='register'>
      <Label
        text='Имя'
        value={name}
        setValue={setName}
      />
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

export default Register;
