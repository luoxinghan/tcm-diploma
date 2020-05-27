// 使用 Mock
import Mock from 'mockjs'

Mock.mock('/api/manage/containers/moments/delete','post',function(option){
    console.log("mock moment delete",option.body);
    /*const postValue = {"momentId":1}*/
    return Mock.mock({
        success: true,
        data: {
            code: 200,
            message: "成功删除！"
        }
    })
});
