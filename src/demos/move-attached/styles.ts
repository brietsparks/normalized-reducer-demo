import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  listTitle: {
    fontWeight: 'bold',
  },
  item: {
    background: '#fff',
    borderTop: 'solid 1px #ccc',
    display: 'flex',
    justifyContent: 'space-between'
  }
}));
