// 使用 Mock
import Mock from 'mockjs'

Mock.mock('/api/manage/containers/roles/add','post',function(option){
    console.log("mock role add",option.body);//可以删掉
    //const postValue = {"roleName":"超级管理员"};//这是我传过来的值 前面的key的""可以删掉
    return Mock.mock({
        success: true,
        data: {
            code: 200,
            message: "新增成功！",
            roles: [{
                roleId: 1,
                roleName: "新增测试"
            },{
                roleId: 2,
                roleName: "管理员测试修改"
            },{
                roleId: 3,
                roleName: "医生"
            },{
                roleId: 4,
                roleName: "护士"
            },{
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
