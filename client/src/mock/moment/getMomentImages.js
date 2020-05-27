// 使用 Mock
import Mock from 'mockjs'

Mock.mock('/api/manage/containers/moments/images','post',function(option){
    console.log("mock moment get image",option.body);
    /*const postValue = {"momentId":1};*/
    return Mock.mock({
        success: true,
        data: {
            code: 200,
            //如果没有images则返回images:[]
            images: [{
                fileId: 5,
                filePath: "https://i.loli.net/2019/11/26/LuAv9rtz1g3Xq8C.jpg",
                order: 1
            },{
                fileId: 1,
                filePath: "https://i.loli.net/2019/11/26/F5qSHxIVdnagleK.jpg",
                order: 2
            },{
                fileId: 2,
                filePath: "https://i.loli.net/2019/11/26/wEGsTnyfhKjoxLv.jpg",
                order: 66
            }]
        }
    })
});
