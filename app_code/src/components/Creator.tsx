// Creator.tsx

import { Menu, MenuItem } from "@mui/material";

interface CreatorProps {
    isOpen: boolean;
    mousePos: { x: number; y: number };
    onClose: () => void;
    addText: () => void;
    addImage: () => void;
    addBox: () => void;
}

function Creator({
    isOpen,
    onClose,
    mousePos,
    addText,
    addImage,
    addBox,
}: CreatorProps) {
    return (
        <Menu
            open={isOpen}
            onClose={onClose}
            anchorReference="anchorPosition"
            anchorPosition={{ top: mousePos.y, left: mousePos.x }}
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: "10px",
                        padding: "8px",
                        boxShadow: "0px 10px 30px rgba(0,0,0,0.15)",
                        minWidth: "180px",
                        backgroundColor: "rgb(77, 91, 120)",
                    },
                },
            }}
        >
            {/* We can just pass the functions directly to onClick now */}
            <MenuItem
                onClick={addText}
                sx={{
                    mb: 0.5,
                    color: "white",
                    "&:hover": {backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                }}
            >
                Add Text
            </MenuItem>
            <MenuItem
                onClick={addImage}
                sx={{
                    mb: 0.5,
                    color: "white",
                    "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                }}
            >
                Add Image
            </MenuItem>
            <MenuItem
                onClick={addBox}
                sx={{
                    mb: 0.5,
                    color: "white",
                    "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                }}
            >
                Add Box
            </MenuItem>
        </Menu>
    );
}

export default Creator;
