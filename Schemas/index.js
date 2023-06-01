import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} from 'graphql';
//TYPE
import { UserType } from './TypeDefs/UserType';

//DATA EN DUR
const userData = require("../MOCK_DATA.json");


//QUERY
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

//MUTATION
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
                });

                return (userData[userData.length - 1]);
            }
        }
    }
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

//EXPORT SCHEMA
export default schema;