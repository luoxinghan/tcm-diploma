// 使用 Mock
import Mock from 'mockjs'

Mock.mock('/api/manage/containers/carousels/update','post',function(option){
    console.log("mock carousel update",option.body);//可以删掉
    // const postValue = {"fileId":1,"fileType":1,"filePath":"https://i.loli.net/2019/11/26/LuAv9rtz1g3Xq8C.jpg","order":"10"};
    return Mock.mock({
        success: true,
        data: {
            code: 200,
            message: "修改成功！"
        }
    })
});
