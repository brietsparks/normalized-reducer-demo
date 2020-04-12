import React from 'react';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core/SvgIcon/SvgIcon';

export type Props = IconButtonProps & {
  iconProps?: OverridableComponent<SvgIconTypeMap>
}

export const AddButton = ({ iconProps, ...props }: Props) =>
  <IconButton {...props}><AddIcon {...iconProps} /></IconButton>;

export const DeleteButton = ({ iconProps, ...props }: Props) =>
  <IconButton {...props}><DeleteIcon {...iconProps} /></IconButton>;

export const OptionsButton = ({ iconProps, ...props }: Props) =>
  <IconButton {...props}><MoreHorizIcon {...iconProps} /></IconButton>;
