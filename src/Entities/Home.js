import * as React from "react";
import { Card, CardContent, CardHeader } from '@material-ui/core';
import { Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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
    <CardHeader title="Welcome to the administration" />
    <CardContent>
      <div className={classes.root}>
        <Link to='/user/bulk'>
          <Button variant="contained" color="primary">
            Carga masiva de usuarios
          </Button>
        </Link>
      </div>
    </CardContent>
  </Card>
};
