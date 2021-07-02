const express = require('express');
const router = express.Router();
const usersService = require('../../services/users.service')

router.get('/users', async (req, res, next) => {
    try{
        const users = await usersService.getAll()
        return res.json(users)
    }   
    catch(err){
        console.log(err)
    }
});
router.get('/users/admin', async (req, res, next) => {
    try{
        const users = await usersService.getAllAdmin()
        return res.json(users)
    }   
    catch(err){
        console.log(err)
    }
});
router.get('/users/agency', async (req, res, next) => {
    try{
        const users = await usersService.getAllAgency()
        res.json(users)
    }   
    catch(err){
        console.log(err)
    }
});


router.get('/users/byBelongTo', async (req, res, next)=> {
    try{
        const { userId } = req.session
        if(!userId){
            return res.json([])
        }
        const user = await usersService.getByBelongTo(userId)
        return res.json(user)
    }   
    catch(err){
        console.log(err)
    }
});
router.get('/users/:id', async (req, res, next)=> {
    try{
        const id = req.params.id
        const user = await usersService.getById(id)
        return res.json(user)
    }   
    catch(err){
        console.log(err)
    }
});
//for mobile
router.post('/users/login', async (req, res, next) => {
    try{
        let values = req.body;
        
        const user = await usersService.login(values);
        if(user.error === 'User not found'){
            return res.status(404).json({success: false, msg: user.error})
        }else if(user.error === 'Password error !!!'){
            return res.status(401).json({success: false, msg: user.error})
        }else{
            const jwt = require('jsonwebtoken')
            let token = jwt.sign({ username: user.username }, process.env.KEY)
            return res.json({success: true, token: token})
        }
    }catch(err){
        console.log(err)
    }
})

module.exports = router;