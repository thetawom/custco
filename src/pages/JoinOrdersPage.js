import React, {useContext} from "react";
import {
    Box,
    Container,
    IconButton,
    InputBase,
    Paper,
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
    Tooltip, Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import AppsIcon from "@mui/icons-material/Apps";
import {Link, Navigate, useParams} from "react-router-dom";
import {OrdersContext} from "../contexts/ordersContext";
import OrderCard from "../components/OrderCard";
import Span from "../components/Span";
import Navbar from "../components/Navbar";
import {Platform} from "../schema";



class SortOption {
    static AmountToGoLH = new SortOption(0, "$ Amount to Go (Low to High)", (o1, o2) => o1.remaining() - o2.remaining());
    static AmountToGoHL = new SortOption(1, "$ Amount to Go (High to Low)", (o1, o2) => o2.remaining() - o1.remaining());
    static InitiatorFeeLH = new SortOption(2, "Initiator Fee (Low to High)", (o1, o2) => o1.fee - o2.fee);
    static InitiatorFeeHL = new SortOption(3, "Initiator Fee (High to Low)", (o1, o2) => o2.fee - o1.fee);
    static FriendsFirst = new SortOption(4, "Friends First", (o1, o2) => o2.initiator.isFriend - o1.initiator.isFriend);

    constructor(id, label, sorter) {
        this.id = id;
        this.label = label;
        this.sorter = sorter;
    }

    static all() {
        return [this.AmountToGoLH, this.AmountToGoHL, this.InitiatorFeeLH, this.InitiatorFeeHL, this.FriendsFirst];
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

    const [sort, setSort] = React.useState(SortOption.AmountToGoLH);
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

    const title = platform ?
        <Typography variant="h4">Join Orders From <Span color="primary.dark" sx={{":hover": {textDecoration: "underline"}}}><a href={platform.url} target="_blank" rel="noreferrer" style={{color: "inherit", textDecoration: "none"}}>{platform.name}</a></Span></Typography>
        : <Typography variant="h4">Browse All Public Orders</Typography>;

    filteredOrders = filteredOrders.sort(sort.sorter);

    return (<>
        <Navbar />
        <Container sx={{marginTop: "100px"}}>
            {title}
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
            <Card variant="outlined" sx={{padding: "12px 20px", marginBottom: "30px", backgroundColor: "primary.light"}}>
                <Typography variant="h6" marginBottom={1.4} lineHeight={0.9}>Popular Platforms</Typography>
                <Stack direction="row" divider={<Divider orientation="vertical" flexItem light />} spacing={2}>
                    <Tooltip title="All Orders" arrow>
                        <Box padding="auto" marginY="auto" marginLeft="5px">
                            <ButtonBase component={Link} disableRipple to="/orders/">
                                <AppsIcon fontSize="large"/>
                            </ButtonBase>
                        </Box>
                    </Tooltip>
                    {
                        Platform.all().map(p => (
                            <Tooltip key={p.id} title={p.name} arrow>
                                <Card variant="outlined" sx={{width: "60px", minWidth: "60px", height: "60px", borderRadius: "50%", borderWidth: platform === p ? 2 : 0, borderColor: "secondary.main"}}>
                                    <ButtonBase component={Link} to={`/orders/platform/${p.id}`}
                                                sx={{width: "100%", height: "100%"}}>
                                        <Box padding={`${p.padding}px`} margin="auto">
                                            <Avatar src={p.logo} alt={p.name} sx={{borderRadius: "0", width: "100%", height: "auto"}}/>
                                        </Box>
                                    </ButtonBase>
                                </Card>
                            </Tooltip>
                        ))
                    }
                </Stack>
            </Card>
            <Box display="flex" flexWrap="wrap" gap="30px 50px" justifyContent="start" alignItems="start" marginBottom="80px">
                {filteredOrders.map(order => <OrderCard key={order.id} order={order} joinButton={true} />)}
                <Card variant="outlined" sx={{minWidth: "350px", minHeight: "210px", padding: "25px", backgroundColor: "primary.light", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <Typography variant="h6">No order that's right for you?</Typography>
                    <Button variant="contained" size="large" color="primary" sx={{marginTop: "15px", fontSize: "1.1em", fontWeight: "700"}}><AddIcon sx={{marginRight: "5px"}}/>Start an order</Button>
                </Card>
            </Box>
        </Container>
    </>);
}

export default JoinOrdersPage;