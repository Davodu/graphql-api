const  {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLID,
    GraphQLList
} = require('graphql');

const ContestType = require('./contest-type');
const pgdb = require('../../database/pgdb');
module.exports = new GraphQLObjectType({
    name: 'MeType',
    description : "Basic user type with required fields",
    fields:{
        id: {
            type: GraphQLID
        },
        email: {
            type: new GraphQLNonNull(GraphQLString)
        },
        firstName: { type: GraphQLString},
        lastName: { type: GraphQLString},
        createdAt: { type: GraphQLString},
        fullName :{
            type: GraphQLString,
            resolve: obj=>`${obj.firstName} ${obj.lastName}`
        },
        contests: {
            type: new GraphQLList(ContestType),
            resolve: (obj, args, ctx)=>{
                // read rows from DB
                return pgdb(ctx.pgPool).getContests(obj);
            }
        }
    }
})