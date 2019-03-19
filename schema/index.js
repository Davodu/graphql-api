const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString
} = require('graphql');

const pgdb = require('../database/pgdb')

const MeType = require('./types/me');

const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        me:{
            type: MeType,
            description: "This will identify a user by an API key",
            args : { 
                key: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: (obj, args, {pgPool}) => {
                // fetch from db
                return pgdb(pgPool).getUser(args.key);
            }

        }
    }
});

const ncSchema = new GraphQLSchema({
    query: RootQueryType,
    // mutation: ...
});
module.exports = ncSchema;