import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  scrollable: {
    height: '100vh',
    overflowY: 'scroll',
  },
  sidebar: {
    paddingRight: 3,
  },
  main: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },

}));
