// 使用 Mock
import Mock from 'mockjs'

Mock.mock('/api/upload/picture','post',function(option){
    return Mock.mock({
        success: true,
        message: "上传成功!",
        data: {
            name: "ACyIbrQNcJwxGM7.jpg",
            url: "https://i.loli.net/2019/11/17/pudaovbTefSJsDx.jpg"
        }
    })
    //上传失败
    /*
        success: false,
        message: "上传失败!",
        data: {
            name: "ACyIbrQNcJwxGM7.jpg",
            status: "error"
        }
    */
});
