const express = require('express');
const router = express.Router();

const controllerUsers = require('../controllers/users.controller')
const middlewares = require('../middlewares/authencation')


router.get('/users/login', controllerUsers.authencation)
router.post('/users/login', controllerUsers.login)
router.get('/users/logout', controllerUsers.logout)
router.get('/manage-account',middlewares.checkAuthencation, function(req, res,next){
    res.render('manage-account')
})
router.post('/users/add',middlewares.checkAuthencation, controllerUsers.add)
router.put('/users/edit/:id', middlewares.checkAuthencation, controllerUsers.update)
router.put('/users/change-password/:id', middlewares.checkAuthencation, controllerUsers.changePassword)

module.exports = router;