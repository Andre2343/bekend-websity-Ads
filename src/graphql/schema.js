import { gql, makeExecutableSchema } from 'apollo-server';
import merge from 'lodash/merge';
import { typeDefs as Ad, resolvers as postResolvers } from './ad';
import { typeDefs as User, resolvers as userResolvers } from './user';

const Common = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

const schema = makeExecutableSchema({
  typeDefs: [Common, User, Ad],
  resolvers: merge(userResolvers, postResolvers),
});

export default schema;
