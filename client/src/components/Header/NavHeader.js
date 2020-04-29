import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';

import query from '../../shared/graphql/queries/CurrentUser';
import mutation from '../../shared/graphql/mutations/Logout';
import { useAuthHook } from '../../shared/hooks/authHook';

const NavHeader = () => {
	const { authenticated, goFwdTo, loading } = useAuthHook();
	const [ logout ] = useMutation(mutation);

	const handleOnLogoutClick = () => {
		logout({ refetchQueries: [ { query } ] })
			.then(() => {
				goFwdTo('/');
			})
			.catch(error => {
				console.log(`Error Logging Out: ${error}`);
			});
	};

	const renderButtons = () => {
		if (loading) {
			return <div />;
		}

		if (authenticated) {
			return (
				<div>
					<li className=''>
						<Link to='/dashboard'>Dashboard</Link>
					</li>
					<li>
						{/* eslint-disable-next-line */}
						<a onClick={handleOnLogoutClick}>Logout</a>
					</li>
				</div>
			);
		}
		else {
			return (
				<div>
					<li className=''>
						<Link to='/signup'>Signup</Link>
					</li>
					<li className=''>
						<Link to='/login'>Login</Link>
					</li>
				</div>
			);
		}
	};

	return (
		<nav>
			<div className='nav-wrapper'>
				<Link to='/' className='brand-logo left'>
					Home
				</Link>
				<ul className='right'>{renderButtons()}</ul>
			</div>
		</nav>
	);
};

export default NavHeader;
