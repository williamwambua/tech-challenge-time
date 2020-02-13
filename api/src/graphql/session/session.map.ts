import { resolver } from 'graphql-sequelize';
import { Session } from '../../models';
import to from 'await-to-js';

export const SessionMap = {
    user: resolver(Session.associations.user)
};