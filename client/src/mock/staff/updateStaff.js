// 使用 Mock
import Mock from 'mockjs'

Mock.mock('/api/manage/containers/staffs/update','post',function(option){
    console.log("mock staff update",option.body);//可以删掉
    //这里有一个roleName 必add的时候多了一个属性 因为前台如果只传递roleId的话 然后修改后 前台没有roleName的数据 所以我根据另一个api找到了roleName
    //不用管 就是多了一个roleName 是我那边需要然后就一起传过来了 还是根据roleId在数据库进行存
    //const postValue = {"name":"罗杏函111111","roleId":3,"sex":2,"birthday":"1998-07-26","phoneNum":"13413413413","address":"г.Гродно ул. Даватара 22","employeeDescription":"一些信息信修改","avatarUrl":"https://i.loli.net/2019/11/17/pudaovbTefSJsDx.jpg","roleName":"医生","employeeId":1};
    return Mock.mock({
        success: true,
        data: {
            code: 200,
            message: "修改成功！"
        }
    })
});
