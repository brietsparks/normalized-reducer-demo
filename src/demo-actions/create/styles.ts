import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  indexFormButtons: {
    display: 'flex'
  },
  form: {
    display: 'flex'
  },
  formHint: {
    marginTop: theme.spacing(2.25),
    marginLeft: theme.spacing(1),
    fontStyle: 'italic',
    color: '#888'
  }
}));
