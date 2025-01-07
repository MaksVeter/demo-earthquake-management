import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
    link: new HttpLink({
        uri: process.env.GRAPHQL_SERVER_URL,
        credentials: 'same-origin',
    }),
    cache: new InMemoryCache(),
});

export default client;
