import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignupFormPage from './components/SignUpFormPage';
import SplashPage from './components/SplashPage';
import LoginForm from './components/LoginFormPage';
import ServerShowPage from './components/ServerShowPage';
import UserPage from './components/UserPage';
import ServerIndexPage from './components/ServerIndexPage';

function App() {
	
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
				<Route path='/users/:id' exact>
					<UserPage />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
