"use client"
import { Container, Typography} from "@mui/material";
import * as React from "react";

const HandleLoading = () => {
    return (
        <>
            <Container sx={{marginTop: "20%", marginBottom: "20%"}}>
                <Typography gutterBottom variant="h5" component="div">
                <center>Loading........</center>
                </Typography>
            </Container>
        
        </>
    );
}

export default HandleLoading;