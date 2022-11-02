import { NavLink } from 'react-router-dom';
import Navigation from '../Navigation';
import './splashPage.css'

export default function SplashPage() {
	return (
		<div className='splash-page'>

			<div className='background-top'>
				<div className='background-top-left'></div>
				<div className='background-top-right'></div>
				<header className='splash-header'>
					<Navigation />
				</header>
				<div className='splash-introduction-container'>
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
			</div>

			<main>
				<div>
					<h2>Create an invite-only place where you belong</h2>
					<p>Discord servers are organized into topic-based channels where you can collaborate, share, and just talk about your day without clogging up a group chat.</p>
				</div>
				<div>
					<h2>Where hanging out is easy</h2>
					<p>Grab a seat in a voice channel when you're free. Friends in your server can see you're around and instantly pop in to talk without having to call.</p>
				</div>
				<div>
					<h2>From few to a fandom</h2>
					<p>Get any community running with moderation tools and custom member access. Give members special powers, set up private channels, and more.</p>
				</div>
				<div>
					<h1>RELIABLE TECH FOR STAYING CLOSE</h1>
					<p>Low-latency voice and video feels like you’re in the same room. Wave hello over video, watch friends stream their games, or gather up and have a drawing session with screen share.</p>
				</div>
				<div>
					<h4>Ready to start your journey?</h4>
					<button></button>
				</div>
			</main>
	
			<footer></footer>
		</div>
	);
}
