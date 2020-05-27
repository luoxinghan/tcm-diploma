const express = require('express');
const formidable = require('formidable');
const router = express.Router();
function getNowFormatDate() {
    let date = new Date();
    let seperator1 = "-";
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + seperator1 + date.getHours() + seperator1 + date.getMinutes() + seperator1 + date.getSeconds() +seperator1 + date.getMilliseconds();
    return currentdate.toString();
}
router.post('/',(req,res)=>{
    let form_update = new formidable.IncomingForm(); //创建上传表单
    form_update.encoding = 'utf-8'; //设置编码格式
    form_update.uploadDir = 'public'; //文件上传，设置临时上传目录
    form_update.keepExtensions = true; //保留后缀
    form_update.maxFieldsSize = 20 * 1024 * 1024;   //文件大小 k
    form_update.parse(req)
        .on ('fileBegin', function(name, file){
            //根据参数的类型，将图片存储到不同的路径下
            file.path = form_update.uploadDir + "/images/"  + getNowFormatDate()+".jpg";
        })
        .on('file', (name, file) => {
            res.status(200).json({ data: {
                    name: name.toString(),
                    url: '/'+file.path
                }});
        })
        .on('end', () => {
            res.end();
            return 1;
        });
});

module.exports = router;
