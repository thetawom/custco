import {Link, useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import {
    Box,
    Button,
    Container,
    Divider, FormControl,
    Grid,
    InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
    Paper, Stack,
    TextField,
    Typography
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import OrderCard from "../components/OrderCard";
import {Item, Order} from "../schema";
import {OrdersContext} from "../contexts/ordersContext";
import OrderCartList from "../components/OrderCartList";

function JoinOrdersPage() {

    const {findOrder, updateOrder} = useContext(OrdersContext);
    const {id} = useParams();

    const [order, setOrder] = useState(findOrder(id));

    useEffect(() => {
        updateOrder(order.id, order);
    }, [order, updateOrder])

    const [showConfirmation, setShowConfirmation] = useState(false);

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
        setShowConfirmation(false);
        clearForm();
    };

    const handleDelete = (i) => (event) => {
        event.preventDefault();
        setOrder(Order.newWithoutItem(order, i));
    }

    const handleFinalize = (event) => {
        event.preventDefault();
        setOrder(Order.finalizeAll(order));
        setShowConfirmation(true);
    }

    const cartEmpty = order.items.filter(item => !item.finalized).length === 0;
    const finalizedEmpty = order.items.filter(item => item.finalized).length === 0;

    const isUrlValid = url => {
        let urlPattern = new RegExp('^(https?:\\/\\/)?'+
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
            '((\\d{1,3}\\.){3}\\d{1,3}))'+
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
            '(\\?[;&a-z\\d%_.~+=-]*)?'+
            '(\\#[-a-z\\d_]*)?$','i');
        return !!urlPattern.test(url);
    }


    return (<>
        <Navbar />
        <Container fixed sx={{marginTop: "100px"}}>
            <Grid container spacing={5}>
                <Grid item xs={12} md={6} lg={7}>
                    {
                        !showConfirmation &&
                        <Paper sx={{padding: "20px 30px 30px", marginBottom: "20px"}}>
                            <Typography variant="h5" marginBottom="10px">{`Add Items to ${order.initiator.firstName}'s ${order.platform.name} Order`}</Typography>
                            <Divider sx={{marginBottom: "25px"}}/>
                            <form onSubmit={handleSubmit}>
                                <FormControl fullWidth>
                                    <Stack spacing={4}>
                                        <TextField label="Item Name" value={name} onChange={handleNameChange} fullWidth
                                                   size="small" required/>
                                        <TextField label="Product Link" value={url} onChange={handleUrlChange} fullWidth
                                                   size="small" required error={url !== "" && !isUrlValid(url)} />
                                        <TextField label="Item Price" value={price} onChange={handlePriceChange}
                                                   fullWidth size="small" required type="number"
                                                   inputProps={{step: "0.01"}} InputProps={{
                                            startAdornment: <InputAdornment position={"start"}>$</InputAdornment>
                                        }}/>
                                    </Stack>
                                    <Button type="submit" variant="contained" fullWidth disabled={name === "" || url === "" || !isUrlValid(url) || price === ""}
                                            sx={{marginTop: "30px", fontWeight: "800"}}>
                                        <AddIcon sx={{marginRight: "5px"}}/> Add to Order
                                    </Button>
                                </FormControl>
                            </form>
                        </Paper>
                    }
                    {
                        cartEmpty ? <></> :
                            <Paper sx={{padding: "20px 30px"}}>
                                <Typography variant="h5" marginBottom="10px">Your Shopping Cart</Typography>
                                <Divider sx={{marginBottom: "5px"}} />
                                <OrderCartList order={order} handleDelete={handleDelete} />
                                <Button variant="contained" color="success" fullWidth sx={{marginTop: "10px", fontWeight: "800"}} onClick={handleFinalize}>
                                    <CheckIcon sx={{marginRight: "5px"}} /> Finalize Order
                                </Button>
                            </Paper>
                    }
                    {
                        showConfirmation &&
                        <Paper sx={{padding: "20px 30px 30px"}}>
                            <Typography variant="h5" marginBottom="15px">Confirmation&nbsp;&nbsp;🎉🎉🎉</Typography>
                            <Typography fontSize="18px" marginBottom="5px">Hooray! You've submitted your items to the group order.</Typography>
                            <Typography fontSize="18px" marginBottom="20px">Once the initiator accepts your items, we'll let you know, and the order will show up on your "Joined Orders" page.</Typography>
                            <Button variant="contained" color="primary" sx={{fontWeight: "600", marginRight: "15px"}} onClick={() => setShowConfirmation(false)}>Add more items</Button>
                            <Button variant="outlined" color="primary" sx={{fontWeight: "600"}} component={Link} to={"/orders/"}>Back to orders</Button>
                        </Paper>
                    }
                </Grid>
                <Grid item xs={12} md={6} lg={5}>
                    <Paper sx={{padding: "20px 30px 30px"}}>
                        <Typography variant="h5" marginBottom="10px">Order Summary</Typography>
                        <Divider sx={{marginBottom: "25px"}} />
                        <OrderCard order={order} joinButton={false} outlined tentative={!cartEmpty} />
                        {
                            finalizedEmpty ? <></> :
                                <>
                                    <List dense sx={{marginTop: "10px"}}>
                                        {order.items.map((item, i) => (
                                            !item.finalized ? <></> :
                                                <ListItem
                                                    key={i}
                                                    disablePadding
                                                >
                                                    <ListItemButton dense href={item.url} target="_blank">
                                                        <ListItemIcon>
                                                            <CheckIcon sx={{color: "success.main"}} />
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
                                                                    <Typography marginLeft="30px" fontSize="1.3em" fontWeight="700" color="success.main">
                                                                        ${item.price.toFixed(2)}
                                                                    </Typography>
                                                                </Stack>
                                                            }
                                                        />
                                                    </ListItemButton>
                                                </ListItem>
                                        ))}
                                    </List>
                                    <Divider variant="middle"/>
                                    <Box textAlign="right" marginTop="10px" paddingRight="15px">
                                        <Typography marginLeft="30px" fontSize="1.3em" fontWeight="700">
                                            Total:&nbsp;&nbsp;${order.items.filter(item => item.finalized).reduce((currSum, item) => currSum + item.price, 0).toFixed(2)}
                                        </Typography>
                                    </Box>
                                </>
                        }
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    </>);
}

export default JoinOrdersPage;