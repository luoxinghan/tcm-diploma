// 使用 Mock
import Mock from 'mockjs'

Mock.mock('/api/manage/containers/pediatric/images-add','post',function(option){
    console.log("mock moment add",option.body);//可以删掉
    /*const postValue = "files":[{
        "fileType":2,
        "filePath":"https://i.loli.net/2019/11/17/pudaovbTefSJsDx.jpg",
        "uploadTime":"2019-12-15 03:13:43"
    },{
        "fileType":3,
        "filePath":"https://i.loli.net/2019/11/17/pudaovbTefSJsDx.jpg",
        "uploadTime":"2019-12-15 03:13:43"
    }]*/
    //如果没上传图片则images不存在
    return Mock.mock({
        success: true,
        data: {
            code: 200,
            message: "新增成功！",
            images: [{
                fileId: 12,
                fileType: 2,
                filePath: "https://i.loli.net/2019/11/17/EINKdUen9CBsTlW.jpg",
                uploadTime: "2019-12-12 11:20:12"
            },{
                fileId: 23,
                fileType: 2,
                filePath: "https://i.loli.net/2019/11/26/F5qSHxIVdnagleK.jpg",
                uploadTime: "2019-11-20 12:33:50"
            },{
                fileId: 14,
                fileType: 2,
                filePath: "https://i.loli.net/2019/12/05/dethJa6M3XrVjRL.jpg",
                uploadTime: "2019-11-03 13:11:50"
            },{
                fileId: 15,
                fileType: 2,
                filePath: "https://i.loli.net/2019/12/05/GNs71wD3JSnHCha.png",
                uploadTime: "2019-10-03 13:11:50"
            }]
        }
    })
});
