import express = require("express");
import { mods } from "./controller/models"
import bodyParser from "body-parser";
import path, { join } from "path";
import session from "express-session";
import flash from "express-flash";
import { Routers } from "./routes";

//create app from express
const app = express();
let urlencodedParser = bodyParser.urlencoded({ extended: false });

//setting up port 8080 or Process.env.PORT if possible
//and using every dependencies of the app (flash jade etc..)
app.set("port", process.env.PORT || 8080);
app.use(urlencodedParser);
app.set('views', path.join( __dirname, '../src/' ,'views'));
app.set("view engine", "jade");
app.use(flash());
app.use("/", express.static(path.join(__dirname, "./../public")));
app.use("/", express.static(path.join(__dirname, '../', "views")));
app.use("/axios", express.static(__dirname + '/../' + 'node_modules/axios/dist/'));
app.use(session({secret: 'ssshhhhh', resave: false, saveUninitialized: false }));

// Using routers, one for each component of the app.
app.use("/", Routers.pageRouter);
app.use("/vin/", Routers.vineRouter);
app.use("/stage/", Routers.stageRouter);

//exporting the app for others files.
export default app;