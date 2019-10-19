const express = require('express');
const axios   = require('axios');

const app     = express();

app.get( '/image/:url/:referer', ( { params }, res ) => {
  if ( !params.url.includes('http') ) {
    res.send( 404 );
  }

  axios({
    method:       'get',
    url:          params.url,
    responseType: 'stream',
    headers:      { 'Referer': params.referer }
  })
  .then( response => response.data.pipe( res ) )
  .catch( console.error );
});

app.listen( 5000 );
