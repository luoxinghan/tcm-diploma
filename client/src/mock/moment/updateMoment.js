// 使用 Mock
import Mock from 'mockjs'

Mock.mock('/api/manage/containers/moments/update','post',function(option){
    console.log("mock moment update",option.body);//可以删掉
    /* const postValue =  {
        "momentId":2,
        "momentTitle":"习近平会见白俄罗斯总统卢卡申科",
        "momentContent":"习近平指出，在不到两个月里，我同总统先生两次会晤，充分体现了两国关系的高水平。近年来，中白相互信任、合作共赢的全面战略伙伴关系不断向前发展。双方要继续合力搞好共建“一带一路”同白俄罗斯经济社会发展战略对接，继续为中白工业园建设创造良好条件，实施好重大项目，扩大人文交流互鉴，推动中白关系不断向前发展。",
        "publishedTime":"2019-06-14 12:10:31",
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
