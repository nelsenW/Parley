import { useSelector } from 'react-redux';
import './userForm.css';

function EditUserForm({setUserModal}) {
	const sessionUser = useSelector((state) => state.session.currentUser);
	const color = sessionUser.color;
	const photo = sessionUser.photo ? (
		<img src={sessionUser.photo} />
	) : (
		<i
			className='fa-solid fa-skull-crossbones'
			style={{ backgroundColor: `#${color}` }}></i>
	);

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
						<div className='my-account-info'>
							<div className='my-account-photo'>{photo}</div>
							<h2>{sessionUser.username}</h2>
							<button className='edit-user-profile'>Edit User Profile</button>
						</div>
						<div className='my-account-edits'>
							<h4>USERNAME</h4>
							<h3>{sessionUser.username}</h3>
							<h4 className='spacer'>EMAIL</h4>
							<h3>{sessionUser.email}</h3>
						</div>
					</div>
				</div>
        <div id='esc-toolbar' onClick={() => setUserModal(false)}>
           <div id='esc-button'>
          <svg role='img' width='18' height='18' viewBox='0 0 24 24' >
            <path
              fill='currentColor'
              d='M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z'></path>
				  </svg>
          </div>
				<h2>ESC</h2>
        </div>
			</main>
		</div>
	);
}

export default EditUserForm;
