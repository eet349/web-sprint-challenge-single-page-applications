import React from 'react';
import './OrderSuccess.css';

const OrderSuccess = ({ order }) => {
	return (
		<div className='order-success-container flex'>
			<h1 className='order-success-h1'>Order successful!</h1>
			<h2>Fresh pizza coming your way</h2>
			<h3>Order details:</h3>
			<p>Name: {order.username}</p>
			<p>Size: {order.size}</p>
			<p>Sauce: {order.sauce}</p>
			<ul>
				{order?.toppings?.map((topping) => {
					return <li key={topping}>{topping}</li>;
				})}
			</ul>
			<p>Special instructions: {order.specialIns}</p>
		</div>
	);
};

export default OrderSuccess;
