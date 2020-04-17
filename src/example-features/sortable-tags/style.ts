import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  sourceLink: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  chip: {
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
    cursor: 'grab'
  },
  demo: {
    marginTop: theme.spacing(2),
  }
}));
