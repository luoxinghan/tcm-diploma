const express = require('express');
const formatter = require('../../tools/timeFormat.js');
const router = express.Router();
const dbTool = require('../../dao/databaseConnection');
const managementSql = require('../../dao/momentsManagementSql');
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
        "moments" : []
    }
};
function clearCache(object){
    object.success = false;
    object.data.code = 400;
    object.message = '';
    object.moments = [];
}
router.get('/', (req, res)=>{
    let getIsShow = req.query.getIsShowmoemnt;
    let getMomentsSql = '';
    if(getIsShow === "true"){
        getMomentsSql = managementSql.getIsShowMoment;
    }
    else{
        getMomentsSql = managementSql.getAllRecords;
    }
    dbTool.query(getMomentsSql, (err, result )=>{
        if(err){
            resObject.data.message = err.toString();
            res.json(resObject);
            res.status(400).end();
            return 1;
        }
        else{
            let moments = [];
            for(let i = 0; i < result.length; i++){
                let object = {
                    momentId: 2,
                    momentTitle: null,
                    momentContent: null,
                    publishedTime: null,
                    isShow: null
                };
                object.momentId = result[i].moment_id;
                object.momentTitle = result[i].moment_title;
                object.momentContent = result[i].moment_content;
                object.publishedTime = formatter(result[i].published_time.toString(), true);
                object.isShow = result[i].is_show;
                moments.push(object);
            }
            resObject.success = true;
            resObject.data.code = 200;
            resObject.data.message = "Successfully get all records!!";
            resObject.data.moments = moments;
            res.json(resObject);
            res.end();
            return 1;
        }
    });
});
router.post('/images', (req, res)=>{
    let resObject = {
        "success" : false,
        "data" : {
            "code" : 400,
            "message" : "",
            "images" : []
        }
    };
    let getImagesSql = managementSql.getImagesSql;
    let moment_id = req.body.momentId;
    dbTool.query(getImagesSql, moment_id,(err, result )=>{
        if(err){
            resObject.data.message = err;
            res.json(resObject);
            res.status(400).end();
        }
        else{
            let images = [];
            for(let i = 0; i < result.length; i++){
                let object = {
                    fileId: 5,
                    filePath: "https://i.loli.net/2019/11/26/LuAv9rtz1g3Xq8C.jpg",
                    order: 1
                };
                object.fileId = result[i].rel_moment_file_id;
                object.filePath = result[i].file_path;
                object.order = result[i].order;
                images.push(object);
            }
            resObject.success = true;
            resObject.data.code = 200;
            resObject.data.message = "Successfully get all records!!";
            resObject.data.images = images;
            res.json(resObject);
            res.end();
        }
    });
});
router.post('/add',(req,res)=>{
    let object = {
        "momentId" : -1,
        "momentTitle":req.body.momentTitle,
        "momentContent":req.body.momentContent,
        "publishedTime":new Date(),
        "isShow":req.body.isShow,
        "images":req.body.images
    };

    dbTool.query(managementSql.addRecord, [object.momentTitle, object.momentContent, object.publishedTime, object.isShow], (err)=>{
        if(err){
            console.log(err);
            resObject.data.message = "Failed when insert record into moment table!! err info:" + err.toString();
            res.json(resObject);
            res.status(400).end();
        }
        else{
            dbTool.query(managementSql.getMaxId, (err, result)=>{
                if(err){
                    resObject.data.message = "Failed when get max file id from moment table!! err info:" + err.toString();
                    res.json(resObject);
                    res.status(400).end();
                }
                else{
                     object.momentId = result[0].moment_id;
                     let values = [];
                     for( let i = 0; i < object.images.length; i++){
                         values.push([object.momentId, object.images[i].filePath, object.images[i].order]);
                     }
                     dbTool.query(managementSql.insertImage,[values], (err, result)=>{
                         if(err){
                             console.log(err);
                             resObject.data.message = "Failed when insert all record into rel_moment_imag table!! " ;
                             res.json(resObject);
                             res.status(400).end();
                         }
                         else{
                             resObject.success = true;
                             resObject.data.code = 200;
                             resObject.data.message = "Insert records into moment and images table succeed!!";
                             resObject.data.moment = object;
                             res.json(resObject);
                             console.log(resObject);
                             res.end();
                         }
                     });
                }
            });
        }
    });
});
router.post('/delete', (req, res)=>{
    const momentId = req.body.momentId;
    if(momentId !== undefined){
        dbTool.query(managementSql.deleteRecord, momentId, (err)=>{
            if(err){
                resObject.data.message = "Failed when delete record from moment table!! err info:" + err.toString();
                res.json(resObject);
                res.status(400).end();
            }
            else{
                dbTool.query(managementSql.deleteImgRecord, momentId, (err)=>{
                    if(err){
                        resObject.data.message = "Failed when delete record from image table!! err info:" + err.toString();
                        res.json(resObject);
                        res.status(400).end();
                    }
                    else{
                        resObject.success = true;
                        resObject.data.code = 200;
                        resObject.data.message = "Delete a record from moment table succeed!!";
                        resObject.data.moments = null;
                        res.json(resObject);
                        res.status(200).end();
                    }
                });

            }
        });
    }
    else{
        parametersInvalid(res);
    }
});
router.post('/update', (req, res)=>{
    let object=  {
        "momentId":req.body.momentId,
        "momentTitle":req.body.momentTitle,
        "momentContent":req.body.momentContent,
        "publishedTime":new Date(),
        "isShow":req.body.isShow
    };
    if(req.body.momentId !== undefined){
        dbTool.query(managementSql.updateRecord, [object.momentTitle, object.momentContent, object.publishedTime, object.isShow,
            object.momentId],(err)=>{
            if(err){
                console.log(err);
                resObject.data.message = "Failed when update record within moment table!! err info:" + err;
                res.json(resObject);
                res.status(400).end();
            }
            else{
                resObject.success = true;
                resObject.data.code = 200;
                resObject.data.message = "Update records into moment table succeed!!";
                resObject.data.moments = object;
                res.json(resObject);
                res.status(200).end();
            }
        })
    }
    else{
        parametersInvalid(res);
    }
});
router.post('/id', (req, res)=>{
    if(req.body.momentId === null){
        clearCache(resObject);
        parametersInvalid(res);
    }
    else{
        dbTool.query(managementSql.getMomentInfoById, req.body.momentId, (err, result)=>{
            if(err){
                clearCache(resObject);
                resObject.data.message = err.toString();
                res.json(resObject);
                res.status(400).end();
            }
            else{
                let moment = {
                    "momentId": -1,
                    "momentTitle": "1",
                    "momentContent": "",
                    "publishedTime": "",
                    "images" : []
                };
                if(result.length === 0){
                    clearCache(resObject);
                    resObject.data.message = "没有指定id的moment！！";
                    res.json(resObject);
                    res.status(400).end();
                }
                else{
                    moment.momentId = result[0].moment_id;
                    moment.momentTitle = result[0].moment_title;
                    moment.momentContent = result[0].moment_content;
                    moment.publishedTime = formatter(result[0].published_time.toString(), true);
                    moment.isShow = result[0].is_show;
                    dbTool.query(managementSql.getImagesByMomentId, req.body.momentId, (err, result)=>{
                        if(err){
                            clearCache(resObject);
                            resObject.data.message = err;
                            res.json(resObject);
                            res.status(400).end();
                        }
                        else{
                            for(let i = 0; i < result.length; i++){
                                let image = {
                                    "fileId": -1,
                                    "filePath": "",
                                    "order": -1
                                };
                                image.fileId = result[i].rel_moment_file_id;
                                image.filePath = result[i].file_path;
                                image.order = result[i].order;
                                moment.images.push(image);
                            }
                            resObject.success = true;
                            resObject.data.code = 200;
                            resObject.data.moment = moment;
                            res.json(resObject);
                            res.status(200).end();
                            clearCache(resObject);
                            return 1;
                        }
                    });
                }

            }
        });
    }
});

module.exports = router;
