// 使用 Mock
import Mock from 'mockjs'

Mock.mock('/api/manage/containers/roles','get',{
    success: true,
    data: {
        code: 200,
        roles: [{
            roleId: 1,
            roleName: "超级管理员"
        },{
            roleId: 2,
            roleName: "管理员"
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
        }],
        count: 6
    }
});
