const dbTool = require('../dao/databaseConnection');
const doctorsSql = require('../dao/doctorsSql.json');
const doctorsResObject = require('../jsonObject/doctors');
const express = require('express');
function clearCache(doctorsResObject) {
    doctorsResObject.success = true;
    doctorsResObject.data.code = 200;
    doctorsResObject.data.doctors =[];
}
const doctorsRouter = express.Router();
doctorsRouter.get('/',(req, res)=>{
    dbTool.query(doctorsSql.getAllDoctors, (err, result)=>{
       if(err){
           doctorsResObject.success = false;
           doctorsResObject.data.code = 400;
           doctorsResObject.message  = "数据库查询出现错误，请检查sql语句";
           res.json(doctorsResObject);
           res.status(400).end();
           clearCache(doctorsResObject);
           return 1;
       }
       else{
            for(let i = 0; i < result.length; i++){
                var doctor = {
                    "employeeId": -1,
                    "roleId": -1,
                    "roleName": "",
                    "avatarUrl": "",
                    "name": "",
                    "sex": 1,
                    "phoneNum": "",
                    "birthday": "",
                    "address": "",
                    "employeeDescription": ""
                };
                doctor.employeeId = result[i].employee_id;
                doctor.roleId = result[i].role_id;
                doctor.roleName = "Лечащие врачи";
                doctor.avatarUrl = result[i].avatar_url;
                doctor.name = result[i].name;
                doctor.sex = result[i].sex;
                doctor.phoneNum = result[i].phone_num;
                doctor.birthday = result[i].date_of_birth;
                doctor.address = result[i].address;
                doctor.employeeDescription = result[i].employee_description;
                doctorsResObject.data.doctors.push(doctor);
            }
            doctorsResObject.success = true;
            doctorsResObject.data.code = 200;
            res.json(doctorsResObject);
            res.status(200).end();
            clearCache(doctorsResObject);
            return 1;
       }
    });
});

module.exports = doctorsRouter;
