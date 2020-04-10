import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  status: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  statusHeader: {
    background: '#ccc',
    padding: theme.spacing(1),
  },
  tasks: {
    padding: theme.spacing(1),
  },
  task: {
    marginBottom: theme.spacing(.5),
    padding: theme.spacing(1),
    display: 'flex',
  }
}));
