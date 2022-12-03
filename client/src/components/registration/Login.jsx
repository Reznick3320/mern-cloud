import React, { useState } from 'react';
import './registration.css';
import Input from './../../utils/input/Input';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/user';


const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();


	return (
		<div>
			<div className="registration">
				<div className="registration__header">Авторизация</div>
				<Input value={email} setValue={setEmail} type="text" placeholder="Введите емейл..." />
				<Input value={password} setValue={setPassword} type="password" placeholder="Введите пароль..." />
				<button className='registration__btn' onClick={() => dispatch(login(email, password))}>Войти</button>
			</div>
		</div>
	)
}

export default Login;