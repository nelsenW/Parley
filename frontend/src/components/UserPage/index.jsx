import { useState } from 'react';
import './userpage.css';

export default function UserPage() {
    const [wumpusClass, setWumpusClass] = useState('');

	return (
		<div className='user-page'>
			<nav className='user-page-sidenav'> 
				<a className='sidenav-a' id="DM's">
                    <i className="fa-solid fa-skull-crossbones"></i>
                </a>
				<a className='sidenav-a' id='add'>
					<svg
						className='plus-button'
						aria-hidden='true'
						role='img'
						width='24'
						height='24'
						viewBox='0 0 24 24'>
						<path
							fill='currentColor'
							d='M20 11.1111H12.8889V4H11.1111V11.1111H4V12.8889H11.1111V20H12.8889V12.8889H20V11.1111Z'></path>
					</svg>
				</a>
				<a className='sidenav-a' id='explore'>
					<svg
						aria-hidden='true'
						role='img'
						className='exploratories'
						width='24'
						height='24'
						viewBox='0 0 24 24'>
						<path
							fill='currentColor'
							d='M12 10.9C11.39 10.9 10.9 11.39 10.9 12C10.9 12.61 11.39 13.1 12 13.1C12.61 13.1 13.1 12.61 13.1 12C13.1 11.39 12.61 10.9 12 10.9ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM14.19 14.19L6 18L9.81 9.81L18 6L14.19 14.19Z'></path>
					</svg>
				</a>
			</nav>
			<div className='user-sidebar'></div>
			<main className='user-page-main'>
				<nav className='user-page-topnav'>
					<section className='user-page-topnav-children'>
						<svg
							x='0'
							y='0'
							className='iconic'
							aria-hidden='true'
							role='img'
							width='24'
							height='24'
							viewBox='0 0 24 24'>
							<g fill='none' fillRule='evenodd'>
								<path
									fill='currentColor'
									fillRule='nonzero'
									d='M0.5,0 L0.5,1.5 C0.5,5.65 2.71,9.28 6,11.3 L6,16 L21,16 L21,14 C21,11.34 15.67,10 13,10 C13,10 12.83,10 12.75,10 C8,10 4,6 4,1.5 L4,0 L0.5,0 Z M13,0 C10.790861,0 9,1.790861 9,4 C9,6.209139 10.790861,8 13,8 C15.209139,8 17,6.209139 17,4 C17,1.790861 15.209139,0 13,0 Z'
									transform='translate(2 4)'></path>
								<path d='M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z'></path>
							</g>
						</svg>
						<h1>Friends</h1>
						<div className='divider'></div>
						<button onClick={() => setWumpusClass('online')}>Online</button>
						<button onClick={() => setWumpusClass('all')}>All</button>
						<button onClick={() => setWumpusClass('pending')}>Pending</button>
						<button onClick={() => setWumpusClass('blocked')}>Blocked</button>
						<button>Add Friend</button>
					</section>
					<div className='toolbar'></div>
				</nav>
				<div className='user-page-main-content'>
					<div className='center-column'>
						<div className='center-column-search'>
							<input
								type='text'
								placeholder='Search'
								id='center-column-search-input'
							/>
							<div className='mag-glass-container'>
								<i className='fa-solid fa-magnifying-glass'></i>
							</div>
						</div>
						<div className='center-column-people-list'>
							<h2 id='online'>Online --</h2>
							<div id='list'>
                                <div className={wumpusClass}></div>
                            </div>
						</div>
						<div></div>
					</div>
					<aside className='active-people'></aside>
				</div>
			</main>
		</div>
	);
}
