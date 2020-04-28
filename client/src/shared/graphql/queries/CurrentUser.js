'use strict';

/**
  * @module 
  * @author John Butler
  * @description 
*/

import gql from 'graphql-tag';

export default gql`
	{
		currentUser {
			id
			email
		}
	}
`;
