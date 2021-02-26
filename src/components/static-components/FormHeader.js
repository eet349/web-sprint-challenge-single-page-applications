import React from 'react';
import './FormHeader.css';

const FromHeader = ({ header, subHeader, error }) => {
	return (
		<div className='form-header'>
			<h2>{header}</h2>
			<p>{subHeader}</p>
			{/* <h4 className='error'>{error}</h4> */}
		</div>
	);
};

export default FromHeader;
