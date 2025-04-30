import express from 'express';
import cors from 'cors';
import session from 'express-session';
import { RedisStore } from 'connect-redis';
import Redis from 'ioredis';

import userRoutes from './src/routes/userRoutes.js';
import areaRoutes from './src/routes/areaRoutes.js';
import eventRoutes from './src/routes/eventRoutes.js';
import subscriptionRoutes from './src/routes/subscriptionRoutes.js';
import authenticationRoutes from './src/routes/authenticationRoutes.js';

const app = express();
const port = 3000;

/*
* Comes from see: "https://stackoverflow.com/questions/78279141/how-to-change-body-bg-color-for-light-and-dark-mode-mantine-ui/78547932#78547932"
* Comes from see: "https://www.npmjs.com/package/connect-redis"
* Comes from see: "https://upstash.com/docs/redis/tutorials/express_session"
*/
const redisClient = new Redis("rediss://default:ATxwAAIjcDE1MDUzOTg0ZTE0YWQ0MjVjYmRjNWY1MzNmYjM2MjViMnAxMA@sweeping-marmot-15472.upstash.io:6379", {
  tls: {}
});


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());


app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: 'super-secret-key', // In production, use process.env.SESSION_SECRET
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // true if using HTTPS
    httpOnly: true,
    maxAge: 1000 * 60 * 60 // 1 hour
  }
}));


app.use('/users', userRoutes);
app.use('/areas', areaRoutes);
app.use('/events', eventRoutes);
app.use('/subscriptions', subscriptionRoutes);
app.use('/', authenticationRoutes);


app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
