const { log } = require('debug');
const usersModel = require('../models/users.model')

exports.getAll = async () => {
    try{
        const users = await usersModel.find({});
        return users
    }
    catch(err){
        console.log(err)
    }
}
exports.getAllAdmin = async () => {
    try{
        const users = await usersModel.find({$or:[{role: 0},{role:1}]});
        return users
    }
    catch(err){
        console.log(err)
    }
}
exports.getAllAgency = async () => {
    try{
        const users = await usersModel.find({$or:[{role: 2},{role:3}]});
        return users
    }
    catch(err){
        console.log(err)
    }
}


exports.getById = async (id) => {
    try{
        const user = await usersModel.findById(id);
        return user
        
    }
    catch(err){
        console.log(err)
    }
}

exports.findByUsername = async (username, role, userId, listAgency) => {
    if(role==0){
        const user = await usersModel.find({username: username})
        if(user.length==0) return []
        return user
    }else if(role==1){
        let listUser = []
        listAgency.forEach(user=>{
            let temp = { belongTo: user._id }
            listUser.push(temp)
        })
        listUser.push({ belongTo: userId})
        const user = await usersModel.find({username: username,$or:listUser})
        if(user.length==0) return []
        return user
    }else if(role==2){
        const user = await usersModel.find({username: username,belongTo: userId})
        if(user.length==0) return []
        return user

    }else return []
}
exports.getByUsername = async (username) => {
    try{
        const user = await usersModel.find({username:username});
        return user
    }
    catch(err){
        console.log(err)
    }
}
exports.getByBelongTo = async (userId) => {
    try{
        const users = await usersModel.find({belongTo:userId});
        return users
    }
    catch(err){
        console.log(err)
    }
}

exports.createNew = async (values) => {
    try{
        const bcrypt = require("bcrypt");      
        var salt = bcrypt.genSaltSync(10);
        const hoTen = values.hoTen
        const email = values.email
        const username = values.username
        const password = values.password
        const soDienThoai = values.soDienThoai
        const diaChi = values.diaChi
        const tinhThanhID = values.tinhThanhID
        const role = values.role
        const tenDaiLy = values.tenDaiLy
        const belongTo = values.belongTo
    
        const passwordHashed = bcrypt.hashSync(password, salt);
        let newUser = new usersModel({
                hoTen,
                email,
                username,
                password:passwordHashed,
                soDienThoai,
                diaChi,
                tinhThanhID,
                role,
                tenDaiLy,
                belongTo
        })
        return newUser.save((err) => {
            if(err){
                console.log(err)
                console.log('Add user fail!');
            }else{
                console.log('Add user success!');
            }
        })
    }
    catch(err){
        console.log(err)
    }

}
exports.update = async (id, inputValues) => {
    const hoTen = inputValues.hoTen
    const email = inputValues.email
    const soDienThoai = inputValues.soDienThoai
    const gender = inputValues.gender
    const diaChi = inputValues.diaChi

    const values = { hoTen, email, soDienThoai, gender, diaChi }
    
    return await usersModel.findByIdAndUpdate({_id:id},values, function(err){
        if(err){
            console.log('Update failed!')
            return false
        }else {
            console.log('Update success!')
            return true
        }
    })
}

exports.updateCMNDFront = async (id, img) => {
    return await usersModel.findByIdAndUpdate({_id:id}, {CMNDFront: img}, function(err){
        if(err){
            console.log('Update failed!')
            return {success: false}
        }else {
            console.log('Update success!')
            return {success: true, img: img}
        }
    })
}
exports.getCMND = async (id) => {
    return await usersModel.findByIdAndUpdate({_id:id})
}
exports.updateCMNDBack = async (id, img) => {
    return await usersModel.findByIdAndUpdate({_id:id}, {CMNDAfter: img}, function(err){
        if(err){
            console.log('Update failed!')
            return {success: false}
        }else {
            console.log('Update success!')
            return {success: true, img: img}
        }
    })
}
exports.updateCMNDInfo = async (id, values) => {
    return await usersModel.findByIdAndUpdate({_id:id}, values, function(err){
        if(err){
            console.log('Update failed!')
            return {success: false}
        }else {
            console.log('Update success!')
            return {success: true}
        }
    })
}
exports.changeStatus = async (id, inputValues) => {

    return await usersModel.findByIdAndUpdate({_id:id},inputValues, function(err){
        if(err){
            console.log('Update failed!')
        }else console.log('Update success!')
    })
}
module.exports.changePassword = async (id, inputValues) =>{
    const bcrypt = require("bcrypt");      
    var salt = bcrypt.genSaltSync(10);
    const password = inputValues.password;

    const passwordHashed = bcrypt.hashSync(password, salt);

    const newPassword = passwordHashed 

    return await usersModel.findByIdAndUpdate({_id:id}, {password: newPassword}, function(err){
        if(err){
            console.log('Update failed!')
            return false
        }else {
            console.log('Update success!')
            return true
        }
    })
}
module.exports.login = async (values) =>{
    try{
        const { username ,password } = values
        const user = await usersModel.findOne({username:username})
        if(!user){
            return {success: false, error:'User not found'}
        }else {
            const bcrypt = require("bcrypt");        
            const password_db = user.password
            const passwordCompared = bcrypt.compareSync(password, password_db)
            if(!passwordCompared){
                return {success: false, error:'Password error'}
            }else if(user.isActive==false){
                return {success: false, error:'Account is not active'}
            }else{
                return user
            }
        }
    }catch(err){
        console.log(err)
    }
}
