import express from "express"
import * as Controller from '../controller/stage'

//export the stage router
export let stageRouter = express.Router();

//Get all the stage on stage page
stageRouter.get('/stage', Controller.getStage);

//Post a new stage to the table
stageRouter.post('/addstage', Controller.addStage);

//get the page to add a new stage
stageRouter.get('/addstage', Controller.getAddStage);

//Route to delete a existing stage
stageRouter.delete('/:id', Controller.rmStage);