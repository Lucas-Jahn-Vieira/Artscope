//LeftBar.tsx

import {
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    Drawer,
    Box
} from "@mui/material";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface LeftBarProps {
    isOpen: boolean;
    openBar: () => void;
    closeBar: () => void;

    addText:() => void;
    addImage:() => void;
    addBox:() => void;
}

interface BarButtonProps {
    text:string;
    action:() => void;
}

const BarButton = ({text, action}:BarButtonProps) => {
    return(
        <ListItem>
            <ListItemButton onClick={action}>
                <ListItemText primary={text} />
            </ListItemButton>
        </ListItem>
    )
};

function LeftBar({ isOpen = false, openBar, closeBar, addText, addImage, addBox }: LeftBarProps) {
    return (
        <Box sx={{ position: "fixed", top: 0, bottom: 0, left: 0 }}>
            <Button
                variant="outlined"
                sx={{ backgroundColor: "white", top: "50%" }}
                onClick={openBar}
            >
                <ArrowForwardIosIcon />
            </Button>
            <Drawer open={isOpen} onClose={closeBar} slotProps={{paper:{sx:{width:'20%'}}}}>
                <List>
                    <ListItem>
                        <ListItemText primary="Add Elements" />
                    </ListItem>
                    <BarButton text='Text' action={addText}/>
                    <BarButton text='Image' action={addImage}/>
                    <BarButton text='Box' action={addBox}/>
                </List>
            </Drawer>
        </Box>
    );
}

export default LeftBar;
