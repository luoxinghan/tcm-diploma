const express = require('express');
const pediatricCourseRouter = express.Router();
const formatter = require('../tools/timeFormat.js');
const sqlJsonObeject = require('../dao/pediatricCourseSql');
const pediatricCousrseObject = require('../jsonObject/pediatricCourseObject');
const dbTool = require('../dao/databaseConnection');
//请求所有小儿推拿课程
pediatricCourseRouter.get('/courses', (req, res)=>{
    dbTool.query(sqlJsonObeject.getAllCourses, (err, result)=>{
       if(err){
           pediatricCousrseObject.success = false;
           pediatricCousrseObject.data.code = 400;
           res.json(pediatricCousrseObject);
           console.log("Failed when query executing!! /n err info: " + err.toString());
           res.end();
           return 1;
       }
       else{
           pediatricCousrseObject.success = true;
           pediatricCousrseObject.data.code = 200;
           const coursesData = [];
           for(let i  = 0; i < result.length; i ++){
               let course ={
                   courseId: -1,
                   title: "",
                   imgUrl: "",
                   lecturer: "",
                   address: "",
                   lectureTime: "",
                   publishedTime: "",
                   isShow: -1
               };
               //将datetime转化成date形式的字符串
               // const published_date = new Date(result[i].published_time.toString());
               course.publishedTime = formatter(result[i].published_time.toString(), true);
               // const lecture_date = new Date(result[i].lecture_time.toString());
               // course.lectureTime = lecture_date.getFullYear() + '-' + lecture_date.getMonth() + '-' + lecture_date.getDate() + ' ' + lecture_date.getHours() + ':' + lecture_date.getMinutes() + ':' + lecture_date.getSeconds();
               course.lectureTime = formatter(result[i].lecture_time.toString(), true);
               course.courseId = result[i].course_id;
               course.title = result[i].title;
               course.lecturer = result[i].lecturer;
               course.address = result[i].address;
               course.isShow = result[i].is_show;
               course.imgUrl = result[i].img_url;
               coursesData.push(course);
       }

           pediatricCousrseObject.data.courses = coursesData;
           res.json(pediatricCousrseObject);
           res.end();
           return 1;
    }
    });
});

module.exports = pediatricCourseRouter;
