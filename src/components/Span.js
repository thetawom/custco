import {Box} from "@mui/material";

function Span({sx, color, textTransform, children}) {
    return (
        <Box component="span" color={color} textTransform={textTransform} sx={sx}>
            {children}
        </Box>
    );
}

export default Span;