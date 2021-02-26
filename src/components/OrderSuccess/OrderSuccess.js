import React from 'react';
import './OrderSuccess';

const OrderSuccess = ({ order }) => {
	return (
		order && (
			<div>
				<h1>Order successful!</h1>
				<h3>Fresh pizza coming your way</h3>
				<h4>Order:</h4>
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
		)
	);
};

export default OrderSuccess;
