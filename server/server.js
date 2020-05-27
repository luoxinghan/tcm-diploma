const express = require('express');
const app = express();
//third-party middleware
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const port = 3001;
const path = require('path');

//api business logic
const adminRouter = require('./src/router/adminApi');
const emailRouter = require('./src/router/email');
const learntcmRouter = require('./src/router/learntcmApi');
const pediatricCourseRouter = require('./src/router/pediatricCourse');
const menusManagementRouter = require('./src/router/managementApi/menusManagement');
const roleManagementRouter = require('./src/router/managementApi/roleManagement');
const articlesManagementRouter = require('./src/router/managementApi/articlesManagement');
const carouselManagementRouter = require('./src/router/managementApi/carouseManagement');
const employeeManagementRouter = require('./src/router/managementApi/staffManagement');
const momentsManagementRouter = require('./src/router/managementApi/momentManagement');
const pediatricManagementRouter = require('./src/router/managementApi/pediatricManagement');
const uploadFile = require('./src/router/uploadImg');
const uploadVideo = require('./src/router/uploadVideos');
const doctorsRouter = require('./src/router/doctors');
const getIsShowMoments = require('./src/router/getAllHomeMoments');
const getIsShowPediatric = require('./src/router/getAllPediatricIsShowCourses');
const loginApi = require('./src/router/managementApi/loginApi');
//third-party middleware using
// app.use(express.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
// view engine setup
app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'html');
app.use("/public",express.static('./public'));
//middleware using
//前台系统Api
app.use('/api/manage/login', loginApi);
app.use('/api/email', emailRouter);
app.use('/api/learntcm',learntcmRouter);
app.use('/api/pediatric', pediatricCourseRouter);
app.use('/api/center-intro/doctors', doctorsRouter);
app.use('/api/home/moments', getIsShowMoments);
app.use('/api/pediatric/isshowcourses', getIsShowPediatric);
//后台管理系统
app.use("/", express.static("./build"));
app.use('/api/manage',adminRouter);
app.use('/api/manage/containers/content', menusManagementRouter);
app.use('/api/manage/containers/roles', roleManagementRouter);
app.use('/api/manage/containers/articles', articlesManagementRouter);
app.use('/api/manage/containers/carousels', carouselManagementRouter);
app.use('/api/manage/containers/staffs', employeeManagementRouter);
app.use('/api/manage/containers/moments', momentsManagementRouter);
app.use('/api/manage/containers/pediatric', pediatricManagementRouter);
app.use('/api/upload/picture', uploadFile);
app.use('/api/upload/videos', uploadVideo);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    //next(createError(404));
    if(req.url.startsWith('/api/')||req.url.startsWith('/static/')){
        return next;
    }
    else{
        return res.sendFile(path.resolve('build/index.html'));
    }
});

// error handler
app.use(function(err, req, res, next) {
    //set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
app.listen(3001,function () {
   console.log('app running on port 3001');
});
module.exports = app;

