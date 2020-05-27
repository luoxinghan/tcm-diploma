// 使用 Mock
import Mock from 'mockjs'

Mock.mock('/api/manage/containers/pediatric/course-id','post',function(option){
    console.log("mock get course by id",option.body); //option.body = 1
    /*const postValue ={"courseId":"3"};*/
    return Mock.mock({
        success: true,
        data: {
            code: 200,
            course: {
                courseId: 1,
                title: "第1节课眼保健操1第1节课眼保健操1第1节课眼保健操1",
                imgUrl: "https://pic.huke88.com/video/cover/2018-12-12/DA7FCF6B-D683-526B-CDEE-E2631F662CEC.jpg!/fw/500/compress/true/format/jpg",
                content:'{"blocks":[{"key":"79rlu","text":"1、蜂蜜","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":4,"style":"COLOR-191919"},{"offset":0,"length":4,"style":"FONTSIZE-16"},{"offset":0,"length":4,"style":"BGCOLOR-FFFFFF"},{"offset":0,"length":4,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"4j202","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{"nodeAttributes":{},"textAlign":"left","textIndent":1}},{"key":"4cg5","text":"人在患感冒发烧时，其饮食应该以清淡为主，非常滋补的食物在这个时候应该避免食用，以免导致感冒发烧的症状愈加严重。","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":55,"style":"FONTSIZE-16"}],"entityRanges":[],"data":{}},{"key":"f0gcl","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{"nodeAttributes":{},"textAlign":"left","textIndent":1}},{"key":"45v","text":"在中医上，蜂蜜是有很好的益气补中功效的，如果在感冒期间饮用蜂蜜，就会导致患者体内的热气得不到清理、消除，从而疾病得不到很好的治疗，甚至引发一些其他疾病。","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":76,"style":"FONTSIZE-16"}],"entityRanges":[],"data":{}},{"key":"5589c","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"2q3as","text":"2、鸭、猪、","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":6,"style":"COLOR-191919"},{"offset":0,"length":6,"style":"FONTSIZE-16"},{"offset":0,"length":6,"style":"BGCOLOR-FFFFFF"},{"offset":0,"length":6,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"b5fqs","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{"alignment":"center"}},{"key":"9p7so","text":"鸭肉性凉，人吃的话，容易滑肠敛邪；猪肉肥腻，人吃容易助湿生痰；而羊肉甘温助热，对于发烧的治疗有很大的影响。","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":2,"style":"BOLD"},{"offset":17,"length":2,"style":"BOLD"},{"offset":32,"length":2,"style":"BOLD"},{"offset":0,"length":53,"style":"FONTSIZE-16"},{"offset":2,"length":51,"style":"COLOR-191919"},{"offset":2,"length":51,"style":"BGCOLOR-FFFFFF"}],"entityRanges":[],"data":{}},{"key":"1ka2s","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{"nodeAttributes":{}}},{"key":"41ju5","text":"3、钉子","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":4,"style":"COLOR-191919"},{"offset":0,"length":4,"style":"FONTSIZE-16"},{"offset":0,"length":4,"style":"BGCOLOR-FFFFFF"},{"offset":0,"length":4,"style":"BOLD"}],"entityRanges":[],"data":{"nodeAttributes":{}}},{"key":"d4fud","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"encbp","text":"钉子很容易刺穿食道，所以最好不要在感冒的时候吃。","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":24,"style":"COLOR-333333"}],"entityRanges":[],"data":{}}],"entityMap":{}}',
                lecturer: "王锋",
                address: "甘肃省中医院格罗德诺分院",
                lectureTime: "2019-12-12 13:00:00",
                publishedTime: "2019-12-20 12:11:32",
                isShow: 1
            }
        }
    })
});