// LeftBar.tsx

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

// Defining the props exacty as they are passed from App.tsx
interface LeftBarProps {
    isOpen: boolean;
    openBar: () => void;
    closeBar: () => void;
    addText: () => void;
    addImage: () => void;
    addBox: () => void;
}

export default function LeftBar({ isOpen, openBar, closeBar, addText, addImage, addBox }: LeftBarProps) {
    return (
        <>
            {/* This button sits on the left edge of the screen 
                to open the drawer
            */}

            {!isOpen && (
                <Box sx={{
                    backgroundColor:"rgb(77, 91, 120)",

                    position:'fixed',
                    top:0,
                    left:0,
                    height:'100vh',
                    width:'5vw',

                    display:'flex',
                    flexDirection:'column',
                    justifyContent:'center',
                    alignContent:'center',
                    zIndex:100,
                    boxShadow: "2px 0 8px rgba(0,0,0,0.3)"
                }}>
                    <Button
                        onClick={openBar}
                        variant="outlined"
                        style={{
                            backgroundColor:'rgb(218, 242, 255)',
                            position: "absolute", 
                            top: "50%", 
                            left: 0, 
                            zIndex: 1000 // Ensures it stays above the Konva Canvas
                        }}>
                        <ArrowForwardIosIcon /> {/* icon ">" */}
                    </Button>
                </Box>
            )}

            <Drawer 
                anchor="left" 
                open={isOpen} 
                onClose={closeBar}
                slotProps={{paper: {sx:{ backgroundColor: "rgb(77, 91, 120)"}}}}
            >
                {/* container of the buttons */}
                <Box sx={{ width: 250, borderRadius: '5px' }} role="presentation">
                    <List>
                        {/* Add Text Button */}
                        <ListItem disablePadding>
                            <ListItemButton onClick={addText}>
                                <ListItemText primary="Add Text" sx={{color:'white'}}/>
                            </ListItemButton>
                        </ListItem>

                        {/* Add Image Button */}
                        <ListItem disablePadding>
                            <ListItemButton onClick={addImage}>
                                <ListItemText primary="Add Image" sx={{color:'white'}}/>
                            </ListItemButton>
                        </ListItem>

                        {/* Add Box Button */}
                        <ListItem disablePadding>
                            <ListItemButton onClick={addBox}>
                                <ListItemText primary="Add Box" sx={{color:'white'}}/>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    );
}