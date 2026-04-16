import { Button, Drawer, Box } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface LeftBarProps {
    isOpen:boolean,
    openBar: () => void
    closeBar: () => void
}

const drawerContent = {
    
}

function LeftBar({isOpen = false, openBar, closeBar}:LeftBarProps) {
    return (
        <Box sx={{position:'fixed', top:0, bottom:0, left:0}}>
        <Button variant="outlined" sx={{backgroundColor:'white', top:'50%'}}  onClick={openBar}>
            <ArrowForwardIosIcon />
        </Button>
        <Drawer open={isOpen} onClose={closeBar}>

        </Drawer>
        </Box>
    );
}

export default LeftBar;
