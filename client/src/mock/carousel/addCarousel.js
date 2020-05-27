// 使用 Mock
import Mock from 'mockjs'

Mock.mock('/api/manage/containers/carousels/add','post',function(option){
    console.log("mock carousel add",option.body);//可以删掉
    /*const postValue = {"fileType":1,"filePath":"https://i.loli.net/2019/11/17/pudaovbTefSJsDx.jpg","order":"1"};*/
    //如果没上传图片则url不存在 只有title raw menuCode 这三个值
    //新增Article
    return Mock.mock({
        success: true,
        data: {
            code: 200,
            message: "新增成功！",
            carousel: {//只返回新增的这个
                fileId: 5,
                fileType: 1,
                filePath: "https://i.loli.net/2019/11/17/pudaovbTefSJsDx.jpg",
                order: 1
            }
        }
    })
});
