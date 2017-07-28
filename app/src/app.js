"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const index_1 = require("./routes/index");
const ejs = require("ejs");
const cors = require("cors");
const protect = require('@risingstack/protect');
const app = express();
const Knex = require("knex");
const jwt_1 = require("./models/jwt");
const jwt = new jwt_1.Jwt();
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.renderFile);
app.set('view engine', 'html');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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
    let token = null;
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1];
    }
    else if (req.query && req.query.token) {
        token = req.query.token;
    }
    else {
        token = req.body.token;
    }
    jwt.verify(token)
        .then((decoded) => {
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
};
let dbConnection = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true
};
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
app.use('/', index_1.default);
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});
app.use((err, req, res, next) => {
    res.status(err['status'] || 500);
    console.log(err);
    res.send({ ok: false, error: err });
});
exports.default = app;
//# sourceMappingURL=app.js.map