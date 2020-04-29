import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';

import LandingPage from './components/Landing/LandingPage';
import Header from './components/Header/Header';
import LoginForm from './components/Login/LoginFormPage';
import SignupForm from './components/Signup/SignupFormPage';
import Dashboard from './components/Dashboard/DashboardPage';

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) {
		graphQLErrors.map(({ message, locations, path }) =>
			console.log(
				`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
			)
		);
		graphQLErrors = null;
	}
	if (networkError) console.log(`[Network error]: ${networkError}`);
});

const cache = new InMemoryCache({});

const httpLink = new HttpLink({
	uri: 'graphql',
	opts: { credentials: 'same-origin' }
});

const link = ApolloLink.from([ errorLink, httpLink ]);

const client = new ApolloClient({
	cache,
	link
});

function App () {
	return (
		<ApolloProvider client={client}>
			<Router>
				<div className='container'>
					<Header />
					<Switch>
						<Route exact path='/' component={LandingPage} />
						<Route path='/login' component={LoginForm} />
						<Route path='/signup' component={SignupForm} />
						<Route path='/dashboard' component={Dashboard} />
					</Switch>
				</div>
			</Router>
		</ApolloProvider>
	);
}

export default App;
