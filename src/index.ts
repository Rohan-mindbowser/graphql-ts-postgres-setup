const { ApolloServer } = require("apollo-server-express");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
  gql,
} = require("apollo-server-core");
const express = require("express");
const envConfig = require("./config/config");
require("dotenv").config();

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => "Hello world!",
  },
};

async function startApolloServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    persistedQueries: false,
    context: async (ctx: any) => {
      const { req, res } = ctx;

      // return {
      //   db_con,
      // };
    },
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await server.start();

  server.applyMiddleware({ app });
  app.listen({ port: envConfig.server.port }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${envConfig.server.port}${server.graphqlPath}`
    )
  );
}

startApolloServer();

// http://localhost:8080/graphql
