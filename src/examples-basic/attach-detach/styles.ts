import { makeStyles } from '@material-ui/core/styles';

export const useAttachDetachStyles = makeStyles(theme => ({
  cardId: (args: { isAttachedToSelected?: boolean }) => ({
    color: args.isAttachedToSelected ? theme.palette.secondary.main : undefined
  }),
  cardAttached: (args: { isSelected?: boolean }) => ({
    marginTop: theme.spacing(2),
    color: args.isSelected ? theme.palette.secondary.main : undefined
  }),
  cardAttachedIds: (args: { isSelected?: boolean }) => ({
    marginTop: 0,
    color: args.isSelected ? theme.palette.secondary.main : undefined
  })
}));
