// 使用 Mock
import Mock from 'mockjs'

Mock.mock('/api/manage/containers/pediatric/courses-delete','post',function(option){
    console.log("mock pediatric course delete",option.body);
    /*const postValue = {"courseId":1}*/
    return Mock.mock({
        success: true,
        data: {
            code: 200,
            message: "成功删除！"
        }
    })
});
