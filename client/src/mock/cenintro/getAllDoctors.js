// 使用 Mock
import Mock from 'mockjs'

Mock.mock('/api/center-intro/doctors','get',{
    //只返回医生
    success: true,
    data: {
        code: 200,
        doctors: [{
            employeeId: 2,
            roleId: 3,
            roleName: "医生",
            avatarUrl: "https://i.loli.net/2019/12/05/dethJa6M3XrVjRL.jpg",
            name: "王锋",
            sex: 1,
            employeeDescription: "一些信息信息信息"
        },{
            employeeId: 5,
            roleId: 5,
            roleName: "医生",
            avatarUrl: "https://i.loli.net/2019/12/05/GNs71wD3JSnHCha.png",
            name: "王守仁",
            sex: 1,
            phoneNum: "13667601677",
            birthday: "1997-11-16",
            address: "г.Гродно ул. Даватара 23",
            employeeDescription: "甘肃省中医院副院长。国务院特殊津贴专家，卫生部有突出贡献的中青年专家，第二届全国百名杰出青年中医，甘肃省优秀专家，甘肃省“555”创新人才，甘肃省领军人才，甘肃省名中医，甘肃省卫生厅系统优秀青年，甘肃省群众喜爱的中青年名中医，国家级重点专（学）科负责人，甘肃省第五、第六批师承指导老师，中国中医药研究促进会专科专病建设工作委员会副会长，首届甘肃省老年医学会副会长，甘肃省伦理学会副会长，甘肃省老年医学会脊柱疾患专业委员会主任委员。"
        }]
    }
});
