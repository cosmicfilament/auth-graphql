'use strict';

/**
	* @module 
	* @author John Butler
	* @description 
*/

const app = require('./server/server');
const PORT = 4000;

app.listen({ port: PORT }, () => {
	console.log(`Listening at http://localhost:${PORT}.`);
});
