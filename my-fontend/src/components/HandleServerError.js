"use client"
import { Container, Typography} from "@mui/material";
import * as React from "react";

const HandleServerError = ({ context = "Server Error. 404 not found" }) => {
    return (
        <>
            <Container sx={{marginTop: "25%", marginBottom: "100%"}}>
                <Typography gutterBottom variant="h4" component="div" fontWeight="bold">
                <center>Thông báo: {context} </center>
                </Typography>
            </Container>
        
        </>
    );
}

export default HandleServerError;