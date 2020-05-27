import React, {Component} from 'react';

import {connect} from "react-redux";
import {actionCreators} from "./store";
import BraftEditor from "braft-editor";
import 'braft-editor/dist/output.css'
import {
    CourseDetailWrapper,
    DetailInfo,
    DetailLeft,
    DetailRight,
    TitleLine,
    HeaderInfo
} from "./style";
import {Divider} from "antd";
import {FormattedMessage} from "react-intl";

class PediatricCourse extends Component {
    componentDidMount() {
        const { getContent } = this.props;
        let id = this.props.match.params.id;
        getContent(id);
    }
    render() {
        const { course } = this.props;
        if (course === null) return null;
        console.log(course);
        let isNull = course === null;
        let imgUrl;
        let editorState;
        if (!isNull){
            if(typeof course.imgUrl === "undefined"){
                imgUrl = null;
            } else {
                imgUrl = <img className="title-img" src={course.imgUrl} alt={course.title}/>;
            }
            editorState = BraftEditor.createEditorState(course.content).toHTML();
        }
        return (
            <CourseDetailWrapper>
                    {
                        isNull ? null :
                            <DetailInfo>
                                <DetailLeft>
                                    <p className="lecturer">{course.lecturer}</p>
                                    <p className="address">{course.address}</p>
                                    <Divider/>
                                    <p className="time-title"><FormattedMessage id="course.detail.start.time" defaultMessage="Время проведения курсов"/></p>
                                    <p className="time">{course.lectureTime}</p>
                                </DetailLeft>
                                <DetailRight>
                                    {imgUrl}
                                    <header>
                                        <h1>{course.title}<TitleLine/></h1>
                                        <HeaderInfo>
                                            <span className="time">
                                                <span className="time-title"><FormattedMessage id="course.detail.publish.time" defaultMessage="Время издания: "/></span>
                                                {course.publishedTime}
                                            </span>
                                        </HeaderInfo>
                                    </header>
                                    <div className="braft-output-content" dangerouslySetInnerHTML={{__html: editorState}}/>
                                </DetailRight>
                            </DetailInfo>
                    }
            </CourseDetailWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        course: state.get("course").get("course")
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getContent(id){
            dispatch(actionCreators.getCourseById(id))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PediatricCourse);