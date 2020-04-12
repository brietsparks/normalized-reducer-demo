import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  board: {
    height: '100vh',
    display: 'flex',
    flexFlow: 'column',
  },
  lanes: {
    flexGrow: 1,
    display: 'flex',
    overflowX: 'scroll',
    scrollBehavior: 'smooth',
    padding: theme.spacing(1.5)
  },
  lane: {
    flexBasis: 350,
    flexGrow: 0,
    flexShrink: 0,
    overflowY: 'scroll',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    margin: theme.spacing(1.5),
    border: '1px solid #e1e4e8',
  },
  dragHandle: {
    position: 'absolute',
    left: 4,
    top: 10,
    color: 'rgba(0, 0, 0, 0.54)'
  },
  dialog: {
    padding: theme.spacing(2)
  }
}));
