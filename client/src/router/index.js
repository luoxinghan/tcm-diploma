import Login from "../manage/login";
import Index from "../manage/index";

import CarouselManage from "../manage/containers/carousel";
import StaffManage from "../manage/containers/staff";
import MomentManage from "../manage/containers/moment";
import ContentManage from "../manage/containers/content";
import LearnTCM from "../manage/containers/learn";
import ArticleManage from "../manage/containers/article";
import ArticleAdd from "../manage/containers/addArticle";
import ArticleUpdate from "../manage/containers/updateArticle";
import PediatricMassageManagement from "../manage/containers/pediatric";
import CourseAdd from "../manage/containers/addCourse";
import CourseUpdate from "../manage/containers/updateCourse";
import RoleManagement from "../manage/containers/role";

/*const Ui = ({routes}) => (<div>
    <h3>Ui
    </h3>
    <RenderRoutes routes={routes}/>
</div>);*/
export const menus = [    // 菜单相关路由
    { path: '/manage/index/carousel', name: '轮播图管理', icon: 'file-image', component: CarouselManage },
    { path: '/manage/index/staff', name: '职工管理', icon: 'idcard', component: StaffManage },
    { path: '/manage/index/moment', name: '公告管理', icon: 'profile', component: MomentManage },
    { path: '/manage/index/learn', name: '了解中医', icon: 'read', component: LearnTCM, routes: [
            {path: '/manage/index/learn/menu', name: '菜单管理', icon: 'menu', component: ContentManage },
            {path: '/manage/index/learn/articles', name: '文章管理', icon: 'book', component: ArticleManage }
        ]
    },
    {path: '/manage/index/pediatric', name: '小儿推拿管理', icon: 'smile', component: PediatricMassageManagement},
    {path: '/manage/index/role', name: '角色管理', icon: 'team', component: RoleManagement}
];

export const main = [
    { path: '/manage/login', exact: true, name: '登录', component: Login, meta: {
            isAuth: true
        }},
    { path: '/manage/article/add', exact: true, name: "新增文章", component: ArticleAdd},
    { path: '/manage/article/update/:id', exact: true, name: "修改文章", component: ArticleUpdate},
    { path: '/manage/pediatric/course/add', exact: true, name: "新增课程", component: CourseAdd},
    { path: '/manage/pediatric/course/update/:id', exact: true, name: "修改课程", component: CourseUpdate},
    { path: '/manage', exact: true,  name: '首页', Redirect: '/manage/index'},
    { path: '/manage/index', name: '首页', component: Index, routes: menus}
];



export const routerConfig =  {
    main, menus
};