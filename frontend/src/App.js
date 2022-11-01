import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignupFormPage from './components/SignUpFormPage';
import ServerIndexPage from './components/ServerIndexPage';
import SplashPage from './components/SplashPage';
import LoginForm from './components/LoginFormPage';
import consumer from './consumer';
import ServerShowPage from './components/ServerShowPage';
import { useSelector } from 'react-redux';

function App() {
	const sessionUser = useSelector((state) => state.session.currentUser);
	console.log(consumer);

	return (
		<div>
			<Switch>
				<Route path='/' exact>
					<SplashPage />
				</Route>
				<Route path='/login' exact>
					<LoginForm />
				</Route>
				<Route path='/servers' exact>
					<ServerIndexPage />
				</Route>
				<Route path='/servers/:serverId' exact>
					<ServerShowPage />
				</Route>
				<Route path='/signup' exact>
					<SignupFormPage />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
