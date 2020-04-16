import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  chip: {
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
    cursor: 'grab'
  }
}));
