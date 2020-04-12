import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  task: {
    width: '100%',
  },
  taskHeader: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  editorDialog: {
    padding: theme.spacing(2)
  }
}));

export const useTaskEditorStyles = makeStyles(theme => ({
  buttons: {
    marginTop: theme.spacing(1)
  }
}));
