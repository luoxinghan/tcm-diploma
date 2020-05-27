// 使用 Mock
import Mock from 'mockjs'

Mock.mock('/api/manage/containers/staffs/delete','post',function(option){
    console.log("mock staff delete",option.body);
    /*const postValue = {"employeeId":2};*/
    return Mock.mock({
        success: true,
        data: {
            code: 200,
            message: "成功删除！"
        }
    })
});
