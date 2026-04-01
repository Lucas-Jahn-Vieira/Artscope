import { Menu } from "@mui/material"; // menu component
import { MenuItem } from "@mui/material"; // items displayed on the menu

export type AnchorPosition = { x: number; y: number } | null;

export interface CreatorProps {
  open: boolean;
  anchorPosition: AnchorPosition; // click coordinates (Client.x, Client.y) or null
  onClose: () => void;
  onAddText: () => void;
  onAddImg: () => void;
  onCustomAction?: () => void;
} 

function Creator({
    open,
    anchorPosition,
    onClose,
    onAddText,
    onAddImg,
    onCustomAction
}:CreatorProps)
{
    return (
        <Menu
            open={open}
            onClose={onClose}
            anchorReference="anchorPosition"
            // {(if true) ? (do this)}
            anchorPosition={open && anchorPosition ? {top:anchorPosition.y, left:anchorPosition.x} : undefined}
            PaperProps={{style: {zIndex:1000}}} // garante que fique sobre o canvas
        >
            <MenuItem //creates a item for the menu
            onClick={() => { //function when item is clicked
                onAddText(); // do the add text function
                onClose(); // close
                }}>
                Create text {/* item text display */}
            </MenuItem>

            <MenuItem 
            onClick={() => {
                onAddImg();
                onClose();
            }}>
                Create Image
            </MenuItem>

            <MenuItem
            onClick={() => {
            onCustomAction?.();
            onClose();
            }}
        >
            Outra ação
        </MenuItem>
        </Menu>
    )
}


export default Creator