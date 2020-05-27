// 使用 Mock
import Mock from 'mockjs'

Mock.mock('/api/manage/containers/pediatric/course-add','post',function(option){
    console.log("mock pediatric course add",option.body);//可以删掉
    /*const postValue = {
        "title":"太恐怖了！感冒了一定不能吃这些东西，不然会威胁到生命！",
        "content":"{\"blocks\":[{\"key\":\"foo8\",\"text\":\"Hello World!\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":6,\"length\":6,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{\"nodeAttributes\":{}}}],\"entityMap\":{}}",
        "imgUrl":"https://i.loli.net/2019/11/17/pudaovbTefSJsDx.jpg",
        "lecturer":"罗杏函",
        "address":"China. ChongQing. YuBei LongXing HeZe Home, China. ChongQing. YuBei LiangLu HaoBo",
        "lectureTime":"2019-12-20 19:53:18",
        "publishedTime":"2019-12-15 19:47:27",
        "isShow":1
    }*/
    //如果没上传图片则imgUrl不存在
    return Mock.mock({
        success: true,
        data: {
            code: 200,
            message: "新增成功！",
        }
    })
});
