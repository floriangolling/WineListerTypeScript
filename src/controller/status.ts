import { Request, Response } from "express"
import { mods } from "./models"
import session from "express-session"
import flash from "express-flash"

export let Accueil = async function(req: Request, res: Response) {
    console.log('GET ACCUEIL');
    if (!req.session.email) {
        res.redirect('/login');
        req.flash('info','Veuillez vous connecter');
    }
    else {
        req.flash('Co','Se déconnecter');
        res.render('accueil');
    }
}

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

export let addVin = async function (req: Request, res: Response) {
    console.log('ADD');
    console.log(req.body);
    if (!req.session.email)
        res.redirect('/');
    else {
        await mods.Vine.create({ username: req.session.email, Quantity: req.body.quantity, Description: req.body.description, Name: req.body.name });
        console.log('vin bien rajouté');
        res.redirect('/vins');
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
        res.redirect('/stage');
    }
}

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

export let getRegister = async function (req: Request, res: Response) {
    if (!req.session.email) {
        console.log('GET LOGIN');
        res.render('login');
    } else {
        res.redirect('/')
    }
}

export let getLogin = async function (req: Request, res: Response) {
    if (!req.session.email) {
        console.log('GET LOGIN');
        res.render('login');
    } else {
        res.redirect('/')
    }
}

export let postLogin = async function (req: Request, res: Response) {
    console.log('POST LOGIN');
    console.log(req.body);
    const username = await mods.User.findOne({ where: { firstName: req.body.prenom }});
    if (username != null) {
        if (username.password == req.body.password) {
            console.log('correct password i let you in :)');
            req.session.email = req.body.prenom;
            req.session.password = req.body.password;
            res.redirect('/');
        } else {
            console.log('invalid password');
            req.flash('info','Mauvais mot de passe');
            res.redirect('/login');
        }
    } else {
        console.log('invalid account');
        req.flash('info',"Le compte n'existe pas");
        res.redirect('/login');
    }
}

export let postRegister = async function(req: Request, res: Response) {
    console.log('POST REGISTER');
    console.log(req.body);
    const found = await mods.User.findOne({ where: { firstName: req.body.prenom }});
    if (found == null) {
        console.log('le compte n existe pas et peut être créer');
        await mods.User.create({ firstName: req.body.prenom, password: req.body.password });
        res.redirect('/login')
    } else {
        console.log('le compte existe déjà');
        req.flash('info','Le compte existe déjà');
        res.render('register');
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