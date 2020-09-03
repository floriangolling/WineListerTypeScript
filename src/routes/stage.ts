import express from "express"
import * as Controller from '../controller/stage'

export let stageRouter = express.Router();

stageRouter.get('/stage', Controller.getStage);

stageRouter.post('/addstage', Controller.addStage);

stageRouter.get('/addstage', Controller.getAddStage);

stageRouter.delete('/:id', Controller.rmStage);