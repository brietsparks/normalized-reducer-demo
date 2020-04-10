import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  board: {
    height: '100vh',
    display: 'flex',
    flexFlow: 'column',
  },
  lanes: {
    flexGrow: 1,
    background: '#ccc',
    display: 'flex',
    overflowX: 'scroll',
  },
  lane: {
    border: 'solid 1px',
    flexBasis: 350,
    flexGrow: 0,
    flexShrink: 0,
    overflowY: 'scroll',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  },
  dragHandle: {
    position: 'absolute'
  }
}));
