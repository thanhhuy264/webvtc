const usersService = require('../services/users.service');

module.exports.authencation = async (req, res, next)=> {
    res.render('authentication',{ title: 'Đăng nhập', message:req.session.message })
}


module.exports.add = async (req, res, next)=> {
    try{
       let values = req.body
       await usersService.createNew(values)
       res.status(200).redirect('/')
    }
    catch(err){
        console.log(err)
    }
}

module.exports.update = async (req, res, next) => {
    try{
        const id = req.params.id;
        let values = req.body;
       
        await usersService.update(id, values);
        res.redirect('/users')
    }
    catch(err){
        console.log(err)
    }

}
module.exports.changePassword = async (req, res, next) => {
    try{
        const id = req.params.id;
        let values = req.body;
       
        await usersService.changePassword(id, values);
        res.redirect('/users')
    }
    catch(err){
        console.log(err)
    }

}
module.exports.login = async (req, res, next) => {
    try{
        let values = req.body;
        const user = await usersService.login(values);
        if(values.username.trim().length==0 || values.password.trim().length==0){
            req.session.message = 'Tài khoản hoặc mật khẩu không được trống!'
            return res.redirect('/users/login')
        }
        if(user.error === 'User not found'){
            req.session.message = 'Tài khoản không tồn tại!'
            return res.redirect('/users/login')
        }else if(user.error === 'Password error !!!'){
            req.session.message = 'Sai mật khẩu!'
            return res.redirect('/users/login')
        }else{
            const jwt = require('jsonwebtoken')
            let token = jwt.sign({ username: user.username }, process.env.KEY,{
                expiresIn: '24h' /*<---- this is 24h */
            }, (err, token) => {
                if (err) {
                    console.log('Token sign failed');
                }else{
                    req.session.token = token
                    req.session.userId = user._id
                    req.session.role = user.role
                    res.redirect('/')
                }
            }) 
        }
    }
    catch(err){
        console.log(err)
    }
}
module.exports.logout = (req, res, next) => {
    res.clearCookie('connect.sid', { path: '/' })
    res.redirect('/users/login')
}
