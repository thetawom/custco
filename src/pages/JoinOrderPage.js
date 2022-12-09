import {useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {OrdersContext} from "../contexts/ordersContext";
import Navbar from "../components/Navbar";
import {
    Button,
    Container,
    Divider, FormControl,
    Grid, IconButton,
    InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
    Paper, Stack,
    TextField,
    Typography
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import OrderCard from "../components/OrderCard";
import {Item, Order} from "../schema";

function JoinOrdersPage() {

    const {findOrder, updateOrder} = useContext(OrdersContext);
    const {id} = useParams();

    const [order, setOrder] = useState(findOrder(id));

    useEffect(() => {
        updateOrder(order.id, order);
    }, [order, updateOrder])

    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [price, setPrice] = useState("");
    const handleNameChange = event => setName(event.target.value);
    const handleUrlChange = event => setUrl(event.target.value);
    const handlePriceChange = event => setPrice(event.target.value);
    const clearForm = () => {
        setName("");
        setUrl("");
        setPrice("");
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setOrder(Order.newWithItem(order, new Item(name, url, Number(price))));
        clearForm();
    };

    const handleDelete = (i) => (event) => {
        event.preventDefault();
        setOrder(Order.newWithoutItem(order, i));
    }

    return (<>
        <Navbar />
        <Container fixed sx={{marginTop: "100px"}}>
            <Grid container spacing={5}>
                <Grid item xs={12} md={6} lg={7}>
                    <Paper sx={{padding: "20px 30px 30px"}}>
                        <Typography variant="h5" marginBottom="10px">Add Items to Order</Typography>
                        <Divider sx={{marginBottom: "25px"}} />
                        <form onSubmit={handleSubmit}>
                            <FormControl fullWidth>
                                <Stack spacing={4}>
                                    <TextField label="Item Name" value={name} onChange={handleNameChange} fullWidth size="small" required />
                                    <TextField label="Product Link" value={url} onChange={handleUrlChange} fullWidth size="small"  required type="url" />
                                    <TextField label="Item Price" value={price} onChange={handlePriceChange} fullWidth size="small" required type="number" inputProps={{step: "0.01"}} InputProps={{
                                        startAdornment: <InputAdornment position={"start"}>$</InputAdornment>}}/>
                                </Stack>
                                <Button type="submit" variant="contained" fullWidth sx={{marginTop: "25px", fontWeight: "800"}}>
                                    <AddIcon sx={{marginRight: "5px"}} /> Add to Order
                                </Button>
                            </FormControl>
                        </form>
                    </Paper>
                    {
                        order.items.length > 0 &&
                            <Paper sx={{padding: "10px", marginTop: "20px"}}>
                                <List dense>
                                    {order.items.map((item, i) => (
                                        <ListItem
                                            key={i}
                                            secondaryAction={
                                                <IconButton display="inline-block" onClick={handleDelete(i)} sx={{marginRight: "-5px"}} edge="end">
                                                    <DeleteIcon/>
                                                </IconButton>
                                            }
                                            disablePadding
                                        >
                                            <ListItemButton dense href={item.url} target="_blank">
                                                <ListItemIcon>
                                                    <AddIcon sx={{color: "primary.dark"}} />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={
                                                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                            <Typography fontWeight="500" sx={{
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis",
                                                                display: "-webkit-box",
                                                                WebkitLineClamp: "2",
                                                                WebkitBoxOrient: "vertical",
                                                            }}>
                                                                {item.name}
                                                            </Typography>
                                                            <Typography marginLeft="30px" marginRight="20px" fontSize="1.3em" fontWeight="700" color="primary.dark">
                                                                ${item.price.toFixed(2)}
                                                            </Typography>
                                                        </Stack>
                                                    }
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                            </Paper>
                    }
                </Grid>
                <Grid item xs={12} md={6} lg={5}>
                    <Paper sx={{padding: "20px 30px 30px"}}>
                        <Typography variant="h5" marginBottom="10px">Order Summary</Typography>
                        <Divider sx={{marginBottom: "25px"}} />
                        <OrderCard order={order} joinButton={false} outlined />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    </>);
}

export default JoinOrdersPage;