// 使用 Mock
import Mock from 'mockjs'

Mock.mock('/api/manage/containers/pediatric/courses','get',{
    //这里是根据发布时间的先后顺序返回 最后编辑的在前面
    success: true,
    data: {
        code: 200,
        courses: [{
            courseId: 1,
            title: "第1节课眼保健操1",
            imgUrl: "https://pic.huke88.com/video/cover/2018-12-12/DA7FCF6B-D683-526B-CDEE-E2631F662CEC.jpg!/fw/500/compress/true/format/jpg",
            lecturer: "王锋",
            address: "甘肃省中医院格罗德诺分院",
            lectureTime: "2019-12-12 13:00:00",
            publishedTime: "2019-12-20 12:11:32",
            isShow: 1
        },{
            courseId: 2,
            title: "Детский массаж Первый класс",
            imgUrl: "https://pic.huke88.com/video/cover/2018-12-12/DA7FCF6B-D683-526B-CDEE-E2631F662CEC.jpg!/fw/500/compress/true/format/jpg",
            address: "甘肃省中医院格罗德诺分院",
            lectureTime: "2019-12-05 13:00:00",
            publishedTime: "2019-12-07 09:18:13",
            isShow: 1
        },{
            courseId: 3,
            title: "第3节课眼保健操3",
            imgUrl: "https://pic.huke88.com/video/cover/2018-12-12/DA7FCF6B-D683-526B-CDEE-E2631F662CEC.jpg!/fw/500/compress/true/format/jpg",
            lecturer: "王锋",
            address: "甘肃省中医院格罗德诺分院",
            lectureTime: "2019-11-29 13:00:00",
            publishedTime: "2019-11-31 09:18:13",
            isShow: 0
        },{
            courseId: 4,
            title: "第4节课眼保健操4",
            imgUrl: "https://pic.huke88.com/video/cover/2018-12-12/DA7FCF6B-D683-526B-CDEE-E2631F662CEC.jpg!/fw/500/compress/true/format/jpg",
            lecturer: "王锋",
            address: "甘肃省中医院格罗德诺分院",
            lectureTime: "2019-11-22 13:00:00",
            publishedTime: "2019-11-24 09:18:13",
            isShow: 1
        },{
            courseId: 5,
            title: "第5节课眼保健操5",
            imgUrl: "https://pic.huke88.com/video/cover/2018-12-12/DA7FCF6B-D683-526B-CDEE-E2631F662CEC.jpg!/fw/500/compress/true/format/jpg",
            lecturer: "王锋",
            address: "甘肃省中医院格罗德诺分院",
            lectureTime: "2019-11-15 13:00:00",
            publishedTime: "2019-11-17 09:18:13",
            isShow: 0
        },]
    }
});
