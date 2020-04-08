import { makeStyles } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';

export interface Args {
  isSelectable?: boolean,
  isSelected?: boolean,
}

export const useStyles = makeStyles(theme => ({
  left: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  cardWrapper: (args: Args) => ({
    padding: theme.spacing(1),
    cursor: deriveCursor(args),
    border: `solid`,
    borderColor: deriveBorderColor(args),
    '&:hover': {
      borderColor: deriveHoveredBorderColor(args),
    }
  }),
  cardBody: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  cardContainer: { marginBottom: theme.spacing(2) }
}));

const deriveBorderColor = (args: Args) => {
  let borderColor;
  if (!args.isSelected) {
    borderColor = '#fff';
  }

  if (args.isSelected) {
    borderColor = blueGrey['500'];
  }
  return borderColor;
};

const deriveHoveredBorderColor = (args: Args) => {
  if (!args.isSelectable || args.isSelected) {
    return blueGrey['500'];
  }

  return blueGrey['100'];
};

const deriveCursor = (args: Args) => {
  if (!args.isSelectable) {
    return 'inherit';
  }

  if (!args.isSelected) {
    return 'pointer';
  }
};
