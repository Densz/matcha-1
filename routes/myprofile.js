const express = require('express');
const router = express.Router();
const model = require('../core/models/database');

router.get('/', async function(req, res, next){
    let db = await model.connectToDatabase();
    let info = await db.collection('users').findOne({login: req.session.login});

    res.render('myprofile', {
        layout: 'layout_nav',
        firstName: info['firstName'],
        lastName: info['lastName'],
        bio: info['bio'],
        title: 'Matcha - My profile'
    });
});

router.post('/editName', function(req, res, next) {
    let field = {login: req.session.login},
        item = {$set:{firstName: req.body.firstname.charAt(0).toUpperCase() + req.body.firstname.slice(1),
            lastName: req.body.lastname.charAt(0).toUpperCase() + req.body.lastname.slice(1)}};
    model.updateData('users', field, item);
    res.redirect('/myprofile');
});

router.post('/editBio', function(req, res, next) {
    let field = {login: req.session.login},
        item = {$set:{bio: req.body.bio}};
    model.updateData('users', field, item);
    res.redirect('/myprofile');
});

module.exports = router;