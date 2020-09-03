import express from "express"
import * as Controller from '../controller/page'

export let pageRouter = express.Router();

pageRouter.get('/login', Controller.getLogin);

pageRouter.get('/', Controller.Accueil);

pageRouter.post('/login', Controller.postLogin);

pageRouter.get('/register', Controller.getRegister);

pageRouter.post('/register', Controller.postRegister);

pageRouter.get('/logout', Controller.logout);