import { Button, Box } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function LeftBar() {
    return (
        <Box sx={{position:'fixed', top:0, bottom:0, left:0}}>
        <Button variant="outlined" sx={{backgroundColor:'white', top:'50%'}}>
            <ArrowForwardIosIcon />
        </Button>
        </Box>
    );
}

export default LeftBar;
