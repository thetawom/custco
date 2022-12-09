import {
    Alert,
    Avatar,
    Badge,
    Button,
    ButtonBase, Card,
    Divider,
    LinearProgress, Snackbar,
    Stack, Tooltip,
    Typography
} from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import {Link} from "react-router-dom";

const OrderCard = ({order, joinButton, outlined}) => {

    const [open, setOpen] = React.useState(false);
    const copyOrderId = async (orderId) => {
        await navigator.clipboard.writeText(orderId);
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    let cardSx = {minWidth: "350px", minHeight: "210px"}
    if (outlined) {
        cardSx.border = "1px solid";
        cardSx.borderColor = "primary.main";
    }

    return (<>
        <Card sx={cardSx} variant={outlined ? "outlined" : "elevation"}>
            <Stack direction="row" justifyContent="space-between" padding="8px 15px" textAlign="center">
                <Typography variant="p" fontWeight="700" textTransform="uppercase">{order.platform.name}</Typography>
                <Tooltip title={"Copy order ID"} placement="bottom" PopperProps={{sx: {fontSize: "0.8em"}}} arrow enterDelay={300} enterNextDelay={300}>
                    <ButtonBase onClick={() => copyOrderId(order.id)}
                                sx={{":hover": {textDecoration: "underline", color: "primary.dark"}}}>
                        <Typography variant="caption" fontSize="12px">ID #{order.id}</Typography>
                    </ButtonBase>
                </Tooltip>
            </Stack>
            <Divider sx={{borderColor: "primary.main"}}/>
            <Stack display="flex" direction="row" justifyContent="space-between" alignItems="center" padding="15px 20px">
                <Stack spacing={1} direction="column" marginBottom="3px">
                    <Box>
                        <Typography variant="h3" display="inline-block">${order.remaining}</Typography>
                        <Typography variant="h4" display="inline-block" marginLeft="10px">to go</Typography>
                    </Box>
                    <LinearProgress variant="determinate" color="success" value={order.percentage}/>
                </Stack>
                <Stack alignItems="center">
                    <Badge badgeContent="Friend" color="secondary" overlap="circular" anchorOrigin={{vertical: "bottom", horizontal: "right"}} invisible={!order.initiator.isFriend}>
                        <Avatar src={`https://i.pravatar.cc/80?img=${order.initiator.id}`} alt={order.initiator.name} sx={{width: "70px", height: "70px", marginY: "auto"}} />
                    </Badge>
                    <Typography fontWeight="500" fontSize="15px">{order.initiator.name}</Typography>
                </Stack>
            </Stack>
            <Divider sx={{borderColor: "primary.main"}}/>
            <Stack direction="row" justifyContent="space-between" alignItems="center" padding="5px 16px" textAlign="center">
                <Stack sx={{marginLeft: "5px"}}>
                    <Typography variant="caption">Initiator Fee</Typography>
                    <Typography variant="p" lineHeight={0.8} marginBottom={0.6}>${order.fee.toFixed(2)}</Typography>
                </Stack>
                <Stack>
                    <Typography variant="caption">Pay By</Typography>
                    <Typography variant="p" lineHeight={0.8} marginBottom={0.6}>{order.paymentMethod.name}</Typography>
                </Stack>
                <Button component={Link} to={`/orders/${order.id}`} disabled={!joinButton} sx={{
                    color: "primary.contrastText",
                    backgroundColor: "primary.main",
                    fontSize: 14,
                    fontWeight: 800,
                    padding: "3px 20px",
                    ":hover": {
                        backgroundColor: "primary.dark",
                    },
                    "&.Mui-disabled": {
                        color: "primary.main",
                        backgroundColor: "primary.light",
                    }
                }}>
                    Join
                </Button>
            </Stack>
        </Card>
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
                Order ID copied to clipboard!
            </Alert>
        </Snackbar>
    </>);
}

export default OrderCard;