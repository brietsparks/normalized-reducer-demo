import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  task: {
    width: '100%',
  },
  taskHeader: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  dialog: {
    padding: theme.spacing(2)
  }
}));
