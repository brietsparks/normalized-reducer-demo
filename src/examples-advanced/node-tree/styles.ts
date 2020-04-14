import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  rootComments: {
    paddingLeft: theme.spacing(2),
  },
  comment: {
    display: 'flex',
    overflow: 'hidden',
  },
  commentSideline: {
    borderLeft: 'solid 1px #ccc',
    position: 'relative',
    top: 11,
  },
  commentContent: {
    paddingLeft: theme.spacing(2),
  }
}));
