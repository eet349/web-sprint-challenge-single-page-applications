import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import FromHeader from '../static-components/FormHeader';
import OrderSuccess from '../OrderSuccess/OrderSuccess';
import './Form.css';

const Form = ({ history }) => {
	const { url, path } = useRouteMatch();
	const onSubmit = (e) => {
		e.preventDefault();
		routeToSuccess();
	};
	const routeToSuccess = () => {
		// console.log('history: ', history);
		// console.log('url: ', url);
		// console.log('path: ', path);
		history.push('/success');
	};

	return (
		<div className='form-container-wrapper flex center-content'>
			<h1>Build your own pizza</h1>
			<form className='form-container flex' onSubmit={onSubmit}>
				<FromHeader header={'Choice of size'} subHeader={'Required'} />
				<select className='select-input'>
					<option value={''}>---Select---</option>
					<option> Small</option>
					<option> Large</option>
					<option> Extra-Large</option>
				</select>
				<FromHeader header={'Choice of sauce'} subHeader={'Required'} />
				<div className='radio-input flex'>
					<label>
						<input type='radio' />
						Original Red
					</label>
					<label>
						<input type='radio' />
						Garlic Ranch
					</label>
					<label>
						<input type='radio' />
						BBQ Sauce
					</label>
					<label>
						<input type='radio' />
						Spinach Alfredo
					</label>
				</div>

				<FromHeader header={'Add Toppings'} subHeader={'Choose 4 or more'} />
				<div className='toppings-container-wrapper flex'>
					<div className='toppings-container flex'>
						<label>
							<input type='checkbox' />
							Pepperoni
						</label>
						<label>
							<input type='checkbox' />
							Sausage
						</label>
						<label>
							<input type='checkbox' />
							Canadian Bacon
						</label>
						<label>
							<input type='checkbox' />
							Spicy Italian Sausage
						</label>
						<label>
							<input type='checkbox' />
							Grilled Chicken
						</label>
						<label>
							<input type='checkbox' />
							Onions
						</label>
						<label>
							<input type='checkbox' />
							Green Pepper
						</label>
					</div>
					<div className='toppings-container flex'>
						<label>
							<input type='checkbox' />
							Diced Tomatoes
						</label>
						<label>
							<input type='checkbox' />
							Black Olives
						</label>
						<label>
							<input type='checkbox' />
							Roasted Garlic
						</label>
						<label>
							<input type='checkbox' />
							Artichoke Hearts
						</label>
						<label>
							<input type='checkbox' />
							Three Cheese
						</label>
						<label>
							<input type='checkbox' />
							Pineapple
						</label>
						<label>
							<input type='checkbox' />
							Extra Cheese
						</label>
					</div>
				</div>
				<FromHeader header={'Special Instructions'} subHeader={''} />
				<input
					type='text'
					className='text-input'
					placeholder='Anything else you would like to add?'
				/>

				<button
					className='form-submit-button flex '
					// onClick={routeToSuccess}
				>
					Add to Order<span className='span-price'>$17.99</span>
				</button>
			</form>
			{/* <Route path='/success'>
				<OrderSuccess />
			</Route> */}
		</div>
	);
};

export default Form;
