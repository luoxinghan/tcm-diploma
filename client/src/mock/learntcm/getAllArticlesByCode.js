// 使用 Mock
import Mock from 'mockjs'

//这两个文件是之前的名字叫 menuData 改到这个目录的
Mock.mock('/api/learntcm/menus/articles?code=003001','get',{
    success: true,
    data: {
        code: 200,
        article: [{
            articleId: 1,
            articleTitle: "TCM – A Complementary Approach",
            imgUrl: "https://i.loli.net/2019/11/17/EINKdUen9CBsTlW.jpg",
            publishTime: "2019-06-11"
        },{
            articleId: 2,
            articleTitle: "All About Cholesterol",
            publishTime: "2019-07-22"
        },{
            articleId: 3,
            articleTitle: "Beware These 6 Confinement Myths",
            imgUrl: "https://i.loli.net/2019/11/17/ACyIbrQNcJwxGM7.jpg",
            publishTime: "2019-07-31"
        }]
    }
});
