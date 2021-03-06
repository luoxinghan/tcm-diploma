// 使用 Mock
import Mock from 'mockjs'

Mock.mock('/api/home/moments','get',{
    /*和menus差不多*/
    success: true,
    data: {
        code: 200,
        moments: [{
            momentId: 1,
            momentTitle: "111关于庆祝中华人名共和国建国70周年的放假通知1",
            momentContent: "新华社北京10月1日电 壮阔七十载，奋进新时代。10月1日上午，庆祝中华人民共和国成立70周年大会在北京天安门广场隆重举行，20余万军民以盛大的阅兵仪式和群众游行欢庆共和国70华诞。中共中央总书记、国家主席、中央军委主席习近平发表重要讲话并检阅受阅部队。\n" +
                "中共中央政治局常委、国务院总理李克强主持庆祝大会。中共中央政治局常委、全国人大常委会委员长栗战书，中共中央政治局常委、全国政协主席汪洋，中共中央政治局常委、中央书记处书记王沪宁，中共中央政治局常委、中央纪律检查委员会书记赵乐际，中共中央政治局常委、国务院副总理韩正，国家副主席王岐山出席。",
            publishedTime: "2019-11-12 12:10:31"
        },{
            momentId: 2,
            momentTitle: "2222习近平会见白俄罗斯总统卢卡申科",
            momentContent: "习近平指出，在不到两个月里，我同总统先生两次会晤，充分体现了两国关系的高水平。近年来，中白相互信任、" +
                "合作共赢的全面战略伙伴关系不断向前发展。双方要继续合力搞好共建“一带一路”同白俄罗斯经济社会发展战略对接，继续为中白工业园建设创造良好条件，实施好重大项目，扩大人文交流互鉴，推动中白关系不断向前发展。",
            publishedTime: "2019-06-14 12:10:31",
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
        },{
            momentId: 3,
            momentTitle: "3333我院举行“医院开放日”活动",
            momentContent: "1月22日，我院举行首次“医院开放日”活动，吸引了包括人大代表、群团组织、企事业单位员工和高校学生在内的30" +
                "余名各界人士踊跃参与。这是我院秉持“开门办院、开放办院，办成没有‘围墙’的医院”理念，坚持自我加压、自我完善、自我提升，面向社会大众“开门纳谏”推出的又一项创新举措。院长赖卫国、院领导聂宇波、杨明福、李韶今、杨敏和相关职能科室负责人出席当天召开的座谈会，并与参加人员热烈交流。",
            publishedTime: "2019-03-11 12:10:31",
            images: [{
                fileId: 5,
                filePath: "https://i.loli.net/2019/11/17/pudaovbTefSJsDx.jpg",
                order: 1
            },{
                fileId: 1,
                filePath: "https://i.loli.net/2019/11/26/F5qSHxIVdnagleK.jpg",
                order: 2
            }]
        },{
            momentId: 5,
            momentTitle: "4444关于庆祝中华人名共和国建国70周年的放假通知",
            momentContent: "新华社北京10月1日电 壮阔七十载，奋进新时代。10月1日上午，庆祝中华人民共和国成立70周年大会在北京天安门广场隆重举行，20余万军民以盛大的阅兵仪式和群众游行欢庆共和国70华诞。中共中央总书记、国家主席、中央军委主席习近平发表重要讲话并检阅受阅部队。\n" +
                "中共中央政治局常委、国务院总理李克强主持庆祝大会。中共中央政治局常委、全国人大常委会委员长栗战书，中共中央政治局常委、全国政协主席汪洋，中共中央政治局常委、中央书记处书记王沪宁，中共中央政治局常委、中央纪律检查委员会书记赵乐际，中共中央政治局常委、国务院副总理韩正，国家副主席王岐山出席。",
            publishedTime: "2019-11-12 12:10:31",
            images: [{
                fileId: 5,
                filePath: "https://i.loli.net/2019/11/26/F5qSHxIVdnagleK.jpg",
                order: 1
            },{
                fileId: 1,
                filePath: "https://i.loli.net/2019/11/26/F5qSHxIVdnagleK.jpg",
                order: 2
            }]
        },{
            momentId: 6,
            momentTitle: "5555习近平会见白俄罗斯总统卢卡申科",
            momentContent: "习近平指出，在不到两个月里，我同总统先生两次会晤，充分体现了两国关系的高水平。近年来，中白相互信任、" +
                "合作共赢的全面战略伙伴关系不断向前发展。双方要继续合力搞好共建“一带一路”同白俄罗斯经济社会发展战略对接，继续为中白工业园建设创造良好条件，实施好重大项目，扩大人文交流互鉴，推动中白关系不断向前发展。",
            publishedTime: "2019-06-14 12:10:31",
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
        },{
            momentId: 8,
            momentTitle: "6666我院举行“医院开放日”活动",
            momentContent: "1月22日，我院举行首次“医院开放日”活动，吸引了包括人大代表、群团组织、企事业单位员工和高校学生在内的30" +
                "余名各界人士踊跃参与。这是我院秉持“开门办院、开放办院，办成没有‘围墙’的医院”理念，坚持自我加压、自我完善、自我提升，面向社会大众“开门纳谏”推出的又一项创新举措。院长赖卫国、院领导聂宇波、杨明福、李韶今、杨敏和相关职能科室负责人出席当天召开的座谈会，并与参加人员热烈交流。",
            publishedTime: "2019-03-11 12:10:31",
            images: [{
                fileId: 5,
                filePath: "https://i.loli.net/2019/11/17/pudaovbTefSJsDx.jpg",
                order: 1
            },{
                fileId: 1,
                filePath: "https://i.loli.net/2019/11/26/F5qSHxIVdnagleK.jpg",
                order: 2
            }]
        },{
            momentId: 99,
            momentTitle: "777“医院开放日”活动",
            momentContent: "1月22日，我院举行首次“医院开放日”活动，吸引了包括人大代表、群团组织、企事业单位员工和高校学生在内的30" +
                "余名各界人士踊跃参与。这是我院秉持“开门办院、开放办院，办成没有‘围墙’的医院”理念，坚持自我加压、自我完善、自我提升，面向社会大众“开门纳谏”推出的又一项创新举措。院长赖卫国、院领导聂宇波、杨明福、李韶今、杨敏和相关职能科室负责人出席当天召开的座谈会，并与参加人员热烈交流。",
            publishedTime: "2019-03-11 12:10:31",
            images: [{
                fileId: 5,
                filePath: "https://i.loli.net/2019/11/17/pudaovbTefSJsDx.jpg",
                order: 1
            },{
                fileId: 1,
                filePath: "https://i.loli.net/2019/11/26/F5qSHxIVdnagleK.jpg",
                order: 2
            }]
        }]
    }
});
