import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Drawer,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  People as PeopleIcon,
  ShoppingCart as ShoppingCartIcon,
  Category as CategoryIcon,
  BrandingWatermark as BrandingWatermarkIcon,
  Receipt as ReceiptIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

export default function Sidebar() {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  const handleDrawerToggle = () => setOpen(!open);

  const sections = [
    { key: 'accounts', label: 'Tài khoản', icon: <PeopleIcon />, path: '/admin/userManagement' },
    { key: 'orders', label: 'Đơn hàng', icon: <ReceiptIcon />, path: '/admin/orders' },
    { key: 'products', label: 'Sản phẩm', icon: <ShoppingCartIcon />, path: '/admin/products' },
    { key: 'categories', label: 'Danh mục', icon: <CategoryIcon />, path: '/admin/CategoryManagement' },
    { key: 'brands', label: 'Thương hiệu', icon: <BrandingWatermarkIcon />, path: '/admin/brandManagement' },
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : theme.spacing(7),
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          boxSizing: 'border-box',
          overflowX: 'hidden',
          backgroundColor: theme.palette.background.paper,
          borderRight: `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: open ? 'space-between' : 'center',
          px: 1,
          py: 2,
        }}
      >
        {open && (
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}
          >
            ADMIN PANEL
          </Typography>
        )}
        <IconButton onClick={handleDrawerToggle}>
          {open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>
      <Divider />
      <List component="nav">
        {sections.map((item) => (
          <ListItem key={item.key} disablePadding>
            <ListItemButton
              selected={pathname === item.path}
              onClick={() => router.push(item.path)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: theme.palette.primary.light,
                  color: theme.palette.primary.contrastText,
                  '& .MuiListItemIcon-root': {
                    color: theme.palette.primary.contrastText,
                  },
                },
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              {open && <ListItemText primary={item.label} />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}