import { Query } from './session.query';
import { SessionMap } from "./session.map";
import { Mutation } from "./session.mutation";

export const resolver = {
  Query: Query,
  Session: SessionMap,
  Mutation: Mutation,
};