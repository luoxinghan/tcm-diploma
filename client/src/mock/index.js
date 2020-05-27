import * as data from "./data1";
import * as pictureUpload from "./pictureUpload";
import * as menus from "./menus";
import * as menuData1 from "./learntcm/getAllArticlesByCode";
import * as menuData from "./learntcm/getAllArticles";
import * as pediatricCourse from "./pediatricFrontSystem/getAllPediatricIsShowCourses";
import * as getAllRoles from "./role/getAllRoles";
import * as deleteRole from "./role/deleteRole";
import * as updateRole from "./role/updateRole";
import * as addRole from "./role/addRole";
import * as getAllContent from "./content/getAllContent";
import * as getCurrentMenu from "./learntcm/getCurrentMenu";
import * as getAllHomeMoments from "./home/getAllHomeMoments";
import * as changeContentShow from "./content/changeContentShow";
import * as updateContent from "./content/updateContent";
import * as deleteContent from "./content/deleteContent";
import * as addContent from "./content/addContent";
import * as getAllArticles from "./article/getAllArticles";
import * as changeArticleShow from "./article/changeArticleShow";
import * as getArticleByCode from "./article/getArticlesByCode";
import * as getArticleById from "./article/getArticleById";
import * as addArticle from "./article/addArticle";
import * as updateArticle from "./article/updateArticle";
import * as deleteArticle from "./article/deleteArticle";
import * as getAllCarousels from "./carousel/getAllCarousels";
import * as addCarousel from "./carousel/addCarousel";
import * as deleteCarousel from "./carousel/deleteCarousel";
import * as updateCarousel from "./carousel/updateCarousel";
import * as getAllStaffs from "./staff/getAllStaffs";
import * as addStaff from "./staff/addStaff";
import * as deleteStaff from "./staff/deleteStaff";
import * as updateStaff from "./staff/updateStaff";
import * as getAllMoments from "./moment/getAllMoments"
import * as getMomentImages from "./moment/getMomentImages";
import * as addMoment from "./moment/addMoment";
import * as updateMoment from "./moment/updateMoment";
import * as deleteMoment from "./moment/deleteMoment";
import * as getMomentById from "./moment/getMomentById";

import * as getAllPediatricCourses from "./pediatric/getAllPediatricCourses";
import * as getAllPediatricImages from "./pediatric/getAllPediatricImages";
import * as changeCourseShow from "./pediatric/changeCourseShow";
import * as deleteCourse from "./pediatric/deleteCourse";
import * as addImages from "./pediatric/addImages";
import * as deleteImage from "./pediatric/deleteImage";
import * as getCourseById from "./pediatric/getCourseById";
import * as addCourse from "./pediatric/addCourse";
import * as updateCourse from "./pediatric/updateCourse";

import * as getAllDoctors from "./cenintro/getAllDoctors";

export {
    data,
    pictureUpload,
    menus,
    menuData1,
    menuData,
    getAllHomeMoments,
    getCurrentMenu,
    pediatricCourse,

    getAllRoles,
    deleteRole,
    updateRole,
    addRole,

    getAllContent,
    changeContentShow,
    updateContent,
    deleteContent,
    addContent,

    getAllArticles,
    changeArticleShow,
    getArticleByCode,
    getArticleById,
    addArticle,
    updateArticle,
    deleteArticle,

    getAllCarousels,
    addCarousel,
    deleteCarousel,
    updateCarousel,

    getAllStaffs,
    addStaff,
    deleteStaff,
    updateStaff,

    getAllMoments,
    getMomentImages,
    addMoment,
    updateMoment,
    deleteMoment,
    getMomentById,

    getAllPediatricCourses,
    getAllPediatricImages,
    changeCourseShow,
    deleteCourse,
    addImages,
    deleteImage,
    getCourseById,
    addCourse,
    updateCourse,

    getAllDoctors
};