'use strict';

/**
  * @module 
  * @author John Butler
  * @description 
*/

const express = require('express');
const cors = require('cors');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const session = require('express-session');

const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
const schema = require('./schema/schema');

// should really go in the .env file
const SESSSION_SECRET = 'we shall whip the horses eyes';

// Create a new Express application
const app = express();

// Replace with your mongoLab URI
const MONGO_URI = 'mongodb://192.168.1.39:32800';
const MONGO_DB = 'auth';
if (!MONGO_URI) {
	throw new Error('You must provide a mongodb URI');
}

// Mongoose's built in promise library is deprecated, replace it with ES2015 Promise
mongoose.Promise = global.Promise;

// Connect to the mongoDB instance and log a message
// on success or failure
const server = `${MONGO_URI}/${MONGO_DB}`;
const options = {
	w: 'majority',
	retryWrites: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
};

mongoose.connect(server, options);
mongoose.connection
	.once('open', () => console.log('Connected to mongodb instance.'))
	.on('error', error => console.log('Error connecting to mongodb:', error));

app.use(cors());

// Configures express to use sessions.  This places an encrypted identifier
// on the users cookie.  When a user makes a request, this middleware examines
// the cookie and modifies the request object to indicate which user made the request
// The cookie itself only contains the id of a session; more data about the session
// is stored inside of MongoDB.
app.use(
	session({
		resave: true,
		saveUninitialized: true,
		secret: SESSSION_SECRET,
		store: new MongoStore({
			url: MONGO_URI,
			autoReconnect: true
		})
	})
);

// Passport is wired into express as a middleware. When a request comes in,
// Passport will examine the request's session (as set by the above config) and
// assign the current user to the 'req.user' object.  See also servces/auth.js
app.use(passport.initialize());
app.use(passport.session());

// Instruct Express to pass on any request made to the '/graphql' route
// to the GraphQL instance.
app.use(
	'/graphql',
	expressGraphQL({
		schema,
		graphiql: true
	})
);

module.exports = app;
