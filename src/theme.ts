import { createMuiTheme } from '@material-ui/core/styles';
import { blue, red } from '@material-ui/core/colors';

const borderRadius = 4;

// @ts-ignore
export default createMuiTheme({
  // typography: {
  //   fontSize: 14,
  //   subtitle1: {
  //     fontSize: 12,
  //     color: 'rgba(0, 0, 0, 0.54)',
  //   },
  // },
  overrides: {
    MuiOutlinedInput: {
      root: { borderRadius },
      multiline: { borderRadius },
    },
    MuiIconButton: {
      root: {},
    },
    MuiButton: {
      root: {
        borderRadius,
      },
    },
    MuiTooltip: {
      tooltip: {
        borderRadius,
      },
    },
    MuiLink: {
      root: {
        cursor: 'pointer',
      },
    },
    MuiDialog: {
      paper: {
        borderRadius: borderRadius * 2
      }
    },
    MuiChip: {
      root: {
        transition: undefined,
      },
      deleteIcon: {
        width: undefined,
        height: undefined,
      },
      clickable: {
        '&:active': {
          boxShadow: 'none'
        }
      }
    }
  },
  props: {
    MuiButtonBase: {
      disableRipple: true // No ripple on the whole application
    },
    MuiDialog: {
      transitionDuration: 0,
    },
    MuiPopover: {
      PaperProps: { square: true },
    },
    MuiTooltip: {
      enterDelay: 1200,
      arrow: true,
    },
    MuiIconButton: {
      size: 'small',
    },
    MuiButton: {
      disableRipple: true,
    },
    MuiTextField: {
      variant: 'outlined',
      margin: 'dense',
      InputLabelProps: {
        shrink: true,
      },
    },
    MuiPaper: {
      square: true,
    },
    MuiFormControl: {
      variant: 'outlined',
      margin: 'dense',
    },
  },
});
