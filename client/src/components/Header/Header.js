import React from 'react';
import { Link } from 'react-router-dom';

import { graphql } from 'react-apollo';
import query from '../../shared/graphql/queries/CurrentUser';
import mutation from '../../shared/graphql/mutations/Logout';

const Header = props => {
	const _data = props.data;
	console.log(_data);

	const handleOnLogoutClick = event => {
		props.mutate({ refetchQueries: [ { query } ] });
	};

	const renderButtons = () => {
		if (_data.loading) {
			return <div />;
		}
		if (_data.currentUser) {
			return (
				<li>
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

export default graphql(mutation)(graphql(query)(Header));
