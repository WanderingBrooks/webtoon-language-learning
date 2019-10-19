import gql from 'graphql-tag';

export default {

  getImages: gql`
    query getGreeting($url: String!) {
      webtoon(url: $url) {
        images
      }
    }
  `

};
