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
                <Button
                    onClick={openBar}
                    variant="outlined"
                    style={{ 
                        position: "absolute", 
                        top: "50%", 
                        left: 0, 
                        zIndex: 1000 // Ensures it stays above the Konva Canvas
                    }}
                >
                    <ArrowForwardIosIcon /> {/* icon ">" */}
                </Button>
            )}

            <Drawer anchor="left" open={isOpen} onClose={closeBar}>
                {/* container of the buttons */}
                <Box sx={{ width: 250 }} role="presentation">
                    <List>
                        {/* Add Text Button */}
                        <ListItem disablePadding>
                            <ListItemButton onClick={addText}>
                                <ListItemText primary="Add Text" />
                            </ListItemButton>
                        </ListItem>

                        {/* Add Image Button */}
                        <ListItem disablePadding>
                            <ListItemButton onClick={addImage}>
                                <ListItemText primary="Add Image" />
                            </ListItemButton>
                        </ListItem>

                        {/* Add Box Button */}
                        <ListItem disablePadding>
                            <ListItemButton onClick={addBox}>
                                <ListItemText primary="Add Box" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    );
}