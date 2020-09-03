import express from "express"
import * as Controller from '../controller/vine'

//exporting the Vine Router
export let vineRouter = express.Router();

//Get all vine page
vineRouter.get('/vins', Controller.getVin);

//POST a new vine
vineRouter.post('/add', Controller.addVin);

//GET the add vine page
vineRouter.get('/add', Controller.getAddVin);

//ADD a new vine using the /vine page
vineRouter.post('/add2/:name/:description/:quantity', Controller.addVinID);

//Route to -1 a vine id
vineRouter.put('/m/:id', Controller.VinMinus);

//Route to +1 a vine id
vineRouter.put('/p/:id', Controller.VinPlus);

//Route to delete a vine
vineRouter.delete('/:id', Controller.VinRemove);