import { Link, NavLink } from 'react-router-dom';
import Navigation from '../Navigation';
import './splashPage.css'

export default function SplashPage() {
	return (
		<div className='splash-page'>
			<div className='background-1'>
				<header className='splash-header'>
					<Navigation />
				</header>
				<div className='splash-introduction'>
					<h1>Imagine a place...</h1>
					<p>
						...where you can belong to a school club, a gaming group, or a
						worldwide art community. Where just you and a handful of friends can
						spend time together. A place that makes it easy to talk every day
						and hang out more often.
					</p>
                    <NavLink to={'/signup'} className='splash-introduction-register'>Join the crew...</NavLink>
				</div>
			</div>

			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<footer></footer>
		</div>
	);
}
