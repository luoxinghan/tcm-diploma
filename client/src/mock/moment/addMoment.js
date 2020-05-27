// 使用 Mock
import Mock from 'mockjs'

Mock.mock('/api/manage/containers/moments/add','post',function(option){
    console.log("mock moment add",option.body);//可以删掉
    /*const postValue = {
    "momentTitle":"啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊",
    "momentContent":"那阵地牛皮\n开会斯马连\n上班司马伦",
    "publishedTime":"2019-12-11 04:26:27",
    "isShow":1,
    "images":[
        {
            "filePath":"https://i.loli.net/2019/11/17/pudaovbTefSJsDx.jpg",
            "order":1
        },
        {
            "filePath":"https://i.loli.net/2019/11/17/pudaovbTefSJsDx.jpg",
            "order":2
        }]
    }*/
    //如果没上传图片则images不存在
    return Mock.mock({
        success: true,
        data: {
            code: 200,
            message: "新增成功！",
            moment: {//新增的这一个
                momentId: 4,
                momentTitle: "测试新增",
                momentContent: "啊啊啊啊啊啊\n\n啊啊啊啊",
                publishedTime: "2019-11-12 12:10:31",
                isShow: 1
            }
        }
    })
});
