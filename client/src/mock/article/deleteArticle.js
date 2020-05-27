// 使用 Mock
import Mock from 'mockjs'

Mock.mock('/api/manage/containers/articles/delete','post',function(option){
    console.log("mock article delete",option.body);
   /* const postValue = {"articleId":10};*/
    //注意 删除会导致子目录一并删除 如删除001004 则001004001 001004002等都会删除
    return Mock.mock({
        success: true,
        data: {
            code: 200,
            message: "成功删除！",
            articles: [{
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
            }]
        }
    })
});
