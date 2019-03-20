const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString
} = require('graphql');

const pgdb = require('../database/pgdb')

const UserType = require('./types/user');

const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        me:{
            type: UserType,
            description: "This will identify a user by an API key",
            args : { 
                key: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: (obj, args, {pgPool}) => {
                // fetch from db
                return pgdb(pgPool).getUserByApiKey(args.key);
            }

        }
    }
});

const ncSchema = new GraphQLSchema({
    query: RootQueryType,
    // mutation: ...
});
module.exports = ncSchema;