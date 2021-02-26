import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import formSchema from '../../validation/formSchema';
import FromHeader from '../static-components/FormHeader';
import './Form.css';

let toppingsInitArray = new Array(14);
toppingsInitArray.fill(false);

const initialFormState = {
	username: '',
	size: '',
	sauce: '',
	specialIns: '',
	toppings: toppingsInitArray,
	toppingsSelected: 0,
};

const checkboxOptions = [
	{
		id: 0,
		name: 'Pepperoni',
		checkedStr: 'pepperoni',
	},
	{ id: 1, name: 'Sausage', checkedStr: 'sausage' },
	{ id: 2, name: 'Canadian Bacon', checkedStr: 'canadianBacon' },
	{ id: 3, name: 'Spice Italian Sausage', checkedStr: 'spiceItalianSausage' },
	{ id: 4, name: 'Grilled Chicken', checkedStr: 'grilledChicken' },
	{ id: 5, name: 'Onions', checkedStr: 'onions' },
	{ id: 6, name: 'Green Peppers', checkedStr: 'greenPeppers' },
	{ id: 7, name: 'Diced Tomatoes', checkedStr: 'dicedTomatoes' },
	{ id: 8, name: 'Black Olives', checkedStr: 'blackOlives' },
	{ id: 9, name: 'Roasted Garlic', checkedStr: 'roastedGarlic' },
	{ id: 10, name: 'Artichoke Hearts', checkedStr: 'artichokeHearts' },
	{ id: 11, name: 'Three Cheese', checkedStr: 'threeCheese' },
	{ id: 12, name: 'Pineapple', checkedStr: 'pineapple' },
	{ id: 13, name: 'Extra Cheese', checkedStr: 'extraCheese' },
];

const initialFormErrors = {
	username: '',
	size: '',
	sauce: '',
	toppingsSelected: '',
};

const Form = ({ history, setOrder, order }) => {
	const [formState, setFormState] = useState(initialFormState);
	const [formErrors, setFormErrors] = useState(initialFormErrors);
	const [disabled, setDisabled] = useState(true);

	const toppingsArrayContents = () => {
		const topsArr = [...formState.toppings];
		const topsObjArr = [...checkboxOptions];
		const topsIndArr = topsObjArr.filter((topObj) => topsArr[topObj.id]);
		return topsIndArr.map((top) => top.name);
	};

	const routeToSuccess = () => {
		history.push('/success');
	};

	const onChangeHelper = (name, value) => {
		yup
			.reach(formSchema, name)
			.validate(value)
			.then(() => {
				setFormErrors({ ...formErrors, [name]: '' });
			})
			.catch((err) => {
				console.log('errors: ', err);
				setFormErrors({ ...formErrors, [name]: err.errors });
			});
	};
	const onSubmitHelper = (newOrder) => {
		axios
			.post('https://reqres.in/api/users', newOrder)
			.then((res) => {
				setOrder(res.data);
				console.log('order', order);
				setFormState(initialFormState);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const onChange = (e) => {
		const { name, type, checked, value } = e.target;
		const valToPass = type === 'checkbox' ? checked : value;
		if (type === 'checkbox') {
			const targetOption = checkboxOptions.find(
				(option) => option.checkedStr === name
			);

			let updatedArray = [...formState.toppings];
			updatedArray.splice(targetOption.id, 1, checked);

			setFormState({
				...formState,
				toppings: updatedArray,
				toppingsSelected: checked
					? formState.toppingsSelected + 1
					: formState.toppingsSelected - 1,
			});
			onChangeHelper('toppings', updatedArray);
		} else {
			setFormState({ ...formState, [name]: value });
			onChangeHelper(name, valToPass);
		}
	};
	const onSubmit = (e) => {
		e.preventDefault();
		const toppingsArray = toppingsArrayContents();
		const newOrder = {
			username: formState.username.trim(),
			size: formState.size.trim(),
			sauce: formState.sauce.trim(),
			toppings: toppingsArray,
			specialIns: formState.specialIns,
		};
		onSubmitHelper(newOrder);
		routeToSuccess();
	};

	useEffect(() => {
		formSchema.isValid(formState).then((valid) => setDisabled(!valid));
	}, [formState]);

	return (
		<div className='form-container-wrapper flex center-content'>
			<h1>Build your own pizza</h1>
			<form className='form-container flex' onSubmit={onSubmit}>
				<FromHeader
					header={'Name for the order'}
					subHeader={'Required'}
					error={formErrors.username}
				/>
				<input
					type='text'
					name='username'
					className='text-input name'
					placeholder='Name'
					onChange={onChange}
					value={formState.username}
				/>
				<FromHeader
					header={'Choice of size'}
					subHeader={'Required'}
					error={formErrors.size}
				/>
				<select
					name='size'
					className='select-input'
					onChange={onChange}
					value={formState.size}
				>
					<option value=''>---Select---</option>
					<option value='small'> Small</option>
					<option value='large'> Large</option>
					<option value='extra-large'> Extra-Large</option>
				</select>
				<FromHeader
					header={'Choice of sauce'}
					subHeader={'Required'}
					error={formErrors.sauce}
				/>
				<div className='radio-input flex'>
					<label>
						<input
							type='radio'
							name='sauce'
							value='original red'
							checked={formState.sauce === 'original red'}
							onChange={onChange}
						/>
						Original Red
					</label>
					<label>
						<input
							type='radio'
							name='sauce'
							value='garlic ranch'
							checked={formState.sauce === 'garlic ranch'}
							onChange={onChange}
						/>
						Garlic Ranch
					</label>
					<label>
						<input
							type='radio'
							name='sauce'
							value='bbq sauce'
							checked={formState.sauce === 'bbq sauce'}
							onChange={onChange}
						/>
						BBQ Sauce
					</label>
					<label>
						<input
							type='radio'
							name='sauce'
							value='spinach alfredo'
							checked={formState.sauce === 'spinach alfredo'}
							onChange={onChange}
						/>
						Spinach Alfredo
					</label>
				</div>

				<FromHeader
					header={'Add Toppings'}
					subHeader={'Choose 4 or more'}
					error={formErrors.toppingsSelected}
				/>
				<div className='toppings-container-wrapper flex'>
					<div className='toppings-container flex'>
						{checkboxOptions.map((toppingOption) => {
							return (
								<React.Fragment key={toppingOption.id}>
									<label key={toppingOption.id}>
										<input
											key={toppingOption.id}
											type='checkbox'
											onChange={onChange}
											name={toppingOption.checkedStr}
											checked={formState.toppings[toppingOption.id]}
										/>
										{toppingOption.name}
									</label>
								</React.Fragment>
							);
						})}
					</div>
				</div>
				<FromHeader header={'Special Instructions'} subHeader={''} />
				<input
					type='text'
					name='specialIns'
					className='text-input'
					placeholder='Anything else you would like to add?'
					onChange={onChange}
					value={formState.specialIns}
				/>

				<button className='form-submit-button flex ' disabled={disabled}>
					Add to Order<span className='span-price'>$17.99</span>
				</button>
			</form>
		</div>
	);
};

export default Form;
