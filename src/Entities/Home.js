import * as React from "react";
import {
  Card,
  CardHeader,
  CardContent
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default () => {
  const classes = useStyles();

  return <Card>
    <CardHeader title="Welcome to the administration - Sercome Argentina" />
    <CardContent>
      <iframe
        style={{
          background: '#FFFFFF',
          border: 'none',
          borderRadius: '2px',
          boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)'
        }}
        width="1000"
        height="480"
        src="https://charts.mongodb.com/charts-project-0-lytdw/embed/charts?id=19b7340d-eb4a-4537-a82c-434017178f08&theme=light">
      </iframe>
    </CardContent>
  </Card>
};
