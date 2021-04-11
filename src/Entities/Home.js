import * as React from "react";

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import LinkIcon from '@material-ui/icons/Link';
import PhoneIcon from '@material-ui/icons/Phone';
import {Link} from 'react-router-dom';

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
    {/* <CardHeader title="Welcome to the administration - Sercome Argentina" /> */}
    <Card className={classes.root}>
      <CardHeader
        title="Welcome to the administration - Sercome Argentina"
      />
      
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
  </Card>
};
