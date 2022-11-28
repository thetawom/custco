import * as React from "react";
import {Link} from "react-router-dom";
import {Box, Button, Container, Grid, Typography} from "@mui/material";
import {ReactComponent as LandingImage} from "../assets/images/landing.svg";
import Span from "../components/Span";

function LandingPage() {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" backgroundColor="primary.light">
            <Container maxWidth="md" sx={{padding: "30px"}}>
                <Typography variant="h1"><Span sx={{color: "primary.main"}}>CU</Span>stco</Typography>
                <Grid container>
                    <Grid item md={6} sm={12} sx={{
                        padding: "10px",
                        "& .MuiButton-root": {
                            display: "block",
                            margin: "20px 0px",
                            padding: "15px",
                            width: "220px"
                        },
                    }}>
                        <Typography variant="h4" sx={{marginTop: "20px", marginBottom: "50px"}}>
                            Connect with others looking for a great <Span sx={{color: "primary.dark"}}>group&#8209;buy</Span>.
                        </Typography>
                        <Button component={Link} to="/home" variant="contained" size="large" sx={{textAlign: "center", color: "white"}}>
                            <Typography variant="h5">Login</Typography>
                        </Button>
                        <Button component={Link} to="/home" variant="outlined" size="large" sx={{textAlign: "center", backgroundColor: "white", ":hover": {backgroundColor: "background.gray"}}}>
                            <Typography variant="h5">Register</Typography>
                        </Button>
                    </Grid>
                    <Grid item md={6} sm={12}>
                        <LandingImage style={{display: "block", margin: "auto"}}/>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default LandingPage;