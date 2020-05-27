// 使用 Mock
import Mock from 'mockjs'

Mock.mock('/api/manage/containers/carousels/delete','post',function(option){
    console.log("mock carousel delete",option.body);
    /*const postValue = {"fileId":1};*/
    return Mock.mock({
        success: true,
        data: {
            code: 200,
            message: "成功删除！"
        }
    })
});
