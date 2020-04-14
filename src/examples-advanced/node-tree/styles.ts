import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  rootComments: {
    paddingLeft: theme.spacing(2),
  },
  comment: (args: { isLast?: boolean } = {}) => ({
    display: 'flex',
    overflow: 'hidden',
    marginBottom: args.isLast ? undefined : theme.spacing(2)
  }),
  commentSideline: {
    // borderLeft: 'solid 1px #ccc',
    position: 'relative',
    top: 11,
  },
  commentContent: {
    paddingLeft: theme.spacing(2),
    borderTop: 'solid 1px #ccc',
    borderLeft: 'solid 1px #ccc',
    // borderRadius: 3,
    width: '100%',
  },
  reply: {
    paddingLeft: theme.spacing(2),
    borderLeft: 'solid 1px #ccc',
  },
  replyCancel: {
    marginRight: theme.spacing(1)
  }
}));
