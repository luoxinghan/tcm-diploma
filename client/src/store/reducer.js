import { combineReducers } from "redux-immutable";
import { reducer as headerReducer } from "../common/header/store";
import { reducer as loginReducer } from "../manage/login/store";
import { reducer as homeReducer } from "../pages/home/store";
import { reducer as manageReducer } from "../manage/store";
import { reducer as learnTcmReducer } from "../pages/learntcm/store";
import { reducer as pediatricReducer } from "../pages/pediatric/store";
import { reducer as localesReducer } from "../locales/store";
import { reducer as containerReducer } from "../manage/containers/store";
import { reducer as articleReducer } from "../pages/article/store";
import { reducer as courseReducer } from "../pages/course/store";
import { reducer as cenintroReducer } from "../pages/cenintro/store";
import { reducer as momentReducer } from "../pages/moment/store";
/*
    使用combineReducer对reducer进行管理
    以避免所有reducer下载一个文件造成不好维护
*/
const reducer = combineReducers({
    header: headerReducer,
    login: loginReducer,
    home: homeReducer,
    cenintro: cenintroReducer,
    manage: manageReducer,
    learntcm: learnTcmReducer,
    article: articleReducer,
    course: courseReducer,
    pediatric: pediatricReducer,
    locales: localesReducer,
    containers: containerReducer,
    moment: momentReducer
});

export default reducer;