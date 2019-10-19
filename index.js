const { ApolloServer, gql } = require('apollo-server');

const { loadAndParse }      = require('./parseWebtoons');

const typeDefs = gql`
  type WebtoonImages {
    images: [String]!
  }

  type Query {
    webtoon(url: String!): WebtoonImages
    image(url: String!): String
  }
`;

const resolvers = {
  Query: {
    webtoon: loadAndParse
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen( 4000 );
