// 使用 Mock
import Mock from 'mockjs'

Mock.mock('/api/manage/containers/pediatric/images','get',{
    //根据图片的时间 越后上传的排在第一位
    success: true,
    data: {
        code: 200,
        //如果没有images则返回images:[]
        images: [{
            fileId: 12,
            fileType: 2,
            filePath: "https://i.loli.net/2019/11/17/EINKdUen9CBsTlW.jpg",
            uploadTime: "2019-12-12 11:20:12"
        },{
            fileId: 23,
            fileType: 2,
            filePath: "https://i.loli.net/2019/11/26/F5qSHxIVdnagleK.jpg",
            uploadTime: "2019-11-20 12:33:50"
        },{
            fileId: 14,
            fileType: 2,
            filePath: "https://i.loli.net/2019/12/05/dethJa6M3XrVjRL.jpg",
            uploadTime: "2019-11-03 13:11:50"
        },{
            fileId: 15,
            fileType: 2,
            filePath: "https://i.loli.net/2019/12/05/GNs71wD3JSnHCha.png",
            uploadTime: "2019-10-03 13:11:50"
        }]
    }
});
