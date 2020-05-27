// 使用 Mock
import Mock from 'mockjs'

Mock.mock('/api/manage/containers/staffs/add','post',function(option){
    console.log("mock staff add",option.body);
    //这里除了name sex roleId 其他都是属于可以为空的
    //如果只传递必须字段：则为{"name":"123123","roleId":3,"sex":2} 其他的属性都可以有也可以没有 我前台用的是typeof === "undefined"
    //const postValue = {"name":"罗大壮","roleId":1,"sex":2,"birthday":"2019-12-18","phoneNum":"13667601677","address":"重庆市巴南区重庆理工大学花溪校区","employeeDescription":"测试的信息测试的信息测试的信息","avatarUrl":"https://i.loli.net/2019/11/17/pudaovbTefSJsDx.jpg"};
    return Mock.mock({
        success: true,
        data: {
            code: 200,
            message: "新增成功！",
            staff: {
                employeeId: 4,
                roleId: 4,
                roleName: "护士",
                avatarUrl: "https://i.loli.net/2019/11/17/pudaovbTefSJsDx.jpg",
                name: "罗大壮",
                sex: 1,
                phoneNum: "8613667601677",
                birthday: "1998-07-25",
                address: "重庆市巴南区重庆理工大学花溪校区",
                employeeDescription: "测试的信息测试的信息测试的信息"
            }
        }
    })
});
