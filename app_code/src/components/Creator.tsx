//creator.tsx

import { Menu, MenuItem} from '@mui/material'

interface CreatorProps {
    isOpen:boolean,
    mousePos: {x:number, y:number},
    onClose: () => void,
    addText: () => void,
}

function Creator({isOpen, onClose, mousePos, addText}:CreatorProps) {
    return (
        <Menu
            open={isOpen}
            onClose={onClose}
            anchorReference='anchorPosition'
            anchorPosition={{top:mousePos.y, left:mousePos.x}}
        >
            <MenuItem onClick={() => {addText(); onClose();}}>Add Text</MenuItem>
        </Menu>
    )
}

export default Creator