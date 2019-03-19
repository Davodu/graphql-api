const  {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLID
} = require('graphql');

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
        }
        
    }
})