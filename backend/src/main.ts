import cors from 'cors';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import bearerToken from 'express-bearer-token';
import http from 'http';
import createHttpError from 'http-errors';
import * as jwt from 'jsonwebtoken';
import pinoHttp from 'pino-http';

import config from '@/config';
import router from '@/routes';
import { logger } from '@/utils/logger';

const pinoHttpMiddleware = pinoHttp();

const main = async () => {
  /* Express App setup */
  const app = express();
  // TODO: Create HTTPS server instead of HTTP
  app.use(cors());
  app.set('trust proxy', 1);
  app.use(pinoHttpMiddleware);
  app.use(express.json());

  // Extract token middleware
  app.use(
    bearerToken({
      headerKey: 'Bearer',
    })
  );
  // Verify user middleware
  app.use((req: Request, _res: Response, next: NextFunction) => {
    try {
      const decodedUser = jwt.verify(req.token, config.jwt.secret);
      req.user = decodedUser as jwt.JwtPayload;
      next();
    } catch (err) {
      next(
        createHttpError(
          401,
          'Corrupted/Invalid credentials, please login first.'
        )
      );
    }
  });

  app.use('/api', router);

  app.get('/', (_req, res) => {
    res.send('<h1>Welcome to Backend Server of McKEvents.</h1>');
  });

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500).send({ error: err.message });
    next();
  });

  /* Server Setup */
  const server = http.createServer(app);

  server.listen(process.env.APP_PORT, () => {
    logger.info(
      `Backend Server listening on ${process.env.APP_HOST}:${process.env.APP_PORT}`
    );
  });
};

export default main;
