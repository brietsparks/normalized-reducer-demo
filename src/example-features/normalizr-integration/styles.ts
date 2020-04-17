import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  sourceLink: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  heading: {
    maxWidth: 600,
    marginBottom: theme.spacing(2)
  },
  scrollable: {
    height: '100vh',
    overflowY: 'scroll'
  }
}));
