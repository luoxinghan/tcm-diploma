// 使用 Mock
import Mock from 'mockjs'

Mock.mock('/api/manage/containers/pediatric/course-update','post',function(option){
    console.log("mock pediatric course update",option.body);//可以删掉
    /*const postValue = {
        "courseId":1,
        "title":"第1节课眼保健操",
        "content":"{\"blocks\":[{\"key\":\"79rlu\",\"text\":\"1、蜂蜜\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":4,\"style\":\"COLOR-191919\"},{\"offset\":0,\"length\":4,\"style\":\"FONTSIZE-16\"},{\"offset\":0,\"length\":4,\"style\":\"BGCOLOR-FFFFFF\"},{\"offset\":0,\"length\":4,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
        "imgUrl":"https://i.loli.net/2019/11/17/pudaovbTefSJsDx.jpg",
        "lecturer":"测试人员",
        "address":"甘肃省中医院",
        "lectureTime":"2019-12-20 13:00:00",
        "publishedTime":"2019-12-15 20:37:21",
        "isShow":1
    };//这是我传过来的值 可能没有imgUrl 在用户删除imgUrl后*/
    return Mock.mock({
        success: true,
        data: {
            code: 200,
            message: "修改成功！"
        }
    })
});
