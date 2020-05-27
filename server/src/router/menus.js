const express = require('express');
const menusRouter = express.Router();
const sqlJson = require('../dao/menusSql');
const dbTool = require('../dao/databaseConnection');
const menusObject = require('../jsonObject/meunsApi');
function treeData(cloneData){
    cloneData.forEach(element => {
        let parentId = element.parentCode;
        if(parentId !== '000'){
            cloneData.forEach(ele => {
                if(ele.menuCode === parentId){ //当内层循环的ID== 外层循环的parendId时，（说明有children），需要往该内层id里建个children并push对应的数组；
                    if(!ele.submenu){
                        ele.submenu = [];
                    }
                    ele.submenu.push(element);
                }
            });
        }
    });
    cloneData = cloneData.filter(ele => ele.parentCode === '000'); //这一步是过滤，按树展开，将多余的数组剔除；
    return cloneData;
}
menusRouter.get('/', (req, res)=>{
    let success,code ;
    let sql = sqlJson.getAllmenus;
    // console.log(req.query.all)
    if(req.query.all === "true"){
        sql = sqlJson.getAllMenusNoMatterIsShow;
    }
    // console.log(sql);
    dbTool.query(sql, (err,result, next)=>{
        if(err){
            console.log('Database query failed!!!'+ "/n err info:" + err.toString());
            success = false;
            code = 400;
        }
        else{
            success = true;
            code = 200;
            const menus = [];
            for(var i = 0; i < result.length; i++) {
                var menusWithImg = {
                    "menuCode": "002",
                        "menuName": "诊断方法",
                        "parentCode" : "",
                        "level": "2",
                        "imgUrl": "https://i.loli.net/2019/11/16/rUzXQ7VEOMdH6af.jpg",
                        "isShow": 1,
                        "isModify" : 0
                };
                var menusWithoutImg = {
                    "menuCode": "002",
                    "menuName": "诊断方法",
                    "parentCode" : "",
                    "level": "2",
                    "isShow": 1,
                    "isModify" : 0
                };
                if(result[i].imgUrl === undefined){
                    menusWithoutImg.menuCode = result[i].menu_code;
                    menusWithoutImg.menuName = result[i].menu_name;
                    menusWithoutImg.level = result[i].level;
                    menusWithoutImg.isShow = result[i].is_show;
                    menusWithoutImg.isModify = result[i].is_modify;
                    menusWithoutImg.parentCode = result[i].parent_code;
                    menus.push(menusWithoutImg);
                }
                else {
                    menusWithImg.menuCode = result[i].menu_code;
                    menusWithImg.menuName = result[i].menu_name;
                    menusWithImg.level = result[i].level;
                    menusWithImg.isShow = result[i].is_show;
                    menusWithImg.isModify = result[i].is_modify;
                    menusWithImg.parentCode = result[i].parent_code;
                    menusWithImg.imgUrl = result[i].imgUrl;
                    menus.push(menusWithImg);
                }
            }
            //console.log(menus);
            var treeMenus = [];
            treeMenus = treeData(menus);
            menusObject.success = true;
            menusObject.data.code = 200;
            menusObject.data.menus = treeMenus;
            res.json(menusObject);
            res.end();
            return 1;
        }
    });
});
module.exports = menusRouter;
