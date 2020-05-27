const dbTool = require('../dao/databaseConnection');
const adminSql = require('../dao/adminSql.json');
const adminManagementObject = require('../jsonObject/managementLogin');
const express = require('express');
const adminRouter = express.Router();

adminRouter.get('/login',(req, res)=> {
    const admin_account = req.query.username;
    const password = req.query.password;
    dbTool.query(adminSql.getAdminAllInfoById, admin_account, (err, result)=>{
        //数据库查询出现错误
        if(err){
            res.status(200).json({"success": false, "data":{"isLogged":false, "message":err.toString()}});

        }
        //查询成功，参数与查询结果进行匹配的各种情况
        else{
            //查询结果为空，数据库中没有这个用户名的用户
            if(result.length <= 0){
                res.status(200).json({"success": true, "data":{"isLogged":false, "message":"Username not exist in DB!!"}});
            }
            //查询成功，结果不为空，但是密码不匹配
            else if(result[0]['password'] !== password){
                res.status(200).json({"success": true, "data":{"isLogged":false, "message":"Password incorrect!!"}});
            }
            //查询成功，结果不为空，密码匹配
            else{
                adminManagementObject.success = true;
                adminManagementObject.data.code = 200;
                adminManagementObject.data.message ="登录成功";
                adminManagementObject.data.isLogged = true;
                adminManagementObject.data.currentUser.id = result[0]['admin_id'];
                adminManagementObject.data.currentUser.username = result[0]['admin_account'];
                adminManagementObject.data.currentUser.roleId = result[0]['role'];
                adminManagementObject.data.currentUser.imgUrl = result[0]['avatar_url'];
                res.status(200).json(adminManagementObject);
                res.end();
                return 1;
            }
        }
    });

});

module.exports = adminRouter;

