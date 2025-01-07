import {ApolloServer} from "@apollo/server";
import {expressMiddleware} from "@apollo/server/express4";
import app from './app.js';
import {schema} from "./graphql/schema.js";
import db from "./config/db.js"
import {Context} from "./types/context.js";


const server = new ApolloServer<Context>({
    typeDefs: schema.typeDefs,
    resolvers: schema.resolvers
});
(async () => {
    await server.start();

    app.use("/graphql", expressMiddleware(server,{
        context: async ()=>({
            db:db
        })
    }));
    const PORT = process.env.PORT || 5050;
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    });
})()

