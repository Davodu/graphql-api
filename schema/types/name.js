const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull
} = require('graphql');

const pgdb = require('../../database/pgdb');
module.exports = new GraphQLObjectType({
    name: 'Name',
// fix for cyclic module dependency using a function to return a Type's field
    fields:()=> {
        const UserType = require('./user');
        return {
            id: {
                type: GraphQLID
            },
            label:{
                type: new GraphQLNonNull(GraphQLString)
            },
            description: {
                type: GraphQLString
            },
            createdAt: {
                type: new GraphQLNonNull(GraphQLString)
            },
            createdBy: {
                type: new GraphQLNonNull(UserType),
                resolve(obj, arg, {pgPool}){
                    return pgdb(pgPool).getUserById(obj.createdBy);
                }
            }
        }
    }
});