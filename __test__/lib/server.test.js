'use strict';

// Vinicio - this is called de-structuring
const {server} = require('../../lib/server.js');
const supertest = require('supertest');
// Vinicio - we are creating an instance of superTest with the server we created
const mockRequest = supertest(server);

describe('web server', () => {

  it('should respond with a 500 on an error', () => {

			// Vinicio - here you can do mockRequest.ANY_ROUTE, and it'll call a fake
			// version of your server
    return mockRequest
      .get('/foo')
      .then(results => {
        expect(results.status).toBe(500);
      }).catch(console.error);

  });
  
  it('should respond with a 404 on an invalid route', () => {

    return mockRequest
      .get('/foobar')
      .then(results => {
        expect(results.status).toBe(404);
      }).catch(console.error);

  });

  it('should respond with a 404 on an invalid method', () => {

    return mockRequest
      .post('/')
      .then(results => {
        expect(results.status).toBe(404);
      }).catch(console.error);

  });

  it('should respond properly on request to /api/v1/posts', () => {

    return mockRequest
      .get('/api/v1/posts')
      .then(results => {
        expect(results.status).toBe(200);
      }).catch(console.error);

  });

});
