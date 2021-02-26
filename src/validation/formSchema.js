import * as yup from 'yup';

const formSchema = yup.object().shape({
	username: yup
		.string()
		.required('We need a name for the order.')
		.min(2, 'Name must be at least 2 characters.'),
	size: yup
		.string()
		.oneOf(['small', 'large', 'extra-large'], 'Please select a size.'),
	sauce: yup
		.string()
		.oneOf(
			['original red', 'garlic ranch', 'bbq sauce', 'spinach alfredo'],
			'Please select a sauce.'
		),
	toppings: yup.array(),
	toppingsSelected: yup.number().min(4, 'Please select at least 4 toppings.'),
	specialIns: yup.string(),
});

export default formSchema;

// const initialFormErrors = {
// 	username: '',
// 	size: '',
// 	sauce: '',
// 	toppingsSelected: '',
// };
