import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  sourceLink: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  count: {
    marginBottom: theme.spacing(4),
  },
  heading: {
    fontWeight: 'bold',
  },
  incrementButton: {
    marginRight: theme.spacing(1),
  }
}));
