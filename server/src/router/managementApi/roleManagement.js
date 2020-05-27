const express = require('express');
const roleManagementRouter = express.Router();
const sql = require('../../dao/roleManagementApiSql');
const requestHelper = require('request-promise');
const dbTool = require('../../dao/databaseConnection');
let resObject = {
  "success" : false,
  "data" : {
      "code" :400,
      "message" : "",
      "roles" : [],
  }
};
const options = {
    method: 'GET',
    url: 'http://localhost:3001/api/manage/containers/roles',
    json: true,
};
roleManagementRouter.get('/', (req, res)=>{
    let roleObject = {
      "roleId" : "",
      "roleName" : "",
    };
    let roles =[];
    dbTool.query(sql.getAllRecords, (err, result)=>{
       if(err){
           resObject.data.message = "数据库查询出现错误！！！请检查sql语句";
           res.json(resObject);
           res.status(400).end();
           return 1;
       }

       for(let i = 0; i < result.length; i++){
           var roleObject = {
               "roleId" : "",
               "roleName" : "",
           };
           roleObject.roleId = result[i].role_id;
           roleObject.roleName = result[i].role_name;
           roles.push(roleObject);
       }

       resObject.success = true;
       resObject.data.message = "Successfully obtained all records";
       resObject.data.code = 200;
       resObject.data.roles = roles;

       res.json(resObject);
       res.status(200).end();
        return 1;
    });
});
roleManagementRouter.post('/add', (req, res)=>{
    const roleName = req.body.roleName;
    if(roleName === undefined){
        resObject.data.message = "The parameter is invalid：roleName is null!!";
        res.json(resObject);
        res.status(400).end();
        return 1;
    }
    dbTool.query(sql.addRecord, roleName, (err)=>{
            if(err){
                resObject.data.message = "Database query error!! err info:" + err.toString();
                res.json(resObject);
                res.status(400).end();
                return 1;
            }
           else{
                requestHelper(options).then(function (response) {
                    resObject.data.roles = response.data.roles;
                    resObject.success = true;
                    resObject.data.message = "Successfully insert";
                    resObject.data.code = 200;
                    res.json(resObject);
                    res.status(200).end();
                    return 1;
                }).catch(function (err) {
                });

            }
        });
});
roleManagementRouter.post('/update', (req, res)=>{
    let roleObject = {
        "roleId" : req.body.roleId,
        "roleName" : req.body.roleName
    };
    if(roleObject.roleId !== undefined && roleObject.roleName !== undefined){
        dbTool.query(sql.updateRecord, [roleObject.roleName, roleObject.roleId], (err)=>{{
                if(err){
                    resObject.data.message = "Database update failed!!!";
                    res.json(resObject);
                    res.status(400).end();
                    return 1;
                }
                else{
                    requestHelper(options).then(function (response) {
                        resObject.data.roles = response.data.roles;
                        resObject.success = true;
                        resObject.data.message = "Successfully update in database!!";
                        resObject.data.code = 200;
                        res.json(resObject);
                        res.status(200).end();
                        return 1;
                    }).catch(function (err) {
                    });
                }
            }
        });
    }
    else{
        resObject.data.message = "The parameter is invalid!!";
        res.json(resObject);
        res.status(200).end();
        return 1;
    }
});
roleManagementRouter.post('/delete', (req, res)=>{

    if(req.body.roleId !== undefined){
        dbTool.query(sql.deleteRecord, req.body.roleId, (err)=>{{
            if(err){
                resObject.data.message = "Database delete failed!!!";
                res.json(resObject);
                res.status(400).end();
                return 1;
            }
            else{

                requestHelper(options).then(function (response) {
                    resObject.data.roles = response.data.roles;
                    resObject.success = true;
                    resObject.data.message = "Successfully delete from database!!";
                    resObject.data.code = 200;
                    res.json(resObject);
                    res.status(200).end();
                    return 1;
                }).catch(function (err) {
                });
            }
        }
        });
    }
    else{
        resObject.data.message = "The parameter is invalid!! roleId is empty!!";
        res.json(resObject);
        res.status(200).end();
        return 1;
    }
});

module.exports = roleManagementRouter;
