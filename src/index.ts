import { ApolloServer } from 'apollo-server';
import typeDefs from './graphql/type-definitions';
import {
  startupResolvers,
  phaseResolvers,
  taskResolvers,
  startupTaskCompletionResolvers,
} from './graphql/resolvers';
import { mergeResolvers } from '@graphql-tools/merge';

// TODO: implement proper error handling for resolvers (check not found errors, format errors, etc...)
const resolvers = mergeResolvers([
  startupResolvers,
  phaseResolvers,
  taskResolvers,
  startupTaskCompletionResolvers,
]);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
