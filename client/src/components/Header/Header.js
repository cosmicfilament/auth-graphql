import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { graphql } from 'react-apollo';

import query from '../../shared/graphql/queries/CurrentUser';
import mutation from '../../shared/graphql/mutations/Logout';

const Header = props => {
	const _data = props.data;

	const [ logout ] = useMutation(mutation);

	const history = useHistory();

	const handleOnLogoutClick = () => {
		logout({ refetchQueries: [ { query } ] })
			.then(() => {
				history.push('/');
			})
			.catch(error => {
				console.log(`Error Logging Out: ${error}`);
			});
	};

	const renderButtons = () => {
		if (_data.loading) {
			return <div />;
		}

		if (_data.error) {
			return <div>{`Error: ${_data.error}`}</div>;
		}

		if (_data.currentUser) {
			return (
				<li>
					{/* eslint-disable-next-line */}
					<a onClick={handleOnLogoutClick}>Logout</a>
				</li>
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

export default graphql(query)(Header);
