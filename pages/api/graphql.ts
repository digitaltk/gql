import { ApolloServer } from 'apollo-server-micro';
import "reflect-metadata";
import { buildSchema, Resolver, Query, Arg, ObjectType, Field, ID } from 'type-graphql';

import { DogsResolver } from '../../src/schema/dogs.resolver';

// @ObjectType()
// export class Dog{
//     @Field(() => ID)
//     name:string;
// }

// @Resolver(Dog)
// export class DogsResolver {
//     @Query(() => [Dog])
//     dogs(): Dog[] {
//         return [
//         {name: "Bo"},
//         {name: "Lassie"},
//         ];       
//     }
// }

const schema = await buildSchema({
    resolvers: [DogsResolver],
})
const server = new ApolloServer({
schema,

});

//dont enable the body parser
export const config ={
    api: {
        bodyParser: false,
    },
};

//start server
const startServer = server.start();

//await server and handle req and res
export default async function handler(req, res){
    await startServer;
    await server.createHandler({ path: "/api/graphql"})(req, res);
}