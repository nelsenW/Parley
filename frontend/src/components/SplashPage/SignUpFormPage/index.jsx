import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import * as sessionActions from '../../../store/session';
import './SignUpForm.css';

function SignupFormPage() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.currentUser);

	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [birthday, setBirthDay] = useState('');
	const [errors, setErrors] = useState([]);
	const [monthSize, setMonthSize] = useState(0);
	const [daySize, setDaySize] = useState(0);
	const [yearSize, setYearSize] = useState(0);
	const [year, setYear] = useState('Year');
	const [day, setDay] = useState('Day');
	const [month, setMonth] = useState('Month');

	useEffect(() => {
		setBirthDay(new Date(year, months.indexOf(month), day));
	}, [year, month, day]);

	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
	const days = [];
	const years = [];

	for (let i = 1; i <= 31; i++) {
		days.push(i);
	}

	for (let i = 2019; i >= 1900; i--) {
		years.push(i);
	}

	if (sessionUser) return <Redirect to={`/users/${sessionUser.id}`} />;

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password) {
			setErrors([]);
			return dispatch(
				sessionActions.signup({ email, username, password, birthday })
			).catch(async (res) => {
				let data;
				try {
					data = await res.clone().json();
				} catch {
					data = await res.text();
				}
				if (data?.errors) setErrors(data.errors);
				else if (data) setErrors([data]);
				else setErrors([res.statusText]);
			});
		}
		return setErrors([
			'Confirm Password field must be the same as the Password field'
		]);
	};

	const dropdownChangeHandler = (e, type) => {
		switch (type) {
			case 'day':
				setDaySize(0);
				setDay(e.target.value);
				break;
			case 'month':
				setMonthSize(0);
				setMonth(e.target.value);
				break;
			case 'year':
				setYearSize(0);
				setYear(e.target.value);
				break;
			default:
				return;
		}
	};

	return (
		<div className='sign-up-page'>
			<div className='sign-up-form-container'>
				<h1>Create an account</h1>
				<form onSubmit={handleSubmit} className='sign-up-form'>
					<ul>
						{errors.map((error) => (
							<li key={error}>{error}</li>
						))}
					</ul>
					<label>Email</label>
					<input
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<label>Username</label>
					<input
						type='text'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>

					<label>Password</label>
					<input
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>

					<label>Date of Birth</label>
					<div className='birthday-selector'>
						<div onMouseLeave={() => setMonthSize(0)}>
							<select
								className='month-selector'
								required
								size={monthSize}
								onMouseOut={(e) => e.stopPropagation()}
								onMouseDown={() => setMonthSize(5)}
								onChange={(e) => dropdownChangeHandler(e, 'month')}>
								<option value='default' selected disabled hidden>
									Month
								</option>
								{months.map((month) => (
									<option value={month} key={month}>
										{month}
									</option>
								))}
							</select>
						</div>

						<div onMouseLeave={() => setDaySize(0)}>
							<select
								required
								className='day-selector'
								size={daySize}
								onMouseDown={() => setDaySize(5)}
								onMouseOut={(e) => e.stopPropagation()}
								onChange={(e) => dropdownChangeHandler(e, 'day')}>
								<option value='default' disabled selected hidden>
									Day
								</option>
								{days.map((day) => (
									<option value={day} key={day}>
										{day}
									</option>
								))}
							</select>
						</div>

						<div onMouseLeave={() => setYearSize(0)}>
							<select
								required
								className='year-selector'
								size={yearSize}
								onMouseDown={() => setYearSize(5)}
								onMouseOut={(e) => e.stopPropagation()}
								onChange={(e) => dropdownChangeHandler(e, 'year')}>
								<option value='default' disabled hidden selected>
									Year
								</option>
								{years.map((year) => (
									<option value={year} key={year}>
										{year}
									</option>
								))}
							</select>
						</div>
					</div>

					<button type='submit'>Continue</button>
				</form>
				<NavLink to={'/login'} className='to-login-from-signup'>
					Already have an account?
				</NavLink>
			</div>
		</div>
	);
}

export default SignupFormPage;
