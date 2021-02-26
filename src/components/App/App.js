import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import Home from '../Home/Home';
import Form from '../Form/Form';
import './App.css';
import OrderSuccess from '../OrderSuccess/OrderSuccess';

const App = () => {
	const history = useHistory();

	return (
		<div className='App'>
			<header className='header flex'>
				<h2 className='header-logo'>Lambda Eats</h2>
				<nav className='header-nav flex'>
					<Link className='header-nav-link flex center-content' to='/'>
						Home
					</Link>
					<Link className='header-nav-link flex center-content' to='/help'>
						Help
					</Link>
				</nav>
			</header>
			<Switch>
				<Route exact path='/'>
					<Home history={history} />
				</Route>
				<Route path='/pizza'>
					<Form history={history} />
				</Route>
				<Route path='/success'>
					<OrderSuccess />
				</Route>
			</Switch>
		</div>
	);
};
export default App;
