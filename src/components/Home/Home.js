import React from 'react';
// import { useHistory } from 'react-router-dom';
import './Home.css';

const Home = ({ history }) => {
	// const history = useHistory();
	const routeToPizza = () => {
		history.push('/pizza');
	};

	return (
		<>
			<section className='hero-section flex center-content'>
				<h1>Your favorite food, delivered while coding</h1>
				<button className='hero-button' onClick={routeToPizza}>
					Pizza?
				</button>
			</section>
		</>
	);
};

export default Home;
