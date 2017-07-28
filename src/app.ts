require('dotenv').config();

import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as ejs from 'ejs';
import * as cors from 'cors';

const app: express.Express = express();
const protect = require('@risingstack/protect');
import Knex = require('knex');
import { MySqlConnectionConfig } from 'knex';

import { Jwt } from './models/jwt';
const jwt = new Jwt();

import index from './routes/index';
import loginRoute from './routes/login';

import stdRoute from './routes/shared/std';

import adminGenerics from './routes/admin/generics';
import adminGenericTypes from './routes/admin/generic-types';
import adminUnits from './routes/admin/units';
import adminDepartments from './routes/admin/departments';
import adminSuppliers from './routes/admin/suppliers';
import adminProducts from './routes/admin/products';
import adminReceives from './routes/admin/receives';
import adminLots from './routes/admin/lots';
import adminRequest from './routes/admin/request';

import userRequest from './routes/users/request';
//view engine setup

app.set('views',path.join(__dirname,'views'));
app.engine('.html',ejs.renderFile);
app.set('view engine','html');

//uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname,'public','favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use(protect.express.sqlInjection({
  body: true,
  loggerFunction: console.error
}));

app.use(protect.express.xss({
  body: true,
  loggerFunction: console.error
}));



let auth = (req, res, next) => {
  let token: string = null;

  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    token = req.query.token;
  } else {
    token = req.body.token;
  }

  jwt.verify(token)
    .then((decoded: any) => {
      req.decoded = decoded;
      next();
    }, err => {
      console.log(err);
      return res.send({
        ok: false,
        error: 'No token provided.',
        code: 403
      });
    });
}

const adminAuth = (req, res, next) => {
  if (req.decoded.is_admin === 1) {
    next();
  } else {
    res.send({ ok: false, error: 'Permission denied!' });
  }
}

const userAuth = (req, res, next) => {
  if (req.decoded.is_admin === 0) {
    next();
  } else {
    res.send({ ok: false, error: 'Permission denied!' });
  }
}


let dbConnection: MySqlConnectionConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true
}

app.use((req, res, next) => {
  req.db = Knex({
    client: 'mysql',
    connection: dbConnection,
    pool: {
      min: 0,
      max: 7,
      afterCreate: (conn, done) => {
        conn.query('SET NAMES utf8', (err) => {
          done(err, conn);
        });
      }
    },
    debug: true,
    acquireConnectionTimeout: 5000
  });

  next();
});

app.use('/login', loginRoute);

app.use('/admin/generics', auth, adminAuth, adminGenerics);
app.use('/admin/generic-types', auth, adminAuth, adminGenericTypes);
app.use('/admin/units', auth, adminAuth, adminUnits);
app.use('/admin/departments', auth, adminAuth, adminDepartments);
app.use('/admin/suppliers', auth, adminAuth, adminSuppliers);
app.use('/admin/products', auth, adminAuth, adminProducts);
app.use('/admin/receives', auth, adminAuth, adminReceives);
app.use('/admin/lots', auth, adminAuth, adminLots);
app.use('/admin/request', auth, adminAuth, adminRequest);

app.use('/std', auth, stdRoute);

app.use('/users/request', auth, userAuth, userRequest);

app.use('/', index);

app.use((req, res, next) => {
  var err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

app.use((err: Error, req, res, next) => {
  res.status(err['status'] || 500);
  console.log(err);
  res.send({ ok: false, error: err });
});

export default app;
