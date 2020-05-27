// 使用 Mock
import Mock from 'mockjs'

//暂时废除
Mock.mock('/api/manage/containers/pediatric/show','post',function(option){
    console.log("mock pediatric change course show",option.body);//改变isShow时，父目录改变，子目录会跟着父目录改变的值而改变，如001的isShow变为0则001001......的isShow都为0
    /*const postValue = {
        "courseId":1,
        "title":"第1节课眼保健操1",
        "imgUrl":"https://pic.huke88.com/video/cover/2018-12-12/DA7FCF6B-D683-526B-CDEE-E2631F662CEC.jpg!/fw/500/compress/true/format/jpg",
        "lecturer":"王锋",
        "address":"甘肃省中医院格罗德诺分院",
        "lectureTime":"2019-12-12 13:00:00",
        "publishedTime":"2019-12-20 12:11:32",
        "isShow":0
    };*/
    return Mock.mock({
        success: true,
        data: {
            code: 200,
            message: "修改成功！"
        }
    })
});
