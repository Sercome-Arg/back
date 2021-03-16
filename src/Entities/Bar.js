import * as React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { Title } from 'react-admin';

export default () => (
    <Card>
        <Title title="My Page" />
        <CardHeader title="Welcome to the bar" />
        <CardContent>
            ...
        </CardContent>
    </Card>
);