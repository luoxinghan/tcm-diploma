// 使用 Mock
import Mock from 'mockjs'

Mock.mock('/api/manage/containers/roles/delete','post',function(option){
    /*const postValue = {"roleId":1};*/
    console.log("mock role delete",option.body);
    return Mock.mock({
        success: true,
        data: {
            code: 200,
            message: "删除成功！",
            roles: [{
                roleId: 2,
                roleName: "管理员"
            },{
                roleId: 3,
                roleName: "医生"
            },{
                roleId: 4,
                roleName: "护士"
            },{
                key: '5',
                roleId: 5,
                roleName: "翻译"
            },{
                roleId: 6,
                roleName: "清洁工"
            },{
                roleId: 7,
                roleName: "超级管理员"
            },{
                roleId: 8,
                roleName: "管理员"
            },{
                roleId: 9,
                roleName: "医生"
            },{
                roleId: 10,
                roleName: "护士"
            },{
                roleId: 11,
                roleName: "翻译"
            },{
                roleId: 12,
                roleName: "清洁工"
            }],
            count: 11
        }
    })
});
