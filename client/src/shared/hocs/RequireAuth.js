import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { graphql } from 'react-apollo';

import query from '../graphql/queries/CurrentUser';

export default WrappedComponent => {
	const RequireAuth = props => {
		const history = useHistory();

		useEffect(
			() => {
				if (!props.data.loading && !props.data.currentUser) {
					history.push('/login');
				}
			},
			[ props.data, history ]
		);

		if (props.data.loading) {
			return <div />;
		}

		return <WrappedComponent {...props} />;
	};

	return graphql(query)(RequireAuth);
};
