import { useTheme } from '@mui/material/styles';
import { Box, Container, Paper, Typography } from '@mui/material';
import Sidebar from './Sidebar';

export default function AdminDashboard({ children }) {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: '100vh',
          backgroundColor: theme.palette.grey[100],
          p: 3,
          margin: 0,
        }}
      >
        <Container maxWidth="lg">
          <Paper
            sx={{
              p: 2,
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: 2,
              borderRadius: 2,
            }}
          >
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
              Bảng điều khiển quản trị
            </Typography>
          </Paper>
          {children}
        </Container>
      </Box>
    </Box>
  );
}