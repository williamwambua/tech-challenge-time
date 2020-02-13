import { resolver as rs } from 'graphql-sequelize';
import { Session } from '../../models';
import to from 'await-to-js';

export const Mutation = {
    createSession: rs(Session, {
        before: async (findOptions, { data }) => {
          const today = new Date();
          data.start = today;
          data.active = true;

          let err, session;
          // @ts-ignore
          [err, session] = await to(Session.create(data));
          if (err) {
            throw err;
          }
          findOptions.where = { id: session.id };
          return findOptions;
        },
        after: (session) => {
          return session;
        }
    }),
    updateSession: rs(Session, {
        before: async (findOptions, { id, data }) => {

          if (data.updateStartDate) {
            const today = new Date();
            data.start = today;
          }

          let err, session;
          // @ts-ignore
          [err, session] = await to(Session.update(data, 
            {where: {id}}));
          if (err) {
            throw err;
          }
          findOptions.where = { id };
          return findOptions;
        },
        after: (session) => {
          return session;
        }
    }),
    closeSession: rs(Session, {
        before: async (findOptions, { id, data }) => {
          const today = new Date();
          data.end = today;
          data.active = false;
          
          let err, session;
          // @ts-ignore
          [err, session] = await to(Session.update(data, 
            {where: {id}}));
          if (err) {
            throw err;
          }
          findOptions.where = { id };
          return findOptions;
        },
        after: (session) => {
          return session;
        }
    }),
    deleteSession: rs(Session, {
        before: async (findOptions, {id, data}, {}) => {
          let err, session;

          // @ts-ignore
          [err, session] = await to(Session.destroy({where: {id}}) );
          if (err) {
            throw err;
          }
          findOptions.where = { id };
          return findOptions;
        },
        after: (session) => {
            return session;
        }
    })
};