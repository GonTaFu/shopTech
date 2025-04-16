"use client"
import { Container, Typography, CircularProgress} from "@mui/material";
import * as React from "react";

const HandleLoading = () => {
    return (
        <>
            <Container>
                <Typography gutterBottom variant="h2" component="div" fontWeight="bold">
                <center>Loading</center>
                </Typography>
                <Typography gutterBottom variant="h2" component="div" fontWeight="bold">
                <center><CircularProgress/></center>
                </Typography>

            </Container>
        
        </>
    );
}

export default HandleLoading;