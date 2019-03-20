const  {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLInt
} = require('graphql');

const ContestType = require('./contest-type');

// reading data from 2 dbs and abstracting in query, query will look like. Mongo call happens 3 times for each count field, not efficient & will be fixed in next commit
/*
{
  user1:me(key: "0000"){
    #from postgres
		id
    fullName
    email
    contests{
      id
      code
      title
      description
      status
      createdAt
    }
    #from mongo
    contestsCount
    namesCount
    votesCount
  }
}
*/
const pgdb = require('../../database/pgdb');
const mdb = require('../../database/mdb');

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
        },
        contestsCount:{
            type: GraphQLInt,
            resolve(obj, args, {mPool}, {fieldName}){
                return mdb(mPool).getCounts(obj, fieldName);
            }
        },
        namesCount:{
            type: GraphQLInt,
            resolve(obj, args, {mPool}, {fieldName}){
                return mdb(mPool).getCounts(obj, fieldName);
            }
        },
        votesCount:{
            type: GraphQLInt,
            resolve(obj, args, {mPool}, {fieldName}){
                return mdb(mPool).getCounts(obj, fieldName);
            }
        }
    }
})