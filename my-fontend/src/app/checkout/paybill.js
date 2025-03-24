import React from "react";
import { Paper, TextField, Grid, Typography, Autocomplete, colors } from '@mui/material';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import PaymentIcon from '@mui/icons-material/Payment';
import CancelIcon from '@mui/icons-material/Cancel';
import payment from './payment';


const PayPage = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '20px' }}>
                <Paper
                    elevation={3}
                    sx={{
                        padding: 3,
                        maxWidth: 500,
                        margin: 'auto',
                        backgroundColor: 'white',
                        flex: 1, // Đảm bảo cả hai Paper có cùng chiều rộng
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Nhập thông tin thẻ
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Họ và tên" variant="outlined" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Email" variant="outlined" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Số điện thoại" variant="outlined" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Địa chỉ" variant="outlined" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="PostCode" variant="outlined" type="number" />
                        </Grid>
                    </Grid>
                </Paper>

                <Paper
                    elevation={3}
                    sx={{
                        padding: 3,
                        maxWidth: 500,
                        margin: 'auto',
                        backgroundColor: 'white',
                        flex: 1, // Đảm bảo cả hai Paper có cùng chiều rộng
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Nhập số thẻ và mã Pin
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Số thẻ" variant="outlined" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Mã Pin" variant="outlined" />
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                disablePortal
                                options={payment}
                                sx={{ width: '100%' }}
                                renderInput={(params) => <TextField {...params} label="Thanh toán bằng" />}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={15}>
                        <p> </p>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            <Button startDecorator={<PaymentIcon />}>Thanh Toán</Button>
                            <Button startDecorator={<CancelIcon />} sx={{ backgroundColor: 'red' }}>
                                Cancel
                            </Button>
                        </Box>
                    </Grid>
                </Paper>
            </div>
        </div>
    );
};

export default PayPage;