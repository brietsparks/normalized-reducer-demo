import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  sourceLink: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
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
