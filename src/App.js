import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from '@material-ui/core/styles';

import Main from './views/main';
import theme from './theme';

import './App.css';

const client = new ApolloClient({ uri: '/graphql' });

function App() {
  return (
    <ApolloProvider client = { client }>
      <ThemeProvider theme = { theme }>
        <Main />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
