import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  buttons: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between'
  }
}));
