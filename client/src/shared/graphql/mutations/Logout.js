'use strict';

/**
  * @module 
  * @author John Butler
  * @description 
*/

import gql from 'graphql-tag';

export default gql`
	mutation {
		logout {
			id
			email
		}
	}
`;
