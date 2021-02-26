import React from 'react';
import './Home.css';

const Home = ({ history }) => {
	const routeToPizza = () => {
		history.push('/pizza');
	};

	return (
		<>
			<section className='hero-section flex center-content'>
				<h1 className='hero-cta'>Your favorite food, delivered while coding</h1>
				<button className='hero-button' onClick={routeToPizza}>
					Pizza?
				</button>
			</section>
		</>
	);
};

export default Home;
