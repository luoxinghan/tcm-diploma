// 使用 Mock
import Mock from 'mockjs'

Mock.mock('/api/manage/containers/staffs','get',{
    success: true,
    data: {
        code: 200,
        staffs: [{
            employeeId: 1,
            roleId: 1,
            roleName: "超级管理员",
            avatarUrl: "https://i.loli.net/2019/12/05/GNs71wD3JSnHCha.png",
            name: "罗杏函",
            sex: 1,
            phoneNum: "13667601677",
            birthday: "1998-07-25",
            address: "г.Гродно ул. Даватара 23",
            employeeDescription: "一些信息信息信息"
        },{
            employeeId: 2,
            roleId: 3,
            roleName: "医生",
            avatarUrl: "https://i.loli.net/2019/12/05/dethJa6M3XrVjRL.jpg",
            name: "何恩江",
            sex: 2,
            employeeDescription: "一些信息信息信息"
        },{
            employeeId: 3,
            roleId: 5,
            roleName: "翻译",
            avatarUrl: "https://i.loli.net/2019/12/05/GNs71wD3JSnHCha.png",
            name: "测试",
            sex: 0,
            phoneNum: "13667601677",
            birthday: "1997-11-16",
            address: "г.Гродно ул. Даватара 23",
            employeeDescription: "一些信息信息一些一些信息信息信息信息信息信息信息"
        }]
    }
});
