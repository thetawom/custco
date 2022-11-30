import React, {useContext} from "react";
import {
    Alert,
    Box,
    Container,
    IconButton,
    InputBase,
    Paper,
    Snackbar,
    Stack,
    Typography,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Divider,
    Card,
    Avatar,
    ButtonBase,
    Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {Link, Navigate, useParams} from "react-router-dom";
import {OrdersContext} from "../contexts/ordersContext";
import Order from "../components/Order";
import Span from "../components/Span";
import Navbar from "../components/Navbar";
import {Platform} from "../schema";



class SortOption {
    static OrderProgressHL = new SortOption(0, "Order Progress (High to Low)", (o1, o2) => o1.remaining - o2.remaining);
    static OrderProgressLH = new SortOption(1, "Order Progress (Low to High)", (o1, o2) => o2.remaining - o1.remaining);
    static InitiatorFeeLH = new SortOption(2, "Initiator Fee (Low to High)", (o1, o2) => o1.fee - o2.fee);
    static InitiatorFeeHL = new SortOption(3, "Initiator Fee (High to Low)", (o1, o2) => o2.fee - o1.fee);

    constructor(id, label, sorter) {
        this.id = id;
        this.label = label;
        this.sorter = sorter;
    }

    static all() {
        return [this.OrderProgressHL, this.OrderProgressLH, this.InitiatorFeeLH, this.InitiatorFeeHL];
    }
    static isValid(id) {
        return id < this.all().length;
    }
    static getById(id) {
        return this.isValid(id) ? this.all()[id] : null;
    }
}


function JoinOrdersPage() {

    const {orders} = useContext(OrdersContext);

    const [open, setOpen] = React.useState(false);
    const copyOrderId = async (orderId) => {
        await navigator.clipboard.writeText(orderId);
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    const [sort, setSort] = React.useState(SortOption.OrderProgressHL);
    const handleChange = (event) => {
        setSort(SortOption.getById(event.target.value));
    }

    let {id} = useParams();
    let platform = null;
    let filteredOrders = orders;

    if (id !== undefined) {
        id = Number(id);
        if (Platform.isValid(id)) {
            platform = Platform.getById(id);
            filteredOrders = orders.filter(order => order.platform.id === id);
        } else {
            return <Navigate to="/orders" replace/>;
        }
    }

    const title = platform ? <>Join orders from <Span color="primary.dark">{platform.name}</Span></> : "Browse all public orders";

    filteredOrders = filteredOrders.sort(sort.sorter);

    return (<>
        <Navbar />
        <Container sx={{marginTop: "50px"}}>
            <Typography variant="h4">{title}</Typography>
            <Stack direction="row" flexWrap="wrap" marginY="16px" justifyContent="space-between" alignItems="center">
                <Paper variant="outlined" sx={{display: "flex", justifyContent: "space-between", alignItems: "center", minWidth: "350px", flexGrow: "2", marginRight: "100px"}}>
                    <InputBase sx={{fontSize: "16px", marginLeft: "15px", width: "100%"}} placeholder="Search by platform, dorm, or order no." />
                    <IconButton type="button"><SearchIcon fontSize="medium" /></IconButton>
                </Paper>
                <FormControl sx={{marginY: "10px", minWidth: "240px"}} size="small">
                    <InputLabel id="sort-by">Sort by</InputLabel>
                    <Select
                        id="sort-by"
                        value={sort.id}
                        label="Sort by"
                        onChange={handleChange}
                    >
                        {SortOption.all().map(option => <MenuItem key={option.id} value={option.id}>{option.label}</MenuItem>)}
                    </Select>
                </FormControl>
            </Stack>
            <Divider sx={{marginBottom: "20px"}}/>
            {
                !platform &&
                <Card variant="outlined" sx={{padding: "12px 20px", marginBottom: "30px", backgroundColor: "primary.light"}}>
                    <Typography variant="h6" marginBottom={1.4} lineHeight={0.9}>Popular platforms</Typography>
                    <Stack direction="row" divider={<Divider orientation="vertical" flexItem light />} spacing={2}>
                        {
                            Platform.all().map(platform => (
                                <Tooltip key={platform.id} title={platform.name} arrow>
                                    <Card variant="outlined" sx={{width: "60px", minWidth: "60px", height: "60px", borderRadius: "50%"}}>
                                        <ButtonBase component={Link} to={`/orders/platform/${platform.id}`}
                                                    sx={{width: "100%", height: "100%"}}>
                                            <Box padding={`${platform.padding}px`} margin="auto">
                                                <Avatar src={platform.logo} alt={platform.name}
                                                        sx={{borderRadius: "0", width: "100%", height: "auto"}}/>
                                            </Box>
                                        </ButtonBase>
                                    </Card>
                                </Tooltip>
                            ))
                        }
                    </Stack>
                </Card>
            }
            <Box display="flex" flexWrap="wrap" gap={5} justifyContent="start" alignItems="start" marginBottom="80px">
                {filteredOrders.map(order => <Order key={order.id} order={order} copyOrderId={copyOrderId} />)}
            </Box>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Order ID copied to clipboard!
                </Alert>
            </Snackbar>
        </Container>
    </>);
}

export default JoinOrdersPage;