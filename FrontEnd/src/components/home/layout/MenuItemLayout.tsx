import { FC } from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { StoreOutlined as StoreOutlinedIcon } from '@mui/icons-material';

export interface MenuItemLayoutProps {
  openMenuDrawer: boolean;
}

export const MenuItemLayout: FC<MenuItemLayoutProps> = ({ openMenuDrawer }) => {
  const theme = useTheme();
  const primaryColor = theme.palette.primary.light;

  const itemIcon = (
    <ListItemIcon>
      <StoreOutlinedIcon />
    </ListItemIcon>
  );
  const withTooltip = <Tooltip title="Clientes">{itemIcon}</Tooltip>;

  return (
    <>
      <ListItemButton sx={{
        '&.Mui-selected': {
          backgroundColor: primaryColor,
          color: 'white',
          '& .MuiListItemIcon-root': {
            color: 'white'
          }
        },
        '&.Mui-selected:hover': {
          backgroundColor: '#488ccf',
          color: 'white',
          '& .MuiListItemIcon-root': {
            color: 'white'
          }
        },
        '&:hover': {
          backgroundColor: '#488ccf',
          color: 'white',
          '& .MuiListItemIcon-root': {
            color: 'white'
          }
        }
      }}>
        {openMenuDrawer ? itemIcon : withTooltip}
        <ListItemText primary="Clientes" />
      </ListItemButton>
    </>
  );
};