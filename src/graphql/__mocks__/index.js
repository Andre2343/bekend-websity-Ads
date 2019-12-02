import merge from 'lodash/merge';
import adMocks from './ad';
// import userMocks from './user';

const mergedMocks = merge({}, adMocks /* userMocks */);

export default {
  ...(mergedMocks.Query ? { Query: () => mergedMocks.Query } : {}),
  ...(mergedMocks.Mutation ? { Mutation: () => mergedMocks.Mutation } : {}),
};
