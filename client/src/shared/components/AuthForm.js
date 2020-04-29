import React, { useState } from 'react';

const AuthForm = props => {
	const [ formState, setFormState ] = useState({ email: '', password: '' });

	const emailHandler = event => {
		formHandler('email', event.target.value);
	};
	const passwordHandler = event => {
		formHandler('password', event.target.value);
	};
	const formHandler = (input, value) => {
		setFormState({ ...formState, [input]: value });
	};

	const submitHandler = event => {
		event.preventDefault();
		props.onSubmit(formState);
	};

	return (
		<div className='row'>
			<form className='col s8' onSubmit={submitHandler}>
				<div className='input-field'>
					<input placeholder='Email' type='email' onChange={emailHandler} />
				</div>
				<div className='input-field'>
					<input placeholder='Password' type='password' onChange={passwordHandler} />
				</div>
				<button className='btn'>Submit</button>
			</form>
		</div>
	);
};

export default AuthForm;
