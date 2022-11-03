import { useState } from 'react';
import SideBar from '../SideBar';
import SideNavBar from '../SideNavBar';
import './userpage.css';

export default function UserPage() {
    const [wumpusClass, setWumpusClass] = useState('');
    const [wumpusText, setWumpusText] = useState('');

    const wumpusHandler = (arg) => {
        setWumpusClass(arg)
        switch (arg){
            case 'online':
                setWumpusText('No one\'s around to play with Wumpus.')
                break;
            case 'all':
                setWumpusText('Wumpus is waiting on friends. You don\'t have to though')
                break;
            case 'pending':
                setWumpusText('There are no pending friend requests. Here\'s Wumpus for now.')
                break;
            case 'blocked':
                setWumpusText('You can\'t unblock the Wumpus.')
                break;
            default:
                return; 
        }
    }

	return (
		<div className='user-page'>
			<SideNavBar />
			<SideBar />
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
						<button onClick={() => wumpusHandler('online')}>Online</button>
						<button onClick={() => wumpusHandler('all')}>All</button>
						<button onClick={() => wumpusHandler('pending')}>Pending</button>
						<button onClick={() => wumpusHandler('blocked')}>Blocked</button>
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
                                <p>{wumpusText}</p>
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