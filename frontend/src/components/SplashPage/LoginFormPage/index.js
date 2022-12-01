import React, { useState } from 'react';
import * as sessionActions from '../../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import './LoginForm.css';
import { NavLink, Redirect } from 'react-router-dom';

function LoginForm() {
	const dispatch = useDispatch();
	const [credential, setCredential] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState([]);
	const sessionUser = useSelector((state) => state.session.currentUser);

	if (sessionUser) return <Redirect to={`/users/${sessionUser.id}`} />;

	const demoUser = () => {
		setCredential('Demo-lition')
		setPassword('password')
	} 

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);
		return dispatch(sessionActions.loginUser({ credential, password })).catch(
			async (res) => {
				let data;
				try {
					data = await res.clone().json();
				} catch {
					data = await res.text();
				}
				if (data?.errors) setErrors(data.errors);
				else if (data) setErrors([data]);
				else setErrors([res.statusText]);
			}
		);
	};

	return (
		<div className='login-form-page'>
			<div className='login-form-container'>
				<h1>Welcome back!</h1>
				<h6>We're so excited to see you again!</h6>
				<form onSubmit={handleSubmit} className='login-form'>
					<ul>
						{errors.map((error) => (
							<li key={error}>{error}</li>
						))}
					</ul>
					<label>Username or Email</label>
					<input
						type='text'
						value={credential}
						onChange={(e) => setCredential(e.target.value)}
						required
					/>
					<label>Password</label>
					<input
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<button type='submit'>Log In</button>
					<button type='submit' onClick={demoUser}>Demo User</button>
				</form>
				<p>
					Need an account?{' '}
					<NavLink to={'/signup'} className='to-signup-from-login'>
						Register
					</NavLink>
				</p>
			</div>
		</div>
	);
}

export default LoginForm;
