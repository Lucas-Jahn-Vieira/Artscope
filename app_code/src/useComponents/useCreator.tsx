// useCreator.tsx

import { useState} from "react";
import Konva from "konva";

import type { StageItem } from "../App";

export default function useCreator(addItem: (item: StageItem) => void) {
    const [CreatorOpen, setCreatorOpen] = useState(false);
    const [mousePos, getMousePos] = useState({ x: 0.0, y: 0.0 });

    // creates a new menu on the position the user right-clicked
    const handleContextMenu = (e: Konva.KonvaEventObject<PointerEvent>) => {
        e.evt.preventDefault(); //prevents the default right click menu from appearing

        const mainStage = e.target.getStage(); // gets the stage

        const point = mainStage?.getPointerPosition(); //gets the mouse postion on click

        if (point != null) {
            getMousePos({ x: point.x, y: point.y }); //sets mouse position
            setCreatorOpen(true); //opens creator
        }
    };

    const closeCreator = () => {
        setCreatorOpen(false);
    };

    // add element fucntions----------------
    
    const creatorAddText = () => {
        addItem({
            id: Date.now().toString(),
            type: 'text',
            x: mousePos.x,
            y: mousePos.y,
            text: "New Text from Creator"
        });
        closeCreator(); // Closes menu after adding
    };

    const creatorAddImage = () => {
        addItem({
            id: Date.now().toString(),
            type: 'image',
            x: mousePos.x,
            y: mousePos.y,
            src: "/PlaceholderImage.jpg"
        });
        closeCreator();
    };

    const creatorAddBox = () => {
        addItem({
            id: Date.now().toString(),
            type: 'box',
            x: mousePos.x,
            y: mousePos.y
        });
        closeCreator();
    };

    // Return everything so App.tsx can use them
    return {
        CreatorOpen,
        closeCreator,
        mousePos,
        handleContextMenu,
        creatorAddText,
        creatorAddImage,
        creatorAddBox
    };
}

