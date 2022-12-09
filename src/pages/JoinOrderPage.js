import {useParams} from "react-router-dom";
import React, {useContext} from "react";
import {OrdersContext} from "../contexts/ordersContext";
import Navbar from "../components/Navbar";
import {
    Box,
    Button,
    Container,
    Divider,
    Grid,
    InputAdornment,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import OrderCard from "../components/OrderCard";

function JoinOrdersPage() {

    const {findOrder} = useContext(OrdersContext);
    const {id} = useParams();

    const order = findOrder(id);

    return (<>
        <Navbar />
        <Container sx={{marginTop: "100px"}}>
            <Grid container spacing={5}>
                <Grid item md={7}>
                    <Paper sx={{padding: "30px"}}>
                        <Typography variant="h4" marginBottom="10px">Add Items</Typography>
                        <Divider />
                        <Box>
                            <TextField label="Item Name" fullWidth required margin="normal"/>
                            <TextField label="Product Link" fullWidth required margin="normal" type="url" InputProps={{
                                startAdornment: <InputAdornment position={"start"}>https://</InputAdornment>}} />
                            <TextField label="Item Price" fullWidth required margin="normal" type="number" InputProps={{
                                startAdornment: <InputAdornment position={"start"}>$</InputAdornment>}}/>
                            <Button variant="contained" fullWidth sx={{marginTop: "10px", paddingX: "30px", fontSize: "1.1em", fontWeight: "800"}}>Add to Order</Button>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item md={5}>
                    <Paper sx={{padding: "30px"}}>
                        <Typography variant="h4" marginBottom="10px">Order Summary</Typography>
                        <Divider sx={{marginBottom: "15px"}} />
                        <OrderCard order={order} joinButton={false} outlined />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    </>);
}

export default JoinOrdersPage;