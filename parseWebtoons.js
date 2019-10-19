const axios                 = require('axios');
const { parse }             = require('node-html-parser');

const loadAndParseWebtoon = async( url ) => {
  const { data } = await axios( url );
  const parsed   = parse( data );

  const images = parsed.querySelectorAll('._images')
  .map( img => img.rawAttributes['data-url'] );

  return { images };
};

const loadAndParse네이버 = async( url ) => {
  const { data } = await axios( url );
  const parsed   = parse( data );

  const images = parsed.querySelectorAll('img')
  .reduce( ( reduced, img ) => {
    if ( img.id && img.id.includes('content_image') ) {
      reduced.push( img.rawAttributes.src );
    }

    return reduced;
  }, [] );

  return { images };
};

const loadAndParse = ( r, { url } ) => {
  const domain = url.match( /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/i );

  if ( domain.length < 2 ) {
    throw new Error('Invalid url received');
  }

  switch ( domain[ 1 ] ) {
    case 'comic.naver.com':
      return loadAndParse네이버( url );
    case 'webtoons.com':
      return loadAndParseWebtoon( url );
    default:
      throw new Error('Type not supported');
  }
};

module.exports = {
  loadAndParse
};
