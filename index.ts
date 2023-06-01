import express, { Express, Request, Response } from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import dotenv from 'dotenv';
import schema from './Schemas';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.all('/graphql', createHandler({
    schema
}));
/*app.get('/', (req: Request, res: Response) => {
    res.send('Express + Typescript SSO');
});*/

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
});