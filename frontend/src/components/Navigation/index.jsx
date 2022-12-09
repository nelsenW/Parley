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
				<li><a href='https://github.com/nelsenW/Parley' target={"_blank"}>Github!</a></li>
				<li><a href='https://www.linkedin.com/in/william-nelsen-571157244/' target={"_blank"}>LinkedIn</a></li>
				<li><a href='https://nelsenw.github.io/William_Nelsen/' target={"_blank"}>Portfolio</a></li>
				<li><a href='https://angel.co/u/william-nelsen' target={"_blank"}>AngelList</a></li>
			</ul>
			<NavLink to='/login' className='splash-nav-bar-login'>
				Login
			</NavLink>
		</nav>
	);
}

export default Navigation;
