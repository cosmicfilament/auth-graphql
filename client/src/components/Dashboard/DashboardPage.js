import React, { useEffect } from 'react';

import { graphql } from 'react-apollo';
import { useHistory } from 'react-router-dom';

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

const Dashboard = props => {
	const history = useHistory();

	useEffect(
		() => {
			if (props.data.loading || TYPEOF(props.data.currentUser) !== 'object') {
				history.goBack();
			}
		},
		[ props.data, history ]
	);

	return <div>Hello Bitches!</div>;
};

export default graphql(query)(Dashboard);
