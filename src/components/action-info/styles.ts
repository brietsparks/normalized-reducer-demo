import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  section: {
    marginBottom: theme.spacing(2)
  },
  label: {
    fontWeight: 'bold'
  },
  docsIcon: {
    position: 'relative',
    top: 2,
    height: '.7em'
  },
  preformat: {
    margin: 0,
    background: '#f4f4f4',
    border: '1px solid #ddd',
    borderLeft: '3px solid #f36d33',
    color: '#666',
    pageBreakInside: 'avoid',
    fontFamily: 'monospace',
    fontSize: 15,
    lineHeight: 1.6,
    maxWidth: '100%',
    overflow: 'auto',
    padding: '1em 1.5em',
    display: 'block',
    wordWrap: 'break-word',
  }
}));
