const express = require('express');
const learntcmRouter = express.Router();
const formatter = require('../tools/timeFormat.js');
const getAllArticlesObject = require('../jsonObject/getArticles');
function clearCache(object) {
    object.success =  false;
    object.data.code = 400;
    object.data.articles = [];
}
//const article = require('../jsonObject/article');
const dbTool = require('../dao/databaseConnection');
const getAllArticlesSql = require('../dao/getAllArticlesSql');
const getAllArticlesByMenusCodeSql = require('../dao/getAllArticlesByMenusCodeSql');
const CurrentImgUrl = require('../dao/menusSql');
const menusRouter = require('./menus');
learntcmRouter.use('/menus', menusRouter);
learntcmRouter.get('/menus/articles',(req,res)=>{
    const menusCode = req.query.code;
    if(menusCode === undefined){
        dbTool.query(getAllArticlesSql.sql, (err,result)=>{
            if(err){
                console.log('Database query failed!!!'+ "/n err info:" + err.toString());
                getAllArticlesObject.success = false;
                getAllArticlesObject.data.code = 400;
                getAllArticlesObject.data.article = [];
                res.json(getAllArticlesObject);
                clearCache(getAllArticlesObject);
                return 1;
            }
            else{
                getAllArticlesObject.success = true;
                getAllArticlesObject.data.code = 200;
                const articles = [];
                for(var i = 0; i < result.length; i++) {
                    var article = {
                        "articleId": "",
                        "articleTitle": "",
                        "imgUrl": "",
                        "publishTime": ""
                    };
                    article.articleId = result[i].article_id;
                    article.imgUrl = result[i].imgUrl;
                    article.articleTitle = result[i].article_title;
                    //将datetime转化成date形式的字符串
                    // const published_date = new Date(result[i].published_time.toString());
                    // article.publishTime = published_date.getFullYear() + '-' + published_date.getMonth() + '-' + published_date.getDate();
                    article.publishTime = formatter(result[i].published_time.toString(), false);
                    articles.push(article);
                }
                getAllArticlesObject.data.article = articles;
                res.json(getAllArticlesObject);
                clearCache(getAllArticlesObject);
                return 1;
            }
        });
    }
    else{
        dbTool.query(getAllArticlesByMenusCodeSql.sql,menusCode, (err,result)=>{
            if(err){
                console.log('Database query failed!!!'+ "/n err info:" + err.toString());
                getAllArticlesObject.success = false;
                getAllArticlesObject.data.code = 400;
                getAllArticlesObject.data.article = [];
                res.json(getAllArticlesObject);
                clearCache(getAllArticlesObject);
                return 1;
            }
            else{
                getAllArticlesObject.success = true;
                getAllArticlesObject.data.code = 200;
                const articles = [];
                for(let i = 0; i < result.length; i++) {
                    let article = {
                        "articleId": "",
                        "articleTitle": "",
                        "imgUrl": "",
                        "publishTime": ""
                    }
                    article.articleId = result[i].article_id;
                    article.imgUrl = result[i].imgUrl;
                    article.articleTitle = result[i].article_title;
                    //将datetime转化成date形式的字符串
                    // const published_date = new Date(result[i].published_time.toString());
                    // article.publishTime = published_date.getFullYear() + '-' + published_date.getMonth() + '-' + published_date.getDate();
                    article.publishTime = formatter(result[i].published_time.toString(), false);
                    articles.push(article);
                }
                getAllArticlesObject.data.article = articles;
                res.json(getAllArticlesObject);
                clearCache(getAllArticlesObject);
                return 1;
            }
        });
    }
});
learntcmRouter.post('/current', (req, res)=>{
    const CurrentImgUrlSql = CurrentImgUrl.getCurrentImgUrl;
    const menuCode = req.body.menuCode;
    // console.log(typeof menuCode);
    dbTool.query(CurrentImgUrlSql, (err, reslut)=>{
        if(err || menuCode === undefined){
            console.log('Database query failed!!!'+ "/n err info:" + err.toString());
            res.json(err.toString());
            return 1;
        }
        else{
            let resObject = [];
            for(let i = 0; i < reslut.length; i++){
                let object = {
                    "menuCode" : -1,
                    "imgUrl" : '',
                    "menuName": "",
                    "level": "1",
                    "isShow": 1,
                    "isModify": 0
                };
                object.menuCode = reslut[i].menu_code;
                object.imgUrl = reslut[i].imgUrl;
                object.menuName = reslut[i].menu_name;
                object.level = reslut[i].level;
                object.isShow = reslut[i].is_show;
                object.isModify = reslut[i].is_modify;
                if(object.menuCode === menuCode){
                    let resObjectWithImg = {
                        "success" : true,
                        "data" : {
                            "code" : 200,
                            "menu" :object
                        }
                    };
                    res.json(resObjectWithImg);
                    res.end();
                    return 1;
                }
                else{
                    resObject.push(object);
                }
            }
            if(menuCode.length > 3){
                let tep = menuCode.substr(0, menuCode.length - 3);
                while(tep.length >= 3){
                    for(let i = 0; i < resObject.length; i++){
                        if(resObject[i].menuCode === tep){
                            return dbTool.query("SELECT * FROM sys_menu WHERE menu_code = ?;", menuCode, (err, result1)=>{
                               if(err){
                                   res.json(err.toString());
                                   return 1;
                               }
                               else{
                                   let object = {
                                       "menuCode" : -1,
                                       "imgUrl" : '',
                                       "menuName": "",
                                       "level": "1",
                                       "isShow": 1,
                                       "isModify": 0
                                   };
                                   object.menuCode = result1[0].menu_code;
                                   object.imgUrl = resObject[i].imgUrl;
                                   object.menuName = result1[0].menu_name;
                                   object.level = result1[0].level;
                                   object.isShow = result1[0].is_show;
                                   object.isModify = result1[0].is_modify;
                                   let resObjectWithImg = {
                                       "success" : true,
                                       "data" : {
                                           "code" : 200,
                                           "menu" :object
                                       }
                                   };
                                   res.json(resObjectWithImg);
                                   return 1;
                               }
                            });
                        }
                    }
                    tep = tep.substr(0, menuCode.length - 3);
                }
            }


        }
    })
});



module.exports = learntcmRouter;
