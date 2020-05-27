import Mock from "mockjs";

Mock.mock(RegExp('/api/manage/containers/articles' + ".*") ,'get',function(option) {
    console.log("mock articles get by code",option.url);
    //"/api/manage/containers/articles?code=001" 这里是后台api 需要返回所有的数据 无论isShow为0还是1
    return Mock.mock({
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
                isShow: 1
            },{
                articleId: 3,
                articleTitle: "晚上一定不能做的十件事情！大家快看看！转到家人群！",
                publishedTime: "2019-10-09 13:11:12",
                isShow: 1
            },{
                articleId: 4,
                articleTitle: "原来这么多人误解中医！",
                publishedTime: "2019-10-08 13:11:12",
                isShow: 1
            }]
        }
    })
});