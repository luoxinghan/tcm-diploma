const express = require('express');
const router = express.Router();
const formatter  = require('../../tools/timeFormat.js');
const dbTool = require('../../dao/databaseConnection');
const managementSql = require('../../dao/staffManagementSql');
function parametersInvalid(res){
    resObject.data.message = "Parameters are not valid!!1";
    res.json(resObject);
    res.status(400).end();
    return 1;
}
let resObject = {
    "success" : false,
    "data" : {
        "code" : 400,
        "message" : "",
        "staffs" : []
    }
};
router.get('/', (req, res)=>{
    let getEmployeeSql = managementSql.getAllRecords;
    dbTool.query(getEmployeeSql, (err, result )=>{
        if(err){
            resObject.data.message = err.toString();
            res.json(resObject);
            res.status(400).end();
            return 1;
        }
        else{
            let employees = [];
            for(let i = 0; i < result.length; i++){
                let object = {
                    employeeId: null,
                    roleId: null,
                    roleName: null,
                    avatarUrl: null,
                    name: null,
                    sex: null,
                    phoneNum: null,
                    birthday: null,
                    address: null,
                    employeeDescription: null
                };
                object.employeeId = result[i].employee_id;
                object.roleId = result[i].role_id;
                object.roleName = result[i].role_name;
                object.avatarUrl = result[i].avatar_url;
                object.name = result[i].name;
                object.sex = result[i].sex;
                object.phoneNum = result[i].phone_num;
                // const date_of_birth = new Date(result[i].date_of_birth.toString());
                // object.birthday = date_of_birth.getFullYear() + '-' + date_of_birth.getMonth() + '-' + date_of_birth.getDate();
                if (result[i].date_of_birth !== null) {
                    object.birthday = formatter(result[i].date_of_birth.toString(), false);
                }
                object.address = result[i].address;
                object.employeeDescription = result[i].employee_description;
                employees.push(object);
            }
            resObject.success = true;
            resObject.data.code = 200;
            resObject.data.message = "Successfully get all records!!";
            resObject.data.staffs = employees;
            res.json(resObject);
            res.end();
            return 1;
        }
    });
});
router.post('/add',(req,res)=>{
    let object = {
        employeeId: null,
        roleId: req.body.roleId,
        roleName: null,
        avatarUrl: req.body.avatarUrl,
        name: req.body.name,
        sex: req.body.sex,
        phoneNum: req.body.phoneNum,
        birthday: req.body.birthday,
        address: req.body.address,
        employeeDescription: req.body.employeeDescription
    };
    const year = object.birthday.substr(0,4);
    const month = object.birthday.substr(5,2);
    const day = object.birthday.substr(8,2);
    const birthDay = new Date(year, month, day, 0, 0, 0, 0);
    object.birthday = birthDay;
    dbTool.query(managementSql.addRecord, [object.roleId, object.avatarUrl, object.name, object.sex, object.phoneNum, object.birthday, object.address, object.employeeDescription], (err)=>{
        if(err){
            console.log(err);
            resObject.data.message = "Failed when insert record into employee table!! err info:" + err.toString();
            res.json(resObject);
            res.status(400).end();
            return 1;
        }
        else{
            dbTool.query(managementSql.getMaxId, (err, result)=>{
                if(err){
                    resObject.data.message = "Failed when get max file id from file table!! err info:" + err.toString();
                    res.json(resObject);
                    res.status(400).end();
                    return 1;
                }
                else{
                    object.employeeId = result[0].employee_id;
                    dbTool.query(managementSql.getRoleName, object.roleId, (err, result)=>{
                        if(err){
                            resObject.data.message = "Failed when get role name from role table!! err info:" + err.toString();
                            res.json(resObject);
                            res.status(400).end();
                            return 1;
                        }
                        else{
                            object.roleName = result[0].role_name;
                            resObject.success = true;
                            resObject.data.code = 200;
                            resObject.data.message = "Insert records into employee table succeed!!";
                            resObject.data.staff = object;
                            res.json(resObject);
                            res.end();
                            return 1;
                        }
                    });
                }
            });
        }
    });
});
router.post('/delete', (req, res)=>{
    const employeeId = req.body.employeeId;
    if(employeeId !== undefined){
        dbTool.query(managementSql.deleteRecord, employeeId, (err)=>{
            if(err){
                resObject.data.message = "Failed when delete record from employee table!! err info:" + err.toString();
                res.json(resObject);
                res.status(400).end();
                return 1;
            }
            else{
                resObject.success = true;
                resObject.data.code = 200;
                resObject.data.message = "Delete a record from employee table succeed!!";
                resObject.data.staff = null;
                res.json(resObject);
                res.status(200).end();
                return 1;
            }
        });
    }
    else{
        parametersInvalid(res);
    }
});
router.post('/update', (req, res)=>{
    let object = {
        employeeId: null,
        roleId: null,
        roleName: null,
        avatarUrl: null,
        name: null,
        sex: null,
        phoneNum: null,
        birthday: null,
        address: null,
        employeeDescription: null
    };
    if(req.body.employeeId !== undefined){
        object.employeeId = req.body.employeeId;
        object.roleId = req.body.roleId;
        object.roleName = req.body.roleName;
        object.avatarUrl = req.body.avatarUrl;
        object.name = req.body.name;
        object.sex = req.body.sex;
        object.phoneNum = req.body.phoneNum;
        object.birthday = req.body.birthday;
        object.address = req.body.address;
        object.employeeDescription = req.body.employeeDescription;
        dbTool.query(managementSql.updateRecord, [object.roleId, object.avatarUrl, object.name, object.sex,
            object.phoneNum, object.birthday, object.address, object.employeeDescription, object.employeeId],(err)=>{
            if(err){
                console.log(err);
                resObject.data.message = "Failed when update record within employee table!! err info:" + err;
                res.json(resObject);
                res.status(400).end();
                return 1;
            }
            else{
                resObject.success = true;
                resObject.data.code = 200;
                resObject.data.message = "Update records into file table and rel_article_menu table succeed!!";
                resObject.data.staff = object;
                res.json(resObject);
                res.status(200).end();
                return 1;
            }
        })
    }
    else{
        parametersInvalid(res);
    }
});

module.exports = router;
