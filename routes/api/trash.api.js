const express = require('express');
const router = express.Router();
const trashService = require('../../services/trash.service')
const usersService = require('../../services/users.service')
//trash certificate personal
router.get('/digital-certificate/personal/trash/agency1', async (req, res, next)=> {
    try{
        const { userId } = req.session
        const agencyList = await usersService.getByBelongTo(userId)
        const result = []
        for(let i=0; i<agencyList.length; i++){
            let CTSCaNhan = await trashService.getByTrashUserId(agencyList[i]._id)
            if(CTSCaNhan.length==1){
                result.push(...CTSCaNhan)
            }else if(CTSCaNhan.length!=0){
                CTSCaNhan.map(cts=>{
                    result.push(cts)
                })
            }
        }
        return res.json(result)
    }   
    catch(err){
        console.log(err)
    }
});
router.get('/digital-certificate/personal/trash/byUserId', async (req, res, next)=> {
    try{
        const { userId } = req.session
        const CTSCaNhan = await trashService.getByTrashUserId(userId)
        return res.json(CTSCaNhan)
    }   
    catch(err){
        console.log(err)
    }
});
//trash certificate organization
router.get('/digital-certificate/organization/trash/agency1', async (req, res, next)=> {
    try{
        const { userId } = req.session
        const agencyList = await usersService.getByBelongTo(userId)
        const result = []
        for(let i=0; i<agencyList.length; i++){
            let CTSDoanhNghiep = await trashService.getByTrashUserIdOrg(agencyList[i]._id)
            if(CTSDoanhNghiep.length==1){
                result.push(...CTSDoanhNghiep)
            }else if(CTSDoanhNghiep.length!=0){
                CTSDoanhNghiep.map(cts=>{
                    result.push(cts)
                })
            }
        }
        return res.json(result)
    }   
    catch(err){
        console.log(err)
    }
});
router.get('/digital-certificate/organization/trash/byUserId', async (req, res, next)=> {
    try{
        const { userId } = req.session
        const CTSDoanhNghiep = await trashService.getByTrashUserIdOrg(userId)
        return res.json(CTSDoanhNghiep)
    }   
    catch(err){
        console.log(err)
    }
});

module.exports = router;