const jwt = require('jsonwebtoken');

module.exports.checkAuthencation = function(req, res, next){
    try{
        let auth = req.headers.authorization
        let token = auth.split(' ')[1]
        if(!token){
            console.log('Token not found')
            return res.json({success:false, msg:'Unauthorized'})
        }else{
            jwt.verify(token, process.env.KEY, (err, decode)=>{
                if(!err){
                    return res.json({success:true, data: decode, msg:'Authorized'})
                }else{
                    return res.json({success:false, msg:'Unauthorized'})
                }
            })
          
        }
    }catch(err){
        console.log('Token verify failed')
        return res.json({success:false, msg:'Unauthorized'})
    }
}
module.exports.checkLoginMobile = function(req, res, next){
    try{
        let auth = req.headers.authorization
        let token = auth.split(' ')[1]
        if(!token){
            console.log('Token not found')
            return res.json({success:false, msg:'Unauthorized'})
        }else{
            jwt.verify(token, process.env.KEY, (err, decode)=>{
                if(!err){
                    return res.json({success:false, msg:'Unauthorized'})
                }else{
                    next()
                }
            })
          
        }
    }catch(err){
        console.log('Token verify failed')
        return res.json({success:false, msg:'Unauthorized'})
    }
}