import React, { useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { graphql } from 'react-apollo';
import { useHistory } from 'react-router-dom';

import AuthForm from '../../shared/components/AuthForm';
import mutation from '../../shared/graphql/mutations/Signup';
import query from '../../shared/graphql/queries/CurrentUser';

const TYPEOF = function (value) {
	if (value === null) {
		return value;
	}
	if (typeof value === 'undefined') {
		return 'undefined';
	}
	return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
};

const SignupForm = props => {
	const [ signup, { error: mutationError } ] = useMutation(mutation);

	const history = useHistory();

	useEffect(
		() => {
			if (!props.data.loading && TYPEOF(props.data.currentUser) === 'object') {
				history.push('/Dashboard');
			}
		},
		[ props.data, history ]
	);

	const submitHandler = ({ email, password }) => {
		signup({
			variables: { email, password },
			refetchQueries: [ { query } ]
		}).catch(error => {
			console.log(`Error signing up for new acct: ${error}`);
		});
	};
	return (
		<div>
			<h3>Membership Signup</h3>
			<AuthForm onSubmit={submitHandler} />
			{mutationError && (
				<div className='row'>
					<span className='badge red center col s8' style={{ color: 'white' }}>
						{String(mutationError).replace('GraphQL error:', '')}
					</span>
				</div>
			)}
		</div>
	);
};

export default graphql(query)(SignupForm);