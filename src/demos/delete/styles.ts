import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  cardBody: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  cardAttached: {
    marginTop: theme.spacing(2),
  },
  cardAttachedIds: {
    marginTop: 0,
  }
}));
