import React, {Component} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {GlobalStyled} from "./style";
import {GlobalIconFont} from "./statics/iconfont/iconfont";
import {IntlProvider} from "react-intl";
/*import "./mock";*/
import messages from "./locales/messages";

import PrivateLayout from "./router/PrivateLayout";
import PublicLayout from "./router/PublicLayout";


class App extends Component {
    render() {
        const {usersLocale} = this.props;
        return (
            <IntlProvider
                locale={usersLocale}
                messages={messages[usersLocale]}
            >
                <GlobalStyled/>
                <GlobalIconFont/>
                <BrowserRouter>
                    <Switch>
                        <Route path='/manage' component={PrivateLayout}/>
                        <Route path='/' component={PublicLayout}/>
                    </Switch>
                </BrowserRouter>
            </IntlProvider>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        usersLocale: state.get("locales").get("usersLocale")
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
