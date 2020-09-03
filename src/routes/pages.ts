import express from "express"
import * as Controller from '../controller/page'

//exporting the page router
export let pageRouter = express.Router();

//Get the login page
pageRouter.get('/login', Controller.getLogin);

//Get the accueil page
pageRouter.get('/', Controller.Accueil);

//POST login page
pageRouter.post('/login', Controller.postLogin);

//Get the register page
pageRouter.get('/register', Controller.getRegister);

//Post the register page
pageRouter.post('/register', Controller.postRegister);

//Get the logout route
pageRouter.get('/logout', Controller.logout);