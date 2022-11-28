import {Box} from "@mui/material";

function Span({sx, children}) {
    return (
        <Box component="span" sx={sx}>
            {children}
        </Box>
    );
}

export default Span;