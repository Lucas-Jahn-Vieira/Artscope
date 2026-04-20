// Creator.tsx

import { Menu, MenuItem } from '@mui/material';

interface CreatorProps {
    isOpen: boolean;
    mousePos: { x: number; y: number };
    onClose: () => void;
    addText: () => void;
    addImage: () => void;
    addBox: () => void;  
}

function Creator({ isOpen, onClose, mousePos, addText, addImage, addBox }: CreatorProps) {
    return (
        <Menu
            open={isOpen}
            onClose={onClose}
            anchorReference='anchorPosition'
            anchorPosition={{ top: mousePos.y, left: mousePos.x }}
        >
            {/* We can just pass the functions directly to onClick now */}
            <MenuItem onClick={addText}>Add Text</MenuItem>
            <MenuItem onClick={addImage}>Add Image</MenuItem>
            <MenuItem onClick={addBox}>Add Box</MenuItem>
        </Menu>
    );
}

export default Creator;