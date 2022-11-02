import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation() {

	return (
		<nav className='splash-nav-bar'>
			<NavLink exact to='/' className='splash-nav-bar-title'>
				<i className="fa-solid fa-skull-crossbones"></i>
				Parley
			</NavLink>
			<ul className='personal-links'>
				<li><a href='https://github.com/nelsenW/Parley'>Github!</a></li>
				<li><a href='https://www.linkedin.com/in/william-nelsen-571157244/'>LinkedIn</a></li>
				<li><a>Portfolio</a></li>
				<li><a>AngelList</a></li>
			</ul>
			<NavLink to='/login' className='splash-nav-bar-login'>
				Login
			</NavLink>
		</nav>
	);
}

export default Navigation;
