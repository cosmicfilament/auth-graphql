import { useState, useEffect, useCallback } from 'react';
import { graphql } from 'react-apollo';
import { useHistory } from 'react-router-dom';

import { TYPEOF } from '../util/helpers';
import query from '../../shared/graphql/queries/CurrentUser';

const authHook = props => {
	const [ authenticated, setAuthState ] = useState(false);

  const history = useHistory();

	const navigate = useCallback(page => {
		history.push(page);
	}, []);

	useEffect(
		() => {
			setAuthState(
				!props.data.loading && TYPEOF(props.data.currentUser === 'object')
			);
		},
		[ props.data ]
	);
	return [ authenticated, navigate ];
};

export default graphql(query)(authHook);
