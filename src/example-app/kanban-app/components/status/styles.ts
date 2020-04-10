import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  status: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    background: '#eff1f3',
  },
  statusHeader: {
    padding: theme.spacing(1),
    display: 'flex',
    width: '100%'
  },
  statusTitle: {
    flexGrow: 1,
    marginLeft: theme.spacing(6),
    fontWeight: 'bold'
  },
  buttons: {
  },
  form: {
    padding: theme.spacing(1.5)
  },
  tasks: {
    padding: theme.spacing(1.5),
  },
  task: {
    marginBottom: theme.spacing(.5),
    padding: theme.spacing(1),
    display: 'flex',
  }
}));
