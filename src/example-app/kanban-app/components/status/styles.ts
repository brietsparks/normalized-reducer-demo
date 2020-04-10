import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  status: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  tasks: {
    // flexGrow: 1,
    // overflowY: 'scroll'
  }
}));
