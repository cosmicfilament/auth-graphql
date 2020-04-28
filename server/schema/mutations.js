'use strict';

/**
  * @module 
  * @author John Butler
  * @description 
*/

const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql;

const UserType = require('./types/user_type');
const authService = require('../services/auth');

const mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		signup: {
			type: UserType,
			args: {
				email: { type: GraphQLString },
				password: { type: GraphQLString }
			},
			resolve (parentValue, { email, password }, req) {
				return authService.signup({ email, password, req });
			}
		},
		logout: {
			type: UserType,
			resolve (parentValue, args, req) {
				return authService.logout(req);
			}
		},
		login: {
			type: UserType,
			args: {
				email: { type: GraphQLString },
				password: { type: GraphQLString }
			},
			resolve (parentValue, { email, password }, req) {
				return authService.login({ email, password, req });
			}
		}
	}
});

module.exports = mutation;
