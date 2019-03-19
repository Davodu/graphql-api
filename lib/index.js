const { nodeEnv } = require('./util');
console.log(`Running in ${nodeEnv} mode...`);

const app = require('express')();
const pg = require('pg');
const pgConfig = require('../config/pg')[nodeEnv];
const pgPool = new pg.Pool(pgConfig);
// read query from command line args
const query = process.argv[2];

const ncSchema = require('../schema');
const graphqlHTTP = require('express-graphql')

app.use('/graphql', graphqlHTTP({
    schema: ncSchema,
    graphiql: true,
    context: {pgPool}
}))

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`);
});