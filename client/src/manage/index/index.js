import React, { Component } from 'react';
import { Layout} from 'antd'; // +
import { connect} from 'react-redux' // +
import Crumbs  from '../components/crumb' // +
import MyHeader  from '../components/header' // +
import MyMain  from '../components/main' // +
import MySlider  from '../components/slider' // +
import {actionCreators} from "../store";
import {HomeWrapper} from "./style";


class Index extends Component {
    constructor(props){ // +
        super(props); // +
        this.state = { // +
            onSlidecollapsed: this.props.onSlidecollapsed // +
        }; // +
    }

    toggle = () => {  // +-
        this.state.onSlidecollapsed()
    };

    render() {
        const { routes } = this.props;// +
/*        const { from } = this.props.location.state || { from: { pathname: "/manage" } };*/
        return (
            <HomeWrapper>
                <Layout hasSider style={{minHeight: '100vh'}}>
                    <MySlider/>
                    <Layout>
                        <MyHeader/>
                        <Crumbs/>
                        <MyMain routes={routes}/>
                    </Layout>
                </Layout>
            </HomeWrapper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        slidecollapsed: state.get("manage").get("slidecollapsed")
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSlidecollapsed(){
            dispatch(actionCreators.changeSlideAction())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);  // +-