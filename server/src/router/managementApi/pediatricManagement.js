const express = require('express');
const formatter = require('../../tools/timeFormat.js');
const pediatricManagementRouter = express.Router();
const sql = require('../../dao/pediatricManagementSql');
const requestHelper = require('request-promise');
const dbTool = require('../../dao/databaseConnection');
let resObject = {
    "success" : false,
    "data" : {
        "code" : 400,
        "message" : "",
        "courses" : []
    }
};
const options = {
    method: 'GET',
    url: 'http://localhost:3001/api/manage/containers/pediatric/courses',
    json: true,
};
function parseDateString(dateString) {
    let dateParseString = dateString.replace(/-/g,"/");
    return new Date(dateParseString);
}
function parametersInvalid(res){
    resObject.data.message = "Parameters are not valid!!1";
    res.json(resObject);
    res.status(400).end();
    return 1;
}
pediatricManagementRouter.get('/courses', (req, res)=>{
    const code = req.query.code;
    let getCoursesSql = sql.getAllRecords;

    dbTool.query(getCoursesSql, (err, result )=>{
        if(err){
            resObject.data.message = err.toString();
            res.json(resObject);
            res.status(400).end();
            return 1;
        }
        else{
            let courses = [];
            for(let i = 0; i < result.length; i++){
                let object = {
                    courseId: -1,
                    title: "",
                    imgUrl: "",
                    lecturer: "",
                    address: "",
                    lectureTime: "",
                    publishedTime: "",
                    isShow: -1
                };
                object.courseId = result[i].course_id;
                object.title = result[i].title;
                object.lecturer = result[i].lecturer;
                object.address = result[i].address;
                object.lectureTime = formatter(result[i].lecture_time.toString(), true);
                object.publishedTime = formatter(result[i].published_time.toString(), true);
                object.isShow = result[i].is_show;
                object.imgUrl = result[i].img_url;
                courses.push(object);
            }
            resObject.success = true;
            resObject.data.code = 200;
            resObject.data.message = "Successfully get all records!!";
            resObject.data.courses = courses;
            res.json(resObject);
            res.end();
            return 1;
        }
    });
});
pediatricManagementRouter.post('/course-add', (req, res)=>{
    let pediatricObject ={
        "title":"太恐怖了！感冒了一定不能吃这些东西，不然会威胁到生命！",
        "content":"{\"blocks\":[{\"key\":\"foo8\",\"text\":\"Hello World!\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":6,\"length\":6,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{\"nodeAttributes\":{}}}],\"entityMap\":{}}",
        "imgUrl":"https://i.loli.net/2019/11/17/pudaovbTefSJsDx.jpg",
        "lecturer":"罗杏函",
        "address":"China. ChongQing. YuBei LongXing HeZe Home, China. ChongQing. YuBei LiangLu HaoBo",
        "lectureTime":"2019-12-20 19:53:18",
        "publishedTime":"2019-12-15 19:47:27",
        "isShow":1
    };
    if(req.body.title !== undefined && req.body.content !== undefined && req.body.lectureTime !== undefined
        && req.body.publishedTime !== undefined && req.body.lecturer !== undefined){
        pediatricObject.title = req.body.title;
        pediatricObject.content = req.body.content;
        pediatricObject.imgUrl = (req.body.imgUrl === undefined) ? null : req.body.imgUrl;
        pediatricObject.lecturer = req.body.lecturer;
        pediatricObject.address = req.body.address;
        pediatricObject.lectureTime = parseDateString(req.body.lectureTime);
        pediatricObject.publishedTime = parseDateString(req.body.publishedTime);
        pediatricObject.isShow = 1;
        dbTool.query(sql.insertRecord, [pediatricObject.title, pediatricObject.content, pediatricObject.lecturer,
            pediatricObject.address, pediatricObject.lectureTime, pediatricObject.publishedTime,
            pediatricObject.isShow, pediatricObject.imgUrl],(err)=>{
            if(err){
                resObject.data.message = "Failed when insert record into pediatric course table!! err info:" + err.toString();
                res.json(resObject);
                res.status(400).end();
                return 1;
            }
            else{
                resObject.success = true;
                resObject.data.code = 200;
                resObject.data.message = "Insert records into pediatric course table succeed!!";
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
pediatricManagementRouter.post('/images-add', (req, res)=>{
 let images = req.body.files;
 if(images === undefined){
     parametersInvalid(res);
 }
 else{
     let imagesParameters = [];
     for(let i = 0; i < images.length; i++){
         images[i].uploadTime = parseDateString(images[i].uploadTime);
         imagesParameters.push([images[i].fileType, images[i].filePath, images[i].uploadTime]);
     }
     dbTool.query(sql.insertImages, [imagesParameters], (err, result)=>{
        if(err){
            resObject.data.message = "Failed when insert record into sys_file table!! err info:" + err.toString();
            res.json(resObject);
            res.status(400).end();
            return 1;
        }
        else{
            dbTool.query(sql.getAllImages, (err, result)=>{
                let i = 0;
                let resImages = [];
                while(result[i] !== undefined){
                   let imageObject = {
                       fileId: null,
                       fileType: null,
                       filePath: null,
                       uploadTime: null
                   };
                  imageObject.fileId = result[i].file_id;
                  imageObject.fileType = result[i].file_type;
                  imageObject.filePath = result[i].file_path;
                   // const uploadTime = new Date(result[i].upload_time.toString());
                   // imageObject.uploadTime = uploadTime.getFullYear() + '-' + uploadTime.getMonth() + '-' + uploadTime.getDate() + '  '
                   //     + uploadTime.getHours() + ':' + uploadTime.getMinutes() + ':' + uploadTime.getSeconds();
                    imageObject.uploadTime = formatter(result[i].upload_time.toString(), true);
                   resImages.push(imageObject);
                   i++;
               }
                resObject.success = true;
                resObject.data.code = 200;
                resObject.data.message = "Insert records into sys_file table succeed!!";
                resObject.data.images = resImages;
                res.json(resObject);
                res.status(200).end();
                return 1;
            });
        }
     });
 }
});
pediatricManagementRouter.post('/course-update', (req, res)=>{
    // console.log("成功进入该界面！！！！！")
    let pediatricObject ={
        "course_id" : -1,
        "title":"太恐怖了！感冒了一定不能吃这些东西，不然会威胁到生命！",
        "content":"{\"blocks\":[{\"key\":\"foo8\",\"text\":\"Hello World!\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":6,\"length\":6,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{\"nodeAttributes\":{}}}],\"entityMap\":{}}",
        "imgUrl":"https://i.loli.net/2019/11/17/pudaovbTefSJsDx.jpg",
        "lecturer":"罗杏函",
        "address":"China. ChongQing. YuBei LongXing HeZe Home, China. ChongQing. YuBei LiangLu HaoBo",
        "lectureTime":"2019-12-20 19:53:18",
        "publishedTime":"2019-12-15 19:47:27",
        "isShow":1
    };
    if(req.body.title !== undefined && req.body.content !== undefined && req.body.lectureTime !== undefined
        && req.body.publishedTime !== undefined && req.body.lecturer !== undefined){
        pediatricObject.course_id = req.body.courseId;
        pediatricObject.title = req.body.title;
        pediatricObject.content = req.body.content;
        pediatricObject.imgUrl = (req.body.imgUrl === undefined) ? null : req.body.imgUrl;
        pediatricObject.lecturer = req.body.lecturer;
        pediatricObject.address = req.body.address;
        pediatricObject.lectureTime = parseDateString(req.body.lectureTime);
        pediatricObject.publishedTime = parseDateString(req.body.publishedTime);
        pediatricObject.isShow = req.body.isShow;
        dbTool.query(sql.updateRecord, [pediatricObject.title, pediatricObject.content, pediatricObject.lecturer,
            pediatricObject.address, pediatricObject.lectureTime, pediatricObject.publishedTime,
            pediatricObject.isShow, pediatricObject.imgUrl, pediatricObject.course_id],(err)=>{
            if(err){
                resObject.data.message = "Failed when update record into pediatric course table!! err info:" + err;
                res.status(400).end();
                return 1;
            }
            else{
                resObject.success = true;
                resObject.data.code = 200;
                resObject.data.message = "update records into pediatric course table succeed!!";
                res.json(resObject);
                res.status(200).end();
                return 1;
            }
        })
    }
    else{
        pediatricObject.course_id = req.body.courseId;
        pediatricObject.title = req.body.title;
        pediatricObject.imgUrl = (req.body.imgUrl === undefined) ? null : req.body.imgUrl;
        pediatricObject.lecturer = req.body.lecturer;
        pediatricObject.address = req.body.address;
        pediatricObject.lectureTime = parseDateString(req.body.lectureTime);
        pediatricObject.publishedTime = parseDateString(req.body.publishedTime);
        pediatricObject.isShow = req.body.isShow;
        dbTool.query(sql.updateIsShow, [pediatricObject.isShow, pediatricObject.course_id], (err, result)=>{
            if(err){
                resObject.data.message = "Failed when update record into pediatric course table!! err info:" + err;
                res.status(400).end();
                return 1;
            }
            else{
                resObject.success = true;
                resObject.data.code = 200;
                resObject.data.message = "update records into pediatric course table succeed!!";
                res.json(resObject);
                res.status(200).end();
                return 1;
            }
        });

    }
});
pediatricManagementRouter.post('/courses-delete', (req, res)=>{
    const courseId = req.body.courseId;
    if(courseId !== undefined){
        dbTool.query(sql.deleteRecord, courseId, (err)=>{
            if(err){
                resObject.data.message = "Failed when delete record from COURSE table!! err info:" + err;
                res.json(resObject);
                res.status(400).end();
                return 1;
            }
            else{
                resObject.success = true;
                resObject.data.code = 200;
                resObject.data.message = "Delete a record from pediatric table succeed!!";
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
pediatricManagementRouter.post('/images-delete', (req, res)=>{
    const imageId = req.body.fileId;
    if(imageId !== undefined){
        dbTool.query(sql.deleteImage, imageId, (err)=>{
            if(err){
                resObject.data.message = "Failed when delete record from file table!! err info:" + err;
                res.json(resObject);
                res.status(400).end();
                return 1;
            }
            else{
                resObject.success = true;
                resObject.data.code = 200;
                resObject.data.message = "Delete a record from file table succeed!!";
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
pediatricManagementRouter.get('/images', (req, res)=>{
    dbTool.query(sql.getAllImages, (err, result)=>{
     if(err){
         resObject.data.message = "Failed when get record from file table!! err info:" + err;
         res.json(resObject);
         res.status(400).end();
         return 1;
     }
     else{
         let i = 0;
         let resImages = [];
         while(result[i] !== undefined){
             let imageObject = {
                 fileId: null,
                 fileType: null,
                 filePath: null,
                 uploadTime: null
             };
             imageObject.fileId = result[i].file_id;
             imageObject.fileType = result[i].file_type;
             imageObject.filePath = result[i].file_path;
             // const uploadTime = new Date(result[i].upload_time.toString());
             // imageObject.uploadTime = uploadTime.getFullYear() + '-' + uploadTime.getMonth() + '-' + uploadTime.getDate() + '  '
             //     + uploadTime.getHours() + ':' + uploadTime.getMinutes() + ':' + uploadTime.getSeconds();
             imageObject.uploadTime = formatter(result[i].upload_time.toString(), true);
             resImages.push(imageObject);
             i++;
         }
         resObject.success = true;
         resObject.data.code = 200;
         resObject.data.message = "Get records into sys_file table succeed!!";
         resObject.data.images = resImages;
         res.json(resObject);
         res.status(200).end();
         return 1;
     }
    });
});
pediatricManagementRouter.post('/course-id', (req, res)=>{
    let id = req.body.courseId;
    dbTool.query(sql.getCourseById,id, (err, result )=>{
        if(err){
            resObject.data.message = err.toString();
            res.json(resObject);
            res.status(400).end();
        }
        else{
            let object = {
                courseId: -1,
                title: "",
                imgUrl: "",
                lecturer: "",
                address: "",
                lectureTime: "",
                publishedTime: "",
                isShow: -1
            };
            object.courseId = id;
            object.title = result[0].title;
            object.content = result[0].content;
            object.lecturer = result[0].lecturer;
            object.address = result[0].address;
            // const lectureTime = new Date(result[0].lecture_time.toString());
            // object.lectureTime = lectureTime.getFullYear() + '-' + lectureTime.getMonth() + '-' + lectureTime.getDate() + '  '
            //     + lectureTime.getHours() + ':' + lectureTime.getMinutes() + ':' + lectureTime.getSeconds();
            object.lectureTime = formatter(result[0].lecture_time.toString(), true);
            // const published_date = new Date(result[0].published_time.toString());
            // object.publishedTime = published_date.getFullYear() + '-' + published_date.getMonth() + '-' + published_date.getDate() + '  '
            //     + published_date.getHours() + ':' + published_date.getMinutes() + ':' + published_date.getSeconds();
            object.publishedTime = formatter(result[0].published_time.toString(), true);
            object.isShow = result[0].is_show;
            object.imgUrl = result[0].img_url;

            resObject.success = true;
            resObject.data.code = 200;
            resObject.data.message = "Successfully get all records!!";
            resObject.data.course = object;
            res.json(resObject);
            res.end();
        }
    });
});

module.exports = pediatricManagementRouter;
