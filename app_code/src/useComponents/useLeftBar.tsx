// useLeftBar.tsx

import { useState } from "react";
import type { StageItem } from "../App"; 

export default function useLeftBar(addItem: (item: StageItem) => void) {
    const [LBaropen, setOpen] = useState(false);

    const openLBar = () => setOpen(true);
    const closeLBar = () => setOpen(false);

    // Creates a text item in the center of the screen
    const barAddText = () => {
        addItem({
            id: Date.now().toString(),
            type: 'text',
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            text: "New Text"
        });
        closeLBar(); // closes the bar after adding
    };

    // Creates an image item in the center of the screen
    const barAddImg = () => {
        addItem({
            id: Date.now().toString(),
            type: 'image',
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            src: "/PlaceholderImage.jpeg" 
        });
        closeLBar();
    };

    // Creates a box item in the center of the screen
    const barAddBox = () => {
        addItem({
            id: Date.now().toString(),
            type: 'box',
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        });
        closeLBar();
    };

    return {
        LBaropen,
        openLBar,
        closeLBar,
        barAddText,
        barAddImg,
        barAddBox
    };
}