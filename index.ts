import express, { Express, Request, Response } from 'express';
import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from 'graphql';
import { createHandler } from 'graphql-http/lib/use/express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
//DATA EN DUR
const userData = require("./MOCK_DATA.json");

//Graphql Schema
const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLInt },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        email: { type: GraphQLString },
        gender: { type: GraphQLString },
        avatar: { type: GraphQLString },
        birth: { type: GraphQLString }
    })
});
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        getAllUsers: {
            type: new GraphQLList(UserType),
            args: { id: { type: GraphQLInt } },
            resolve(parent, args) {
                return userData
            }
        }
    }
});
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: {
            type: UserType,
            args: {
                first_name: { type: GraphQLString },
                last_name: { type: GraphQLString },
                email: { type: GraphQLString },
                gender: { type: GraphQLString },
                avatar: { type: GraphQLString },
                birth: { type: GraphQLString }
            },
            resolve(parent, args) {
                userData.push({
                    id: userData.length + 1,
                    first_name: args.first_name,
                    last_name: args.last_name,
                    email: args.email,
                    gender: args.gender,
                    avatar: args.avatar,
                    birth: args.birth
                })

                console.log(userData.length)
            }
        }
    }
});
const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

app.all('/graphql', createHandler({
    schema
}));
/*app.get('/', (req: Request, res: Response) => {
    res.send('Express + Typescript SSO');
});*/

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
});