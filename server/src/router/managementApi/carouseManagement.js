const express = require('express');
const router = express.Router();
const dbTool = require('../../dao/databaseConnection');
const managementSql = require('../../dao/carouseManagementSql');
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
        "carousels" : []
    }
}
router.get('/', (req, res)=>{
    let getCarousesSql = managementSql.getAllRecords;
    dbTool.query(getCarousesSql, (err, result )=>{
        if(err){
            resObject.data.message = err.toString();
            res.json(resObject);
            res.status(400).end();
            return 1;
        }
        else{
            let carouses = [];
            for(let i = 0; i < result.length; i++){
                let object = {
                    "fileId" : '',
                    "fileType" : '',
                    "filePath" : '',
                    "order" : '',
                };
                object.fileId = result[i].file_id;
                object.fileType = result[i].file_type;
                object.filePath = result[i].file_path;
                object.order = result[i].order;
                carouses.push(object);
            }
            resObject.success = true;
            resObject.data.code = 200;
            resObject.data.message = "Successfully get all records!!";
            resObject.data.carousels = carouses;
            res.json(resObject);
            res.end();
            return 1;
        }
    });
});
router.post('/add',(req,res)=>{
    let object = {
      "fileId" : null,
      "fileType" : req.body.fileType,
      "filePath" : req.body.filePath,
      "order" : req.body.order,
      "uploadTime" : new Date()
    };

    dbTool.query(managementSql.insertRecord, [object.fileType, object.filePath, object.order, object.uploadTime], (err)=>{
            if(err){
                console.log(err);
                resObject.data.message = "Failed when insert record into file table!! err info:" + err.toString();
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
                       object.fileId = result[0].file_id;
                       resObject.success = true;
                       resObject.data.code = 200;
                       resObject.data.message = "Insert records into file table succeed!!";
                       resObject.data.carousel = object;
                       res.json(resObject);
                       res.end();
                       return 1;
                   }
                });
            }
    });
});
router.post('/delete', (req, res)=>{
    const fileId = req.body.fileId;
    if(fileId !== undefined){
        dbTool.query(managementSql.deleteRecord, fileId, (err)=>{
            if(err){
                resObject.data.message = "Failed when delete record from file table!! err info:" + err.toString();
                res.json(resObject);
                res.status(400).end();
                return 1;
            }
            else{
                resObject.success = true;
                resObject.data.code = 200;
                resObject.data.message = "Delete a record from file table succeed!!";
                resObject.data.carousel = null;
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
        "fileId" : '',
        "fileType" : '',
        "filePath" : '',
        "order" : '',
        "uploadTime" : ''
    };
    if(req.body.fileId !== undefined && req.body.fileType !== undefined && req.body.filePath !== undefined && req.body.order !== undefined){
        object.fileId = req.body.fileId;
        object.fileType = req.body.fileType;
        object.filePath = req.body.filePath;
        object.order = req.body.order;
        object.uploadTime = new Date();
        dbTool.query(managementSql.updateRecord, [object.fileType, object.filePath, object.order, object.uploadTime, object.fileId],(err)=>{
            if(err){
                console.log(err);
                resObject.data.message = "Failed when update record within  file table!! err info:" + err;
                res.json(resObject);
                res.status(400).end();
                return 1;
            }
           else{
                resObject.success = true;
                resObject.data.code = 200;
                resObject.data.message = "Update records into file table and rel_article_menu table succeed!!";
                resObject.data.carousel = object;
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
