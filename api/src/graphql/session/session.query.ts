import { resolver } from 'graphql-sequelize';
import { Session } from '../../models';
// import { Op } from 'sequelize';

export const Query = {
    session: resolver(Session, {
        before: async (findOptions, {id}, {}) => {
            findOptions.where = {id};
            return findOptions;
        },
        after: (session) => {
            return session;
        }
    }),
    sessions: resolver(Session, {
        before: async (findOptions, {userId}, {}) => {
            findOptions.where = {userId};
            findOptions.order = [['start', 'DESC']];
            return findOptions;
        },
        after: (session) => {
            return session;
        }
    }),
    activeSession: resolver(Session, {
        before: async (findOptions, {userId, active}, {}) => {
            findOptions.where = {
                userId,
                active
            };
            return findOptions;
        },
        after: (session) => {
            return session;
        }
    }),
};