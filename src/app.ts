import express = require("express");
import * as Controller from './controller/status'
import { mods } from "./controller/models"
import bodyParser from "body-parser";
import path, { join } from "path"
import session from "express-session"
import flash from "express-flash"

let urlencodedParser = bodyParser.urlencoded({ extended: false });
const app = express();

app.set("port", process.env.PORT || 8080);
app.use(urlencodedParser);

app.set('views', path.join( __dirname, '../src/' ,'views'));
app.set("view engine", "jade")
app.use(flash());
app.use("/", express.static(path.join(__dirname, "./../public")));
app.use("/", express.static(path.join(__dirname, '../', "views")));
app.use("/axios", express.static(__dirname + '/' + 'node_modules/axios/dist/'))
app.use(session({secret: 'ssshhhhh',
                resave: false,
                saveUninitialized: false })
);

app.get('/', Controller.Accueil);
app.get('/vins', Controller.getVin);
app.get('/stage', Controller.getStage);
app.post('/add', Controller.addVin);
app.get('/add', Controller.getAddVin)
app.post('/addstage', Controller.addStage);
app.post('/add2/:name/:description/:quantity', Controller.addVinID);
app.get('/login', Controller.getLogin);
app.post('/login', Controller.postLogin);
app.get('/addstage', Controller.getAddStage)

export default app;