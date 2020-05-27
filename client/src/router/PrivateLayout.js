import React from "react";

import {RenderRoutes} from "./utils";
import { Switch} from "react-router-dom";
import { main as mainConfig } from './index';

function PrivateLayout(props) {
    return (
        <div>
            <Switch>
                <RenderRoutes routes={mainConfig}/>
            </Switch>
        </div>
    );
}

export default PrivateLayout;