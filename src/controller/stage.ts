import { Request, Response } from "express"
import { mods } from "./models"
import session from "express-session"
import flash from "express-flash"

export let getStage = async function (req: Request, res: Response) {
    console.log('STAGE GET');
    if (!req.session.email) {
        req.flash('info','Veuillez vous connecter');
        res.redirect('/login');
    } else {
        const sta = await mods.Stage.findAll({ where: { username: req.session.email }});
        if (sta == null)
            res.redirect('/addstage');
        else {
            req.flash('Co','Se déconnecter');
            res.render('stage', {Stages: sta});
        }
    }
}

export let rmStage = async function(req: Request, res: Response) {
    console.log('RM');

    if (!req.session.email)
        res.redirect('/');
    else {
        let send = await mods.Stage.destroy({ where: { username: req.session.email, id: req.params.id }} )
        console.log('stage bien supprimé');
        res.sendStatus(200)
    }
}

export let addStage = async function (req: Request, res: Response ) {
    console.log('ADD STAGE');
    console.log(req.body);
    if (!req.session.email)
        res.redirect('/');
    else {
        await mods.Stage.create({ username: req.session.email, Week: req.body.week, Description: req.body.description});
        console.log('vin bien rajouté');
        res.redirect('/stage/stage');
    }
}

export let getAddStage = async function(req: Request, res: Response) {
    console.log('GET ADD');
    if (!req.session.email) {
        req.flash('info','Veuillez vous connecter');
        res.redirect('/login');
    } else {
        req.flash('Co','Se déconnecter');
        res.render('addstage');
    }
}