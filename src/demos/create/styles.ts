import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    marginBottom: theme.spacing(2),
  },
  formItemName: {
    marginRight: theme.spacing(1)
  },
  formHint: {
    marginTop: theme.spacing(2.25),
    marginLeft: theme.spacing(1),
    fontStyle: 'italic',
    color: '#888'
  }
}));
