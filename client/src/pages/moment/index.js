import React, {Component} from "react";

import {
    MomentWrapper, DetailInfo, TitleLine, HeaderInfo
} from "./style";
import {connect} from "react-redux";
import {actionCreators} from "./store";
class Moment extends Component {
    componentDidMount() {
        let id = this.props.match.params.id;
        this.props.getMoment(id);
    }
    render() {
        const { moment } = this.props;
        let isNull = moment === null;
        let images;
        if (!isNull){
            if(typeof moment.images === "undefined"){
                images = null;
            } else {
                images = moment.images;
            }
        }
        return (
            <MomentWrapper>{ isNull ? null :
                <DetailInfo>
                    <header>
                        <h1>{moment.momentTitle}<TitleLine/></h1>
                        <HeaderInfo>
                            <span className="time">{moment.publishedTime}</span>
                        </HeaderInfo>
                    </header>
                    <div className="moment-content">{moment.momentContent}</div>
                    {images === null ? null : images.map((item) => {
                        return (<img key={item.fileId} className="moment-img" src={item.filePath} alt="The Moment"/>);
                    })}
                </DetailInfo>
            }</MomentWrapper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        moment: state.get("moment").get("moment")
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getMoment(momentId){
            dispatch(actionCreators.getMomentById(momentId));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Moment);