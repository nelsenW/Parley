import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import csrfFetch from '../../store/csrf';
import './userForm.css';

function EditUserForm() {
	const sessionUser = useSelector((state) => state.session.currentUser);
	const color = sessionUser.color;
	const photo = sessionUser.photo ? (
		<img src={state?.session[userId]?.photo} />
	) : (
		<i
			className='fa-solid fa-skull-crossbones'
			style={{ backgroundColor: 'transparent' }}></i>
	);

	debugger;

	return (
		<div className='user-form-modal'>
			<aside className='user-form-modal-nav'>
				<ul className='modal-nav-tabs'></ul>
			</aside>
			<main className='user-form-modal-main'>
				<div className='modal-main-column'>
					<h1>My Account</h1>
					<div className='my-account-card'>
						<div
							className='my-account-color'
							style={{ backgroundColor: `#${color}` }}></div>
						{photo}
						<div className='my-account-info'></div>
					</div>
				</div>
			</main>
		</div>
	);
}

export default EditUserForm;
