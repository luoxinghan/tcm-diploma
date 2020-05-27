// 使用 Mock
import Mock from 'mockjs'

Mock.mock('/api/manage/containers/moments/id','post',function(option){
    console.log("mock moment get by id",option.body); //option.body = 1
    /*const postValue ={"momentId":"1"};*/
    //这里不管是否隐藏 因为这个api前后台都需要 所以只需要传过来moment的id就找到文章和它对应的目录返回
    return Mock.mock({
        success: true,
        data: {
            code: 200,
            moment: {
                momentId: 5,
                momentTitle: "111关于庆祝中华人名共和国建国70周年的放假通知1",
                momentContent: "新华社北京10月1日电 壮阔七十载，奋进新时代。10月1日上午，庆祝中华人民共和国成立70周年大会在北京天安门广场隆重举行，20余万军民以盛大的阅兵仪式和群众游行欢庆共和国70华诞。中共中央总书记、国家主席、中央军委主席习近平发表重要讲话并检阅受阅部队。\n" +
                    "中共中央政治局常委、国务院总理李克强主持庆祝大会。中共中央政治局常委、全国人大常委会委员长栗战书，中共中央政治局常委、全国政协主席汪洋，中共中央政治局常委、中央书记处书记王沪宁，中共中央政治局常委、中央纪律检查委员会书记赵乐际，中共中央政治局常委、国务院副总理韩正，国家副主席王岐山出席。",
                publishedTime: "2019-11-12 12:10:31"
            }
        }
    })
});
