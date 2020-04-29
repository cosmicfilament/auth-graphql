import React, { useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';

import AuthForm from '../../shared/components/AuthForm';
import mutation from '../../shared/graphql/mutations/Signup';
import query from '../../shared/graphql/queries/CurrentUser';
import { useAuthHook } from '../../shared/hooks/authHook';

const SignupForm = () => {
	const [ signup, { error: mutationError } ] = useMutation(mutation);
	const { authenticated, goFwdTo } = useAuthHook();

	useEffect(
		() => {
			if (authenticated) {
				goFwdTo('Dashboard');
			}
		},
		[ authenticated, goFwdTo ]
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

export default SignupForm;
