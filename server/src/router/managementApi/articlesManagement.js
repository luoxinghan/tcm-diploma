const express = require('express');
const articleManagementRouter = express.Router();
const sql = require('../../dao/articleManagementSql');
const formatter = require('../../tools/timeFormat.js');
const requestHelper = require('request-promise');
const dbTool = require('../../dao/databaseConnection');
let resObject = {
  "success" : false,
  "data" : {
      "code" : 400,
      "message" : "",
      "articles" : []
  }
};
const options = {
    method: 'GET',
    url: 'http://localhost:3001/api/manage/containers/articles',
    json: true,
};
function parametersInvalid(res){
    resObject.data.message = "Parameters are not valid!!1";
    res.json(resObject);
    res.status(400).end();
    return 1;
}
articleManagementRouter.get('/', (req, res)=>{
    const code = req.query.code;
    let getArtcilesSql = sql.getAllRecordsWithoutSomeFields;
    let paramenters = '';
    if(code !== undefined){
      getArtcilesSql  = sql.getArticleByMenuCode;
      paramenters = '^' + code;
    }
    dbTool.query(getArtcilesSql, paramenters, (err, result )=>{
        if(err){
            resObject.data.message = err.toString();
            res.json(resObject);
            res.status(400).end();
            return 1;
        }
        else{
            let articles = [];
            for(let i = 0; i < result.length; i++){
                var object = {
                    "articleId" : "",
                    "articleTitle" : "",
                    "publishedTime" : "",
                    "isShow" : ""
                };
                object.articleId = result[i].article_id;
                object.articleTitle = result[i].article_title;
                // const published_date = new Date(result[i].published_time.toString());
                // object.publishedTime = published_date.getFullYear() + '-' + published_date.getMonth() + '-' + published_date.getDate();
                object.publishedTime = formatter(result[i].published_time.toString(), false);
                object.isShow = result[i].is_show;
                articles.push(object);
            }
            resObject.success = true;
            resObject.data.code = 200;
            resObject.data.message = "Successfully get all records!!";
            resObject.data.articles = articles;
            res.json(resObject);
            res.end();
            return 1;
        }
    });
});
articleManagementRouter.post('/add', (req, res)=>{
    let articleObject = {
        "articleId" : "",
        "articleTitle" : "",
        "articleRaw" : "",
        "publishedTime" : "",
        "isShow" : "",
        "imgUrl" : "",
        "menuCode" : ""
    };
    if(req.body.title !== undefined && req.body.raw !== undefined && req.body.menuCode !== undefined){
        articleObject.articleTitle = req.body.title;
        articleObject.articleRaw = req.body.raw;
        if(req.body.url === undefined){
            articleObject.imgUrl = null;
        }
        articleObject.imgUrl = req.body.url;
        articleObject.menuCode = req.body.menuCode;
        articleObject.isShow = 1;
        articleObject.publishedTime = new Date();
        dbTool.query(sql.insertRecord, [articleObject.articleTitle, articleObject.articleRaw, articleObject.publishedTime, articleObject.isShow, articleObject.imgUrl],(err)=>{
            if(err){
                resObject.data.message = "Failed when insert record into article table!! err info:" + err.toString();
                res.json(resObject);
                res.status(400).end();
                return 1;
            }
            else{
                dbTool.query(sql.getMaxArticleId, (err, result)=>{
                   if(err){
                       resObject.data.message = "Failed when get maximum article id from article table, err info:" + err.toString();
                       res.json(resObject);
                       res.status(400).end();
                       return 1;
                   }
                   else{
                       articleObject.articleId = result[0].article_id;
                       if(articleObject.articleId !== undefined){
                           dbTool.query(sql.insertRelationTableRecord, [articleObject.menuCode, articleObject.articleId], (err, result)=>{
                              if(err){
                                  resObject.data.message = "Failed when insert record into rel_article_menu table, err info:" + err.toString();
                                  res.json(resObject);
                                  res.status(400).end();
                                  return 1;
                              }
                              else{
                                    requestHelper(options).then(function (response) {
                                        resObject.success = true;
                                        resObject.data.code = 200;
                                        resObject.data.message = "Insert records into article table and rel_article_menu table succeed!!";
                                        resObject.data.articles = response.data.articles;
                                        res.json(resObject);
                                        res.status(200).end();
                                            return 1;
                                    }
                                    ).catch(function (err) {
                                        resObject.data.message = "Failed when sent request to get all records in article table, err info:" + err.toString();
                                        res.json(resObject);
                                        res.status(400).end();
                                        return 1;
                                    });
                              }
                           });
                       }
                   }
                });
            }
        })
    }
    else{
        parametersInvalid(res);
    }
});
articleManagementRouter.post('/update', (req, res)=>{
    let articleObject = {
        "articleId" : "",
        "articleTitle" : "",
        "articleRaw" : "",
        "publishedTime" : "",
        "isShow" : "",
        "imgUrl" : "",
        "menuCode" : ""
    };
    if(req.body.title !== undefined && req.body.raw !== undefined && req.body.menuCode !== undefined && req.body.articleId !== undefined){
        articleObject.articleTitle = req.body.title;
        articleObject.articleRaw = req.body.raw;
        articleObject.articleId = req.body.articleId;
        if(req.body.url === undefined){
            articleObject.imgUrl = null;
        }
        articleObject.imgUrl = req.body.url;
        articleObject.menuCode = req.body.menuCode;
        articleObject.publishedTime = new Date();
        dbTool.query(sql.updateRecord, [articleObject.articleTitle, articleObject.articleRaw, articleObject.publishedTime, articleObject.imgUrl, articleObject.articleId],(err)=>{
            if(err){
                resObject.data.message = "Failed when update record within  article table!! err info:" + err.toString();
                res.json(resObject);
                res.status(400).end();
                return 1;
            }
            else{
                if(articleObject.articleId !== undefined){
                    dbTool.query(sql.updateRelationTableMenuCode, [articleObject.menuCode, articleObject.articleId], (err, result)=>{
                        if(err){
                            resObject.data.message = "Failed when update record within the rel_article_menu table, err info:" + err.toString();
                            res.json(resObject);
                            res.status(400).end();
                            return 1;
                        }
                        else{
                            requestHelper(options).then(function (response) {
                                    resObject.success = true;
                                    resObject.data.code = 200;
                                    resObject.data.message = "Update records into article table and rel_article_menu table succeed!!";
                                    resObject.data.articles = response.data.articles;
                                    res.json(resObject);
                                    res.status(200).end();
                                return 1;
                                }
                            ).catch(function (err) {
                                resObject.data.message = "Failed when sent request to get all records in article table, err info:" + err.toString();
                                res.json(resObject);
                                res.status(400).end();
                                return 1;
                            });
                        }
                    });
                }
            }
        })
    }
    else{
        parametersInvalid(res);
    }
});
articleManagementRouter.post('/delete', (req, res)=>{
    const articleId = req.body.articleId;
    if(articleId !== undefined){
        dbTool.query(sql.deleteRecord, articleId, (err)=>{
           if(err){
               resObject.data.message = "Failed when delete record from article table!! err info:" + err.toString();
               res.json(resObject);
               res.status(400).end();
               return 1;
           }
           else{
               dbTool.query(sql.deleteRelationTableRecord, articleId, (err)=>{
                   if(err){
                       resObject.data.message = "Failed when delete record from article table!! err info:" + err.toString();
                       res.json(resObject);
                       res.status(400).end();
                       return 1;
                   }
                   else{
                       requestHelper(options).then(function (response) {
                               resObject.success = true;
                               resObject.data.code = 200;
                               resObject.data.message = "Delete a record from article table and rel_article_menu table succeed!!";
                               resObject.data.articles = response.data.articles;
                               res.json(resObject);
                               res.status(200).end();
                               return 1;
                           }
                       ).catch(function (err) {
                           resObject.data.message = "Failed when sent request to get all records in article table, err info:" + err.toString();
                           res.json(resObject);
                           res.status(400).end();
                           return 1;
                       });
                   }
               });
           }
        });
    }
    else{
        parametersInvalid(res);
    }
});
articleManagementRouter.post('/show', (req, res)=>{
   const articleId = req.body.id;
   const isShow = req.body.isShow === false ? 0 : 1;
   console.log(articleId + "" + isShow);
   if(articleId !== undefined && isShow !== undefined){
       dbTool.query(sql.updateIsShowAttribute, [isShow, articleId], (err)=>{
           if(err){
               resObject.data.message = "Failed when update record into article table!! err info:" + err.toString();
               res.json(resObject);
               res.status(400).end();
               return 1;
           }
           else{
               requestHelper(options).then(function (response) {
                       resObject.success = true;
                       resObject.data.code = 200;
                       resObject.data.message = "Update a record into article table succeed!!";
                       resObject.data.articles = response.data.articles;
                       res.json(resObject);
                       res.status(200).end();
                       return 1;
                   }
               ).catch(function (err) {
                   resObject.data.message = "Failed when sent request to get all records in article table, err info:" + err.toString();
                   res.json(resObject);
                   res.status(400).end();
                   return 1;
               });
           }
       });
   }
   else{
       parametersInvalid(res);
   }
});
articleManagementRouter.post('/id', (req, res)=>{
    const resObeject = {
      "success" : false,
      "data" :{
          "code" : 400,
          "article" : {
              "articleId" : -1,
              "articleTitle" : null,
              "articleImg" : null,
              "articleRow" : null,
              "publishedTime" : null,
              "isShow" : null
          },
          "menu" :{
              "menuCode" : -1,
              "menuName" : null,
              "parentCode" : null,
              "level" : null,
              "isShow" : null,
              "isModify" : null
          }
      }
    };
    const articleId = req.body.articleId;
    if(articleId !== undefined){
        dbTool.query(sql.getArticleById, articleId, (err, reslut)=>{
            if(err){
                resObject.data.message = "Failed when get records from article table!! err info:" + err.toString();
                res.json(resObject);
                res.status(400).end();
                return 1;
            }
            else{
                resObeject.data.article.articleId = articleId;
                resObeject.data.article.articleTitle = reslut[0].article_title;
                resObeject.data.article.articleImg = reslut[0].imgUrl;
                resObeject.data.article.articleRow = reslut[0].article_raw;
                // const published_date = new Date(reslut[0].published_time.toString());
                // resObeject.data.article.publishedTime = published_date.getFullYear() + '-' + published_date.getMonth() + '-' + published_date.getDate();
                resObeject.data.article.publishedTime =  formatter(reslut[0].published_time.toString(), false);
                resObeject.data.article.isShow = reslut[0].is_show;

                dbTool.query(sql.getMenuInfo, articleId, (err, result)=>{
                    if(err || result.length === 0){
                        resObject.data.message = "Failed when get record from menu table!! err info:" ;
                        res.json(resObject);
                        res.status(400).end();
                        return 1;
                    }
                    else{
                        resObeject.data.menu.menuName = result[0].menu_name;
                        resObeject.data.menu.menuCode = result[0].menu_code;
                        resObeject.data.menu.parentCode = result[0].parent_code;
                        resObeject.data.menu.level = result[0].level;
                        resObeject.data.menu.isShow = result[0].is_show;
                        resObeject.data.menu.isModify = result[0].is_modify;
                        resObeject.data.code = 200;
                        resObeject.success = true;
                        res.json(resObeject);
                        res.status(200).end();
                        return 1;
                    }
                });
            }
        });
    }
    else{
        parametersInvalid(res);
    }
});

module.exports = articleManagementRouter;
