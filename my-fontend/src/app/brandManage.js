import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const initialBrands = [
  { name: 'Sony', country: 'Nhật Bản', category: 'Âm thanh' },
  { name: 'AKKO', country: 'Trung Quốc', category: 'Phụ kiện' }
];

export default function BrandManagement() {
  const [brands, setBrands] = React.useState(initialBrands);

  return (
    <Box sx={{ p: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography variant="h5" fontWeight="bold">
            Quản lý Nhãn hàng
          </Typography>
          <Button variant="contained">THÊM NHÃN HÀNG</Button>
        </Grid>

        <Divider sx={{ mb: 2 }} />

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Tên nhãn hàng</strong></TableCell>
                <TableCell><strong>Quốc gia</strong></TableCell>
                <TableCell><strong>Danh mục</strong></TableCell>
                <TableCell align="right"><strong>Hành động</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {brands.map((brand, index) => (
                <TableRow key={index}>
                  <TableCell>{brand.name}</TableCell>
                  <TableCell>{brand.country}</TableCell>
                  <TableCell>{brand.category}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
