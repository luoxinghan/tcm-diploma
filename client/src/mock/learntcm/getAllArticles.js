// 使用 Mock
import Mock from 'mockjs'

//这两个文件是之前的名字叫 menuData 改到这个目录的
Mock.mock('/api/learntcm/menus/articles','get',{
    success: true,
    data: {
        code: 200,
        article: [{
            articleId: 1,
            articleTitle: "测试测试1测试测试1测试测试1测试测试1测试测试1测试测试1测试测试1测试测试1测试测试1",
            imgUrl: "https://i.loli.net/2019/11/17/EINKdUen9CBsTlW.jpg",
            publishTime: "2019-03-11"
        },{
            articleId: 2,
            articleTitle: "测试测试2",
            imgUrl: "https://i.loli.net/2019/11/26/xKafOzNpmF358bd.jpg",
            publishTime: "2019-04-02"
        },{
            articleId: 3,
            articleTitle: "测试测试3",
            publishTime: "2019-04-15"
        }]
    }
});
