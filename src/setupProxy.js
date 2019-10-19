const proxy = require('http-proxy-middleware');

module.exports = app => {
  const apiProxy    = proxy( '/graphql', { target: `http://localhost:4000` } );
  const imgaeProxy  = proxy( '/image',   { target: `http://localhost:5000` } );

  app.use( apiProxy );
  app.use( imgaeProxy );
};
