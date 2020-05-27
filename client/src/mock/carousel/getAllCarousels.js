// 使用 Mock
import Mock from 'mockjs'

Mock.mock('/api/manage/containers/carousels','get',{
    success: true,
    data: {
        code: 200,
        carousels: [{
            fileId: 1,
            fileType: 1,
            filePath: "https://i.loli.net/2019/11/26/LuAv9rtz1g3Xq8C.jpg",
            order: 1
        },{
            fileId: 4,
            fileType: 1,
            filePath: "https://i.loli.net/2019/11/26/F5qSHxIVdnagleK.jpg",
            order: 2
        },{
            fileId: 3,
            fileType: 1,
            filePath: "https://i.loli.net/2019/11/26/wEGsTnyfhKjoxLv.jpg",
            order: 3
        },{
            fileId: 2,
            fileType: 1,
            filePath: "https://i.loli.net/2019/11/26/xKafOzNpmF358bd.jpg",
            order: 4
        }]
    }
});
