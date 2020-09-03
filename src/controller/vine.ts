import { Request, Response } from "express"
import { mods } from "./models"
import session from "express-session"
import flash from "express-flash"

//Get all vine page
export let getVin = async function (req: Request, res: Response) {
    console.log('VINE GET');
    if (!req.session.email) {
        req.flash('info','Veuillez vous connecter');
        res.redirect('/login');
    } else {
        const vine = await mods.Vine.findAll({ where: { username: req.session.email }, order: [
            ['id', 'ASC'],
        ]});
        if (vine == null)
            res.redirect('/add');
        else {
            console.log('les vins sont bien trouvés');
            req.flash('Co','Se déconnecter');
            res.render('vins', {Vines: vine});
        }
    }
}

//POST a new vine
export let addVin = async function (req: Request, res: Response) {
    console.log('ADD');
    console.log(req.body);
    if (!req.session.email)
        res.redirect('/');
    else {
        await mods.Vine.create({ username: req.session.email, Quantity: req.body.quantity, Description: req.body.description, Name: req.body.name });
        console.log('vin bien rajouté');
        res.redirect('/vin/vins');
    }
}

//POST a new vine on the /vine page
export let addVinID = async function (req: Request, res: Response) {
    console.log('ADD');
    if (!req.session.email)
        res.redirect('/');
    else {
        let newvine = await mods.Vine.create({ username: req.session.email, Quantity: req.params.quantity, Description: req.params.description, Name: req.params.name });
        console.log('vin bien rajouté');
        res.send(newvine);
    }
}

//Get the page to add new vine
export let getAddVin = async function(req: Request, res: Response) {
    console.log('GET ADD');
    if (!req.session.email) {
        req.flash('info','Veuillez vous connecter');
        res.redirect('/login');
    } else {
        req.flash('Co','Se déconnecter');
        res.render('add');
    }
}

//Remove 1 vine from ID UPDATE
export let VinMinus = async function(req: Request, res: Response) {
{
    console.log('MINUS');
    if (!req.session.email)
        res.redirect('/');
    else {
        const thisone = await mods.Vine.findOne({ where: { username: req.session.email, id: req.params.id }} )
        console.log(thisone);
        let quan = thisone.Quantity - 1;
        if (quan < 0)
            quan = 0;
        console.log('NEW QUANTITY =' + quan)
        let send = await mods.Vine.update({ Quantity: quan }, {where:{ id: req.params.id, username: req.session.email }})
        console.log('vin bien réduit');
        res.sendStatus(200)
    }
    }
}

//Delete a vine
export let VinRemove = async function(req: Request, res: Response) {
    console.log('RM');

    if (!req.session.email)
        res.redirect('/');
    else {
        let send = await mods.Vine.destroy({ where: { username: req.session.email, id: req.params.id }} )
        console.log('vin bien supprimé');
        res.sendStatus(200)
    }
}

//add a new vine from ID UPDATE
export let VinPlus = async function(req: Request, res: Response) {
    console.log('PLUS');
    console.log(req.body);
    if (!req.session.email)
        res.redirect('/');
    else {
        const thisone = await mods.Vine.findOne({ where: { username: req.session.email, id: req.params.id }} )
        console.log(thisone);
        let quan = thisone.Quantity + 1;
        console.log('NEW QUANTITY =' + quan)
        let send = await mods.Vine.update({ Quantity: quan }, {where:{ id: req.params.id, username: req.session.email }})
        console.log('vin bien ajouté');
        console.log('username =' + req.session.email);
        res.sendStatus(200)
    }
}