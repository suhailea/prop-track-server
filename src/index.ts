import express, { Request, Response } from 'express';
import routes from './routes';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Express with TypeScript!');
});

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
