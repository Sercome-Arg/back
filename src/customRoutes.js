// in src/customRoutes.js
import * as React from "react";
import { Route } from 'react-router-dom';
import UserBulk from './Entities/UserBulk';
import Bar from './Entities/Bar';
import Baz from './Entities/Baz';

export default [
    <Route exact path="/user/bulk" component={ UserBulk } />,
    <Route exact path="/bar" component={ Bar} />,
];