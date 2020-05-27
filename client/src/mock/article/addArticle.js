// 使用 Mock
import Mock from 'mockjs'

Mock.mock('/api/manage/containers/articles/add','post',function(option){
    console.log("mock article add",option.body);//可以删掉
    /*const postValue = {
        "title":"这里有点小问题",
        "raw":"{\"blocks\":[{\"key\":\"ft813\",\"text\":\"Hello World!\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":6,\"length\":6,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{\"nodeAttributes\":{}}}],\"entityMap\":{}}",
        "url":"https://i.loli.net/2019/11/17/ACyIbrQNcJwxGM7.jpg",
        "menuCode":"002003"
    };*/
    //如果没上传图片则url不存在 只有title raw menuCode 这三个值
    //新增Article
    return Mock.mock({
        success: true,
        data: {
            code: 200,
            message: "新增成功！",
        }
    })
});
