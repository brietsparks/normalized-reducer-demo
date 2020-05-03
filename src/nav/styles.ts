import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  titleHeader: {
    background: 'white',
  },
  titleLink: {
    fontSize: 16,
    textDecoration: 'none',
  },
  titleIcon: {
    height: 16,
    position: 'relative',
    top: 2,
  },
  linkSectionHeader: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
  }
}));
