import {
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    InputBase,
    Paper,
    styled,
    Typography
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import ThumbsUpImage from "../assets/images/thumbs-up.png";
import ShoppingCartImage from "../assets/images/cart.png";
import PriceTagImage from "../assets/images/price-tag.png";
import * as React from "react";

const BigButton = ({title, icon}) => {
    const StyledIcon = styled(icon)({
        fontSize: "50px",
        marginBottom: "20px",
        color: "black"
    });
    return (
        <Button variant="outlined" sx={{
            width: "240px",
            height: "220px",
            margin: "30px",
            padding: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            border: "2px solid",
            borderColor: "primary.dark",
            borderRadius: "20px",
            ":hover": {
                borderWidth: "2px",
                borderColor: "primary.dark"
            }
        }}>
            <StyledIcon />
            <Typography variant="h5" color="primary.dark">{title}</Typography>
        </Button>
    );
};


function HomePage() {
    return (
        <Container maxWidth={false} disableGutters>
            <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center" height="55vh" bgcolor="primary.light">
                <Grid container height="80%">
                    <Grid item xs={6} sm={4} md={2} display="flex" justifyContent="end" alignItems="start" overflow="hidden">
                        <img src={ThumbsUpImage} alt="" style={{width: "auto", height: "75%", marginRight: "20px"}}/>
                    </Grid>
                    <Grid item style={{flexGrow: "1"}} />
                    <Grid item xs={6} sm={4} md={2} display="flex" justifyContent="start" alignItems="end" overflow="hidden">
                        <img src={ShoppingCartImage} alt="" style={{width: "auto", height: "85%", marginLeft: "20px"}}/>
                    </Grid>
                </Grid>
                <Box position="absolute" marginTop="40px" paddingX="20px">
                    <Typography variant="h3" fontWeight="800">Start or Join Group Orders to Get Free Shipping</Typography>
                    <Paper sx={{marginTop: "40px", marginX: "5px", display: "flex", justifyContent: "center"}}>
                        <InputBase sx={{fontSize: "24px", marginLeft: "32px", width: "100%"}} placeholder="Search by platform, dorm, or order no." />
                        <IconButton type="button" sx={{padding: "16px"}}>
                            <SearchIcon fontSize="large" />
                        </IconButton>
                    </Paper>
                    <Box position="absolute" display={{xs: "none", md: "block"}} left="-25px" top="137px">
                        <img src={PriceTagImage} alt=""/>
                    </Box>
                </Box>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" flexWrap="wrap" paddingTop="40px">
                <BigButton icon={CardGiftcardIcon} title="Browse Orders"/>
                <BigButton icon={AddIcon} title="Start an Order"/>
                <BigButton icon={ShoppingCartIcon} title="My Orders"/>
            </Box>
        </Container>
    );
}

export default HomePage;