import * as React from "react";
import { Card, CardHeader } from '@material-ui/core';

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
  </Card>
};
