import express from "express"
import * as Controller from '../controller/vine'

export let vineRouter = express.Router();

vineRouter.get('/vins', Controller.getVin);

vineRouter.post('/add', Controller.addVin);

vineRouter.get('/add', Controller.getAddVin);

vineRouter.post('/add2/:name/:description/:quantity', Controller.addVinID);

vineRouter.put('/m/:id', Controller.VinMinus);

vineRouter.put('/p/:id', Controller.VinPlus);

vineRouter.delete('/:id', Controller.VinRemove);