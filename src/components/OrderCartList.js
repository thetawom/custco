import {IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import React from "react";

function OrderCartList({order, handleDelete}) {
    return (
        <List dense>
            {order.items.map((item, i) => (
                item.finalized ? <></> :
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
    );
}

export default OrderCartList;