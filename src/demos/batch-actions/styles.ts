import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  buttons: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  listTitle: {
    fontWeight: 'bold',
  },
  item: {
    marginTop: theme.spacing(2),
    background: '#fff',
    borderTop: 'solid 1px #ccc',
    display: 'flex',
  }
}));
