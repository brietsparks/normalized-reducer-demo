import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  nodeLine: {
    display: 'flex',
  },
  nodeChildren: {
    paddingLeft: theme.spacing(3)
  },
  options: {
    display: 'flex',
  },
}));
