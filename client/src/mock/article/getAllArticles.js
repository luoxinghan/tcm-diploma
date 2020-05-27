// 使用 Mock
import Mock from 'mockjs'

Mock.mock('/api/manage/containers/articles','get',{
    //这里不用返回articleRow 和 imgUrl 因为是返回所有的文章 如果row里数据太多会导致加载问题 而这里是根据时间的先后顺序返回 最后编辑的在前面
    success: true,
    data: {
        code: 200,
        articles: [{
            articleId: 1,
            articleTitle: "中医基本论",
            publishedTime: "2019-11-10 13:11:12",
            isShow: 1
        },{
            articleId: 2,
            articleTitle: "关于中医的理疗方法和建议",
            publishedTime: "2019-11-01 13:11:12",
            isShow: 0
        },{
            articleId: 3,
            articleTitle: "晚上一定不能做的十件事情！大家快看看！转到家人群！",
            publishedTime: "2019-10-09 13:11:12",
            isShow: 1
        },{
            articleId: 4,
            articleTitle: "原来这么多人误解中医！",
            publishedTime: "2019-10-08 13:11:12",
            isShow: 0
        },{
            articleId: 5,
            articleTitle: "震惊，一个医生竟然在上班的时候偷偷做这种事！",
            publishedTime: "2019-10-07 13:11:12",
            isShow: 1
        },{
            articleId: 6,
            articleTitle: "冬至到了，该吃什么才能更加健康的度过冬天。",
            publishedTime: "2019-10-06 13:11:12",
            isShow: 1
        },{
            articleId: 7,
            articleTitle: "针灸居然有这么多好处，都来看看吧。",
            publishedTime: "2019-10-05 13:11:12",
            isShow: 1
        },{
            articleId: 8,
            articleTitle: "很少人知道的一些重要的知识。",
            publishedTime: "2019-10-04 13:11:12",
            isShow: 1
        },{
            articleId: 9,
            articleTitle: "太恐怖了！感冒了一定不能吃这些东西，不然会威胁到生命！",
            publishedTime: "2019-10-03 13:11:12",
            isShow: 1
        },{
            articleId: 10,
            articleTitle: "不要再通过这些东西伤害你的身体了！",
            publishedTime: "2019-10-02 13:11:12",
            isShow: 1
        },{
            articleId: 11,
            articleTitle: "如何调节气虚",
            publishedTime: "2019-10-01 13:11:12",
            isShow: 1
        }]
    }
});
