import { Request, Response } from "express"
import { mods } from "./models"
import session from "express-session"
import flash from "express-flash"

//Route de l'accueil
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

//Register Route
export let getRegister = async function (req: Request, res: Response) {
    if (!req.session.email) {
        console.log('GET LOGIN');
        res.render('login');
    } else {
        res.redirect('/')
    }
}

//Login Route
export let getLogin = async function (req: Request, res: Response) {
    if (!req.session.email) {
        console.log('GET LOGIN');
        res.render('login');
    } else {
        res.redirect('/')
    }
}

//Post Login Route
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

//Post Register Route
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
        res.render('/register');
    }
}

//Logout Route
export let logout = async function(req: Request, res: Response) {
    console.log('POST LOGOUT');
    console.log('loggin out');
    req.session.destroy(function(err) {
        if(err){
           console.log(err);
        }else{
            console.log(req.session.email);
            res.redirect('/');
        }
    })
}