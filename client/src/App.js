import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

import Dashboard from './components/Dashboard/DashboardPage';

const cache = new InMemoryCache({});

const link = new HttpLink({
	uri: 'graphql',
	opts: { credentials: 'same-origin' }
});

const client = new ApolloClient({
	cache,
	link
});

function App () {
	return (
		<ApolloProvider client={client}>
			<Router>
				<section className='container'>
					<Switch>
						<Route exact path='/' component={Dashboard} />
					</Switch>
				</section>
			</Router>
		</ApolloProvider>
	);
}

export default App;
