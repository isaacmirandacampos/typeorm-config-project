import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import http from 'http';
import morgan from 'morgan';
import 'dotenv/config';
import path from 'path';

import routes from './routes';

import './database';

class App {
  public app: express.Application;
  server: http.Server;
  io: any;
  connectedUsers: any;
  http: any; 

  public constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.listen();

    this.connectedUsers = {};
  }


  private middlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(compression());
    this.app.use(morgan('dev'));
    this.app.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
    this.app.use((req, res, next) => {
      req.io = this.io;
      req.connectedUsers = this.connectedUsers;

      next();
    });
  }

  private routes(): void {
    this.app.use(routes);
  }

  private listen(): void {
    this.server.listen(process.env.PORT);
    if (process.env.NODE_ENV === 'localhost')
      console.log(`Rodando na porta: ${process.env.PORT}`);
  }
}

export default new App();
