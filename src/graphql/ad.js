/* eslint-disable no-underscore-dangle */
import { gql } from 'apollo-server';
import PostsService from '../services/posts';
import { authCheck } from './utils';

export const typeDefs = gql`
  extend type Query {
    ads(
      offset: Int,
      limit: Int,
      categoryId: ID
      search: String
    ): [Ad]!
    categories: [Category]!;
  }

  extend type Mutation {
    addAd(body: String!): Ad!
    deleteAd(postId: ID!): Boolean
    updateAd(postId: ID!, body: String!): Ad!
  }

  type Ad {
    _id: ID!
    creator: User!
    body: String!
    images: [Image]!
    createdAt: String!
    category: Category!
    categoryId: ID!
    status: AdStatus!
  }
  enum AdStatus {
    PUBLIC
    PRIVATE
    ARCHIVED
    BANNED
  }
  type Category {
    _id: ID!
    name: String!
  }
  type Report {
    _id: ID!
    message: String!
    createdById: ID!
    createdBy: User!
    createdAt: String!
    ad: Ad!
    adId: ID!
    status: ReportStatus!
  }
  enum ReportStatus {
    NEW
    IGNORED
    ACCEPTED
  }
  type Image {
    url: String
  }
`;

export const resolvers = {
  Query: {
    ads: (root, args, ctx) => {
      authCheck(ctx);
      const { limit, offset } = args;
      return PostsService.find({}, { limit, offset });
    },

  },
  Mutation: {
    addAd: (root, args, ctx) => {
      authCheck(ctx);
      return PostsService.add({ createdBy: ctx.user._id, body: args.body });
    },
    deleteAd: (root, args, ctx) => {
      authCheck(ctx);
      return PostsService.remove(args.postId).then(result => result.ok);
    },
    updateAd: (root, args, ctx) => {
      authCheck(ctx);
      return PostsService.update(args.postId, args.body);
    },
  },
  
};
