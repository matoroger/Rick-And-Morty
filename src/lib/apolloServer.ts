import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export function getServerApolloClient() {
  return new ApolloClient({
    ssrMode: true,
    link: new HttpLink({
      uri: "https://rickandmortyapi.com/graphql",
    }),
    cache: new InMemoryCache(),
  });
}
