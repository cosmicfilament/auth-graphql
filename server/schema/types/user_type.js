'use strict';

/**
  * @module 
  * @author John Butler
  * @description 
*/

const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const UserType = new GraphQLObjectType({
	name: 'UserType',
	fields: {
		id: { type: GraphQLID },
		email: { type: GraphQLString }
	}
});

module.exports = UserType;
