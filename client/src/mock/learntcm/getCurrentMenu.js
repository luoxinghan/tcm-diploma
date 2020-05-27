// 使用 Mock
import Mock from 'mockjs'

Mock.mock('/api/learntcm/current','post',function(option){
    console.log("menu find by menuCode",option.body);
    /*const postValue = {"menuCode":"001"};*/
    //根据menu的Code来查找相关的imgUrl如果当前MenuCode含有imgUrl则返回 如果没有则找到父节点的imgUrl(需要递归到父节点imgUrl不为空) 默认四个父节点都含有imgUrl
    return Mock.mock({
        success: true,
        data: {
            menu: {
                menuCode: "001",
                menuName: "基本理论",
                level: "1",
                imgUrl: "https://i.loli.net/2019/11/16/mfbAaXW6gntFd3G.jpg",
                isShow: 1,
                isModify: 0
            }
        }
    })
});
