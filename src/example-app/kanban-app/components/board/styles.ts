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
    padding: theme.spacing(1)
  },
  lane: {
    flexBasis: 350,
    flexGrow: 0,
    flexShrink: 0,
    overflowY: 'scroll',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    margin: theme.spacing(1)
  },
  dragHandle: {
    position: 'absolute'
  }
}));
