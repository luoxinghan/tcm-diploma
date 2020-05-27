const express = require('express');
const router = express.Router();
const loginSql = require('../../dao/loginSql');
const resObject = require('../../jsonObject/loginResObject');
const dbTool = require('../../dao/databaseConnection');

router.post('/',(req, res)=>{
   let username = req.body.username;
   let password = req.body.password;
   dbTool.query(loginSql.getUserInfoByUserName,username,(err, result)=>{
       if(err){
           res.json(resObject).status(400);
           res.end();
           return 1;
       }
       else{
           if(result.length === 0){
               resObject.success = false;
               resObject.data.code = 400;
               resObject.data.message = "登录失败";
               resObject.data.isLogged = false;
               res.json(resObject).status(400);
               res.end();
               return 1;
           }
           else{
               resObject.success = true;
               resObject.data.code = 200;
               resObject.data.message = "登录成功";
               resObject.data.isLogged = true;
               resObject.data.currentUser.roleId = result[0].role;
               resObject.data.currentUser.imgUrl = result[0].avatar_url;
               resObject.data.currentUser.username = result[0].admin_account;
               resObject.data.currentUser.id = result[0].admin_id;
               res.json(resObject).status(200);
               res.end();
               return 1;
           }
       }
   });
});
module.exports = router;
