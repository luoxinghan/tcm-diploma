import React, {Component} from 'react';
import { Divider, Row, Col } from 'antd';
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

import {
    PediatricWrapper,
    PediatricHeadImg,
    PediatricInfoArea,
    PediatricTitle,
    InfoArea,
    PediatricCourseArea,
    CourseItem,
    ItemImage,
    PediatricGallery,
    ItemContent
} from './style';
import {connect} from "react-redux";
import {actionCreators} from "./store";
import {getPediatricImages} from "../../common/util/ImagesUtil";
import {Link} from "react-router-dom";
import {FormattedHTMLMessage, FormattedMessage} from "react-intl";

class Pediatric extends Component {
    componentDidMount() {
        const {getAllCourses, getAllImages} = this.props;
        getAllCourses();
        getAllImages();
    }

    render() {
        const {courses, images, modalIsOpen, currentImage, openLightbox, closeLightbox} = this.props;
        let finalImages = [];
        if (typeof images !== "undefined") {
            finalImages = getPediatricImages(images);
        }
        return (
            <PediatricWrapper>
                <PediatricHeadImg/>
                <PediatricInfoArea>
                    <PediatricTitle><FormattedMessage id="pediatric.introduce.title" defaultMessage="Сведения о детском массаже"/></PediatricTitle>
                    <Divider/>
                    <InfoArea>
                        <FormattedHTMLMessage id="pediatric.introduce.content" />
                    </InfoArea>
                    <PediatricTitle><FormattedMessage id="pediatric.course.title" defaultMessage="Курсы детского массажа"/></PediatricTitle>
                    <Divider/>
                    <PediatricCourseArea>
                        <Row>
                            {
                                courses.map((item)=>{
                                    return (
                                        <Col span={8} key={item.get("courseId")}>
                                            <Link to={`/pediatric/courses/detail/${item.get("courseId")}`} target="_blank">
                                                <CourseItem>
                                                    <ItemImage imgUrl={typeof item.get("imgUrl") === "undefined" ? "https://i.loli.net/2019/11/07/92M5asNqKSdJmR4.png" : item.get("imgUrl")}>
                                                        <ItemContent>
                                                            <h2>{item.get("title")}</h2>
                                                            <p className="lecturer">{item.get("lecturer")}</p>
                                                            <p className="lecture-time"><strong>Время: </strong>{item.get("lectureTime")}</p>
                                                            <p className="address"><strong>Адрес: </strong>{item.get("address")}</p>
                                                        </ItemContent>
                                                    </ItemImage>
                                                </CourseItem>
                                            </Link>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </PediatricCourseArea>
                    <PediatricTitle><FormattedMessage id="pediatric.image.title" defaultMessage="Фотографии"/></PediatricTitle>
                    <Divider/>
                    <PediatricGallery>
                        <Gallery photos={finalImages} direction="row" onClick={openLightbox}/>
                        <ModalGateway>
                            { modalIsOpen ? (
                                <Modal onClose={closeLightbox}>
                                    <Carousel
                                        currentIndex={currentImage}
                                        views={finalImages.map(x => ({
                                            ...x,
                                            srcset: x.srcSet,
                                            caption: x.title
                                        }))}
                                    />
                                </Modal>
                            ) : null}
                        </ModalGateway>
                    </PediatricGallery>
                </PediatricInfoArea>
            </PediatricWrapper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        courses: state.get("pediatric").get("courses"),
        images: state.get("pediatric").get("images"),
        currentImage: state.get("pediatric").get("currentImage"),
        modalIsOpen: state.get("pediatric").get("modalIsOpen")
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllCourses(){
            dispatch(actionCreators.getPediatricCourses())
        },
        getAllImages(){
            dispatch(actionCreators.getPediatricImages())
        },
        openLightbox(event, { photo, index }){
            dispatch(actionCreators.changeCurrentIndex(index));
            dispatch(actionCreators.changeOpenState(true))
        },
        closeLightbox(){
            dispatch(actionCreators.changeCurrentIndex(0));
            dispatch(actionCreators.changeOpenState(false))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Pediatric);