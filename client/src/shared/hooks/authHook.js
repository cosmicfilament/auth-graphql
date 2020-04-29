import { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import query from '../../shared/graphql/queries/CurrentUser';

export const useAuthHook = () => {
	const [ authenticated, setAuthState ] = useState(false);
	const { loading, error, data } = useQuery(query);

	const history = useHistory();

	const gotTo = useCallback(
		page => {
			history.push(page);
		},
		[ history ]
	);

	const goBack = useCallback(
		() => {
			history.goBack();
		},
		[ history ]
	);

	useEffect(
		() => {
			setAuthState(!loading && data.currentUser !== null);
		},
		[ loading, data ]
	);

	return [ authenticated, gotTo, goBack, error ];
};
