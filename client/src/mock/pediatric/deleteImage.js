// 使用 Mock
import Mock from 'mockjs'

Mock.mock('/api/manage/containers/pediatric/images-delete','post',function(option){
    console.log("mock moment delete",option.body);
    /*const postValue = {"fileId":15}*/
    return Mock.mock({
        success: true,
        data: {
            code: 200,
            message: "成功删除！"
        }
    })
});
